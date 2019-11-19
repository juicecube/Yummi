const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const colors = require('colors');

const CYPRESS_BASE_TEST_PATH = 'cypress/integration/';

const getCypressInlineCommand = (openScreenShot, openVideo) => {
  if (!openScreenShot && !openVideo) { return '' }
  let inlineCommand = '--config ';
  if (openScreenShot) { inlineCommand = inlineCommand + 'supportFile="cypress/support/index-with-sn.js",' }
  if (openVideo) { inlineCommand = inlineCommand + 'video=true,' }
  return inlineCommand.slice(0, -1);
}

module.exports = (program) => {
  program
    .command('test:e2e-open')
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
    .command('test:e2e-run [moduleNames...]')
    .description('run test files, [moduleName...]')
    .option('-s, --screenShot', 'automatically takes a screenshot when there is a failure in Run mode')
    .option('-r, --record', 'automatically record a video')
    .action((moduleNames, cmdObj) => {
      // 测试配置
      console.log('=== test config ===');
      const withScreenShot = cmdObj.screenShot;
      const withVideo = cmdObj.record;
      const testConfigCommand = getCypressInlineCommand(withScreenShot, withVideo);
      console.log('withScreenShot：'.green, withScreenShot || false);
      console.log('withVideo：'.green, withVideo || false);
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