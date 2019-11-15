const path = require(path);
module.exports = (program) => {
  program.command('test:e2e')
  .description('run e2e tests with cypress')
  .action((name, cmd) => {
    let rawArgv = process.argv.slice(2);
    rawArgv.shift();
    require(path.resolve(__dirname, './script.js')).run(rawArgv);
  })
}