# Project-SWAP

## How to install the Project

## There are several requirements to run the project:
1. NodeJS
2. Visual code
3. Visual studio
4. Microsoft SQL server management studio

## Steps for running the project on the computer (local):
1. Download the project to a folder on your computer
2. Restore a swap.bak database to SQL server management from the link - SWAP DB
3. Open the server in visual studio from the folder - API
4. Then right-click on the API in the left window
5. Then update the packages that the API depends on in the NetGet Package Manager
6. You then need to change the connectionStrings within the following files:
   6.1 Web.config inside the Api folder
   6.2 App. config inside the SwapClassLibrary folder

Example:
  <connectionStrings>
      <add name = "SwapDbConnection" connectionString = "metadata = res: //*/EF.Model.csdl | res: //*/EF.Model.ssdl | res: //*/EF.Model.msl; provider = System.Data.SqlClient; provider connection string = & quot; data source = [enter name of DB here]; initial catalog = Swap; integrated security = True; MultipleActiveResultSets = True; App = EntityFramework & quot; " providerName = "System.Data.EntityClient" />
  </connectionStrings>
  
7. Client-side link - CLIENT Open by Visual Studio Code
8. Open the Terminal - inside Visual Code and write in it - npm i
9. After installation should register at, Terminal npm start
10. on the server side you have to run and click on run the server "IIS Express" button.
Currently the project is running on your computer:
Server API: https: // localhost: 44300 in port: 44300
Client side: http: // localhost: 3000 / can be opened through any popular browser.

