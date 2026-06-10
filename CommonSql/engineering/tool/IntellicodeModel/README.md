Baseline-Models doc:
https://devdiv.visualstudio.com/DevDiv/_git/IntelliCode-Wiki?path=/wiki/Engineering/Service/Baseline-Models.md&_a=preview

Sql Model API:
https://prod.intellicode.vsengsaas.visualstudio.com/api/v1/model/common/sql/intellisense-members/output/latest

Input Sas URL(fetched with Sql Model API) to get model binary file.
eg. https://intellicodeprodstorage.blob.core.windows.net/models-prod-output/Output_99136CA159AB897D942412E976015B8C9EC2_6D6727BA7E6347BE9124EF572943AC5C?skoid=364bb3f6-cf21-46c6-bf5a-f6498967df82&sktid=975f013f-7f24-47e8-a7d3-abc4752bf346&skt=2022-02-21T07%3A26%3A30Z&ske=2022-02-22T07%3A26%3A30Z&sks=b&skv=2020-02-10&sv=2020-02-10&se=2022-02-21T13%3A06%3A13Z&sr=b&sp=r&sig=60AdhoLXbG76QqHVBsmRp3jfjRsNrc04%2Fn07SmhebGw%3D

Raname the binary file to be SqlModel.dat.

Get key in https://devdiv.visualstudio.com/DevDiv/_git/PythiaSQL?path=/PythiaForSQL/PythiaForSQL/PythiaModelLoader.cs
Copy key and iv and paste them into ModelDecrypter.ts

Run "npm run decryptSqlModel" to decrypt latest sql model.