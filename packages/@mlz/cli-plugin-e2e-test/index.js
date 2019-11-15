const path = require(path);
const fs = require('fs');
const childProcess = require('child_process');
const colors = require('colors');

module.exports = (program) => {
  program.command('test:e2e')
  .description('run e2e tests with cypress')
  .action((name, cmd) => {
    console.log(`
      Usage: script <commad> [option]

      Commands:
        open                            open cypress test runner
        run [options] [moduleNames...]  run test files
    `);
  })
  program
  .command('test:e2e open')
  .description('open cypress test runner')
  .action(() => {
    noCommand = false;
    console.log('openning cypress test runner...'.green);
    childProcess.exec('cypress open', {}, (error, stdout, stderr) => {
      if (error) {
        throw new Error(error);
      }
    })
  });
  program
  .command('test:e2e run [moduleNames...]')
  .description('run test files')
  .option('-s, --screenShot', 'automatically takes a screenshot when there is a failure in Run mode')
  .option('-r, --record', 'automatically record a video when there is a failure in Run mode')
  .action((moduleNames, cmdObj) => {
    // 测试配置
    console.log('=== test config ===');
    const openScreenShot = cmdObj.screenShot;
    const openVide = cmdObj.record;
    const testConfigCommand = getCypressInlineCommand(openScreenShot, openVide);
    console.log('openScreenShot：'.green, openScreenShot || false);
    console.log('openVide：'.green, openVide || false);
    console.log('====================================================================================================');
    if (moduleNames.length > 0) {
      console.log('it will check if the module exists');
      const modulePaths = [];
      // 模块检查
      moduleNames.forEach(item => {
        const theModulePath = `${CYPRESS_BASE_TEST_PATH}${item}`;
        const isExist = fs.existsSync(theModulePath);
        if (!isExist) {
          throw new Error(`can not find module ${item} in path "${theModulePath}"`);
        }
        modulePaths.push(theModulePath + '/**/*');
      });
      console.log('=== it will test assigned modules ===');
      console.log(moduleNames.join(' ').green);
      console.log(`cypress run --spec "${modulePaths.join(',')}" ${testConfigCommand}`);
      // 调用cypress命令
      const cypressRun = childProcess.exec(`cypress run --spec "${modulePaths.join(',')}" ${testConfigCommand}`, {} , (error, stdout, stderr) => {
        if (error) {
          console.error('test does not pass'.red);
        }
      });
      cypressRun.stdout.on('data', (data) => {
        console.log(data);
      });
      cypressRun.on('close', (code) => {
        console.log('test end!!!!!');
      });

    } else {
      console.log('It will test all modules');
      console.log(`cypress run ${testConfigCommand}`);
      // 调用cypress命令
      const cypressRun = childProcess.exec(`cypress run ${testConfigCommand}`, {} , (error, stdout, stderr) => {
        if (error) {
          console.error('test does not pass'.red);
        }
      });
      cypressRun.stdout.on('data', (data) => {
        console.log(data);
      });
      cypressRun.on('close', (code) => {
        console.log('test end!!!!!'.green);
      });
    }
  })

}