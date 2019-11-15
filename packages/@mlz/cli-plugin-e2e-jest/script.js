#!/usr/bin/env node
const program = require('commander');
const childProcess = require('child_process');
const fs = require('fs');
const colors = require('colors');

const CYPRESS_BASE_TEST_PATH = 'cypress/integration/';
let noCommand = true;

const getCypressInlineCommand = (openScreenShot, openVideo) => {
  if (!openScreenShot && !openVideo) { return '' }
  let inlineCommand = '--config ';
  if (openScreenShot) { inlineCommand = inlineCommand + 'screenshotsFolder="cypress/screenshots",' }
  if (openVideo) { inlineCommand = inlineCommand + 'video=true,' }
  return inlineCommand.slice(0, -1);
}

program
  .version('0.0.1')
  .usage('<commad> [option]');

program
  .command('open')
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
  .command('run [moduleNames...]')
  .description('run test files')
  .option('-s, --screenShot', 'automatically takes a screenshot when there is a failure in Run mode')
  .option('-v --video', 'automatically record a video when there is a failure in Run mode')
  .action((moduleNames, options) => {
    noCommand = false;
    console.log('moduleNames', moduleNames);
    // 测试配置
    console.log('=== test config ===');
    const openScreenShot = options.screenShot;
    const openVide = options.video;
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

program
  .arguments('<command>')
  .action((cmd) => {
    console.log(`Unknown command ${cmd}`.red);
    program.help();
  });
  
program.parse(process.argv);
!program.args[0] && noCommand && program.help();


