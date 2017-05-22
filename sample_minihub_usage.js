let sampleUsage  = require('./minihub');

sampleUsage.listen(3002, () => {
  console.log('Printer System is connected on port: ' + 3002);
});