# Provision Azure OpenAI for the T-SQL AI demo
#
# Creates (idempotent):
#   - Resource group (default: rg-tsql-ai-demo, eastus2)
#   - Azure OpenAI resource (kind: OpenAI, SKU: S0)
#   - gpt-4o-mini model deployment (Standard, capacity 10 = 10K TPM)
#
# Then writes apps/demo/.env.local with:
#   PUBLIC_AOAI_DEPLOYMENT  (model deployment name, exposed to browser-safe code)
#   AOAI_ENDPOINT         (server-side; used by the Vite dev proxy)
#   AOAI_API_KEY          (server-side; used by the Vite dev proxy; NEVER exposed to browser)
#
# Usage (in a shell logged in as your personal account):
#   az login
#   az account set --subscription <your-sub-id>
#   pwsh ./scripts/provision-azure-openai.ps1
#
# Optional parameters:
#   -SubscriptionId <id>     Override the active subscription
#   -ResourceGroup  <name>   Default: rg-tsql-ai-demo
#   -Location       <region> Default: eastus2 (broad gpt-4o-mini availability)
#   -ResourceName   <name>   Default: aoai-tsql-ai-<6-char-hash>
#   -DeploymentName <name>   Default: gpt-4o
#   -Capacity       <int>    Default: 10  (= 10,000 tokens per minute)

[CmdletBinding()]
param(
    [string]$SubscriptionId,
    [string]$ResourceGroup = "rg-tsql-ai-demo",
    [string]$Location = "eastus2",
    [string]$ResourceName,
    [string]$DeploymentName = "gpt-4o",
    [string]$ModelName = "gpt-4o",
    [string]$ModelVersion = "2024-11-20",
    [int]$Capacity = 10
)

$ErrorActionPreference = 'Stop'

function Write-Step([string]$msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-Ok([string]$msg)   { Write-Host "    $msg" -ForegroundColor Green }
function Write-Warn([string]$msg) { Write-Host "    $msg" -ForegroundColor Yellow }

# --- Sub selection ---
if ($SubscriptionId) {
    Write-Step "Setting subscription to $SubscriptionId"
    az account set --subscription $SubscriptionId | Out-Null
}
$account = az account show -o json | ConvertFrom-Json
if (-not $account) { throw "Not logged in. Run 'az login' first." }
Write-Ok "Subscription : $($account.name) ($($account.id))"
Write-Ok "Signed-in as : $($account.user.name)"

if (-not $ResourceName) {
    # Re-runs without -ResourceName should NOT create a second account.
    # Look for an existing AOAI account in the target resource group (any
    # account name beginning with "aoai-tsql-ai-") and reuse it. Only mint
    # a fresh random suffix if nothing matches.
    $rgExists = az group show --name $ResourceGroup -o json 2>$null
    if ($rgExists) {
        $candidates = az cognitiveservices account list -g $ResourceGroup `
            --query "[?kind=='OpenAI' && starts_with(name, 'aoai-tsql-ai-')].name" -o tsv 2>$null
        if ($candidates) {
            $ResourceName = ($candidates -split "`r?`n" | Select-Object -First 1).Trim()
            Write-Ok "Reusing existing account: $ResourceName"
        }
    }
    if (-not $ResourceName) {
        $hash = -join ((48..57) + (97..122) | Get-Random -Count 6 | ForEach-Object { [char]$_ })
        $ResourceName = "aoai-tsql-ai-$hash"
    }
}

# --- Provider registration (silent if already registered) ---
Write-Step "Ensuring Microsoft.CognitiveServices provider is registered"
az provider register --namespace Microsoft.CognitiveServices --wait | Out-Null
Write-Ok "Provider ready"

# --- Resource group ---
Write-Step "Resource group: $ResourceGroup ($Location)"
$rg = az group show --name $ResourceGroup -o json 2>$null | ConvertFrom-Json
if (-not $rg) {
    az group create --name $ResourceGroup --location $Location -o none
    Write-Ok "Created"
} else {
    Write-Ok "Exists ($($rg.location))"
}

# --- Azure OpenAI account ---
Write-Step "Azure OpenAI resource: $ResourceName"
$existing = az cognitiveservices account show -g $ResourceGroup -n $ResourceName -o json 2>$null | ConvertFrom-Json
if (-not $existing) {
    az cognitiveservices account create `
        --name $ResourceName `
        --resource-group $ResourceGroup `
        --location $Location `
        --kind OpenAI `
        --sku S0 `
        --custom-domain $ResourceName `
        --yes -o none
    Write-Ok "Created (kind=OpenAI, SKU=S0)"
} else {
    Write-Ok "Exists (kind=$($existing.kind), SKU=$($existing.sku.name))"
    $ResourceName = $existing.name
}

# --- Model deployment ---
Write-Step "Model deployment: $DeploymentName ($ModelName $ModelVersion, capacity=$Capacity)"
$dep = az cognitiveservices account deployment show `
    -g $ResourceGroup -n $ResourceName --deployment-name $DeploymentName -o json 2>$null | ConvertFrom-Json
if (-not $dep) {
    az cognitiveservices account deployment create `
        --resource-group $ResourceGroup `
        --name $ResourceName `
        --deployment-name $DeploymentName `
        --model-name $ModelName `
        --model-version $ModelVersion `
        --model-format OpenAI `
        --sku-name Standard `
        --sku-capacity $Capacity -o none
    Write-Ok "Created"
} else {
    Write-Ok "Exists (model=$($dep.properties.model.name) v$($dep.properties.model.version), capacity=$($dep.sku.capacity))"
}

# --- Pull endpoint + key ---
Write-Step "Fetching endpoint + key"
$account = az cognitiveservices account show -g $ResourceGroup -n $ResourceName -o json | ConvertFrom-Json
$keys = az cognitiveservices account keys list -g $ResourceGroup -n $ResourceName -o json | ConvertFrom-Json
$endpoint = $account.properties.endpoint.TrimEnd('/')
$apiKey   = $keys.key1
Write-Ok "Endpoint: $endpoint"
Write-Ok "Key fetched (length=$($apiKey.Length))"

# --- Write .env.local ---
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$envFile = Join-Path $repoRoot 'playground\.env.local'
$envBody = @"
# Auto-generated by scripts/provision-azure-openai.ps1 — do not commit.
# Used by the Vite dev proxy. The API key NEVER ships to the browser;
# the proxy injects it server-side when forwarding /api/aoai/* -> Azure OpenAI.

# Server-side (consumed by vite.config.ts, NOT prefixed with PUBLIC_ so the
# browser bundle cannot read it).
AOAI_ENDPOINT=$endpoint
AOAI_API_KEY=$apiKey

# Browser-visible (prefixed with PUBLIC_). Safe — just the deployment name.
PUBLIC_AOAI_DEPLOYMENT=$DeploymentName
PUBLIC_AOAI_API_VERSION=2024-08-01-preview
"@
$envBody | Set-Content -Path $envFile -Encoding UTF8 -NoNewline
Write-Step "Wrote $envFile"

Write-Host ""
Write-Host "Done. Next:" -ForegroundColor Green
Write-Host "  cd $repoRoot"
Write-Host "  cd playground && npm run ls-prod-local"
Write-Host "  # open http://localhost:8000/, click into the editor, idle ~1s -> AI ghost text appears"
Write-Host ""
Write-Host "Estimated cost: ~`$0.0008 / completion (gpt-4o). 10k completions ~ `$8."



