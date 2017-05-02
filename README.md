# Minihub

Developed by Oxynum team. Need to breath ? Go and check our website www.oxynum.fr

## Presentation
Minihub is the npm module that is used for Minimag.
We work in an API-plugins system.

## Install minihub in project

Be sure that, node is installed, npm is installed. Open your terminal, and paste this:

```shell
npm install --save minihub
````

Run npm install on the project to install all dep.

## Usage of the npm

To use the npm, you will use the class of express, and don't have anything else todo:
 
```javascript
    let app  = require('minihub'),
        port = 9000; // Or whatever you want

    app.listen(port, () => {
        console.log("App is running on port: "+ port);
    });
```


Our Plugins:
- 
