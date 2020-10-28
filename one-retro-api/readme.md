Using Database tools provided by MongoDB to import/export database in the "tools" folder with the scripts below:

Export database script:

> mongoexport --uri="mongodb+srv://admin:admin@duycluster.mybdc.mongodb.net/OneRetroDB?retryWrites=true&w=majority" --collection=boards --out=boards.json

Import database script:

> mongoimport --uri="mongodb+srv://admin:admin@duycluster.mybdc.mongodb.net/OneRetroDB?retryWrites=true&w=majority" --collection=boards --file=boards.json
