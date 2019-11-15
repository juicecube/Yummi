module.exports = (program) => {
  program.command('test:unit')
  .description('run unit tests with jest')
  .action((name, cmd) => {
    let rawArgv = process.argv.slice(2);
    rawArgv.shift();
    require('jest').run(rawArgv);
  })
}