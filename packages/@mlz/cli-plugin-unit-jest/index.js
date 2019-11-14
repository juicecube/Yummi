module.exports = (program) => {
  program.command('test:unit')
  .description('run unit tests with jest')
  .action((name, cmd) => {
    require('jest').run();
  })
}