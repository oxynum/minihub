let sampleUsage  = require('./minihub');

sampleUsage.listen(3001, () => {
  console.log('Printer System is connected on port: ' + 3001);
});