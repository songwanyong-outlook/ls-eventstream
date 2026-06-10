import * as fs from "fs";
import { barChart } from "./barChart";
const percentile = require("percentile");

const folder = 'engineering/benchmark/result';

export function drawBarChartForLatency(latencies: number[], title: string, slowestScript: string, slowestIndex: number) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  let data = prepareBarChartData(latencies);
  let pct: number[] = percentile([50, 90], latencies);
  const average =  getAvg(latencies);
  writeToHTML(barChart({
      data: data, 
      container: `
      <div id="container">
        <h2>${title} latencies</h2>
        <p>run at ${getTime()}</p>
        <div id="chart"></div>
        <p>Slowest script is #${slowestIndex}, taking ${latencies[slowestIndex].toFixed(2)}ms: </p>
        <pre>${slowestScript}</pre>
      </div>
      `,
      average,
      median: pct[0]
  }), `${folder}/${title}`);
  latencies.sort((a, b) => a - b);
  pct.push(latencies[latencies.length - 2], latencies[latencies.length - 1])
  writeToJSON(title, average, pct, `${folder}/result`);
}

function prepareBarChartData(latencies: number[]) {
    let len = latencies.length;
    const allKeys = Array.from(new Array(len).keys());
    const data = [...allKeys].map(k => ({
        key: k,
        value: latencies[k]
    }));
    return data;
}

function writeToHTML(d3n, dest: string) {
    const html = d3n.html();
    fs.writeFile(`${dest}.html`, html, () =>
        console.log(`>> Exported chart to "${dest}.html"`)
    );
}

function writeToJSON(title: string, average: number, pct: number[], dest: string) {
  let json;
  try {
    json = JSON.parse(fs.readFileSync(`${dest}.json`, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      json = { results: [] };
    } else {
      console.log(err);
      return;
    }
  }
  json.results.push({title, average, '50': pct[0], '90': pct[1], '99': pct[2], 'max': pct[3]});
  fs.writeFileSync(`${dest}.json`, JSON.stringify(json));
}

function getTime(): string {
  let date = new Date();
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - (offset * 60 * 1000));
  let timeStrings = date.toISOString().split("T");
  return `${timeStrings[0]} ${timeStrings[1].substring(0, timeStrings[1].indexOf("."))}`;
}

function getAvg(numbers: number[]) {
  let sum = 0;
  numbers.forEach((n) => { sum += n; });
  return sum / numbers.length;
}
