module.exports = (program) => {
  program.command('test:unit')
  .description('hhh')
  .action((name, cmd) => {
    require('jest').run();
  })
}