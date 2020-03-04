const inquirer = require('inquirer');
const ora = require('ora');
const execa = require('execa');

module.exports = (generatorApi) => {
  const lintChoices = [
    {
      name: 'eslint',
      value: 1,
      checked: true,
    },
    {
      name: 'eslint with react',
      value: 2,
    },
    {
      name: 'stylelint',
      value: 3
    },
    {
      name: 'commitlint',
      value: 4
    },
  ];
  const createFile = (file, message) => {
    const spinner = ora(message);
    try {
      generatorApi.addFolderOrFile(file);
      spinner.succeed();
    } catch (e) {
      spinner.fail();
      throw e;
    }
  }
  const answer = await inquirer.prompt({
    name: 'type',
    type: 'checkbox',
    message: '请选择需要添加的lint',
    choices: lintChoices,
  })
  if (!answer.type || answer.type.length < 1) {
    throw new Error('没有选择任何lint，退出！');
  }
  const selectedEslint = answer.type.indexOf(1) !== -1;
  const selectedEslintWithReact = answer.type.indexOf(2) !== -1;
  const selectedStylelint = answer.type.indexOf(3) !== -1;
  const selectedCommitlint = answer.type.indexOf(4) !== -1;
  const installArray = [];
  const createArray = [];
  // 配置eslint
  if (selectedEslint) {
    installArray.push('eslint');
    createArray.push({
      file: './template/eslint/.eslintrc.js',
      message: '正在创建.eslintrc.js',
    });
  }
  // 配置eslint with react
  if (selectedEslintWithReact) {
    installArray.indexOf('eslint') === -1 && installArray.push('eslint');
    createArray.push({
      file: './template/eslint-react/.eslintrc.js',
      message: '正在创建.eslintrc.js',
    });
  }
  // 配置stylelint
  if (selectedStylelint) {
    installArray.push('stylelint');
    createArray.push({
      file: './template/stylelint/.stylelintrc.json',
      message: '正在创建.stylelintrc.json',
    });
    createArray.push({
      file: './template/stylelint/.stylelintignore',
      message: '正在创建.stylelintignore',
    });
  }
  //配置commitlint
  if (selectedCommitlint) {
    installArray.push('@commitlint/cli');
    installArray.push('@commitlint/config-conventional');
    createArray.push({
      file: './template/commitlint/commitlint.config.js',
      message: '正在创建commitlint.config.js',
    });
  }

  installArray.push('@mlz/lint');

  // 安装依赖包
  try {
    const spinner = ora('正在安装依赖包');
    await execa('npm', ['install', installArray, '-D']);
    spinner.succeed();
  } catch(e) {
    spinner.fail();
    throw e;
  }

  // 创建依赖配置文件
  createArray.forEach((item) => {
    createFile(item.file, item.message);
  });

}

// const lintChoices = [
//   {
//     name: 'eslint',
//     value: 1,
//     checked: true,
//     // disabled: (answer) => {
//     //   if (answer.type) {
//     //     return answer.type.indexOf(3) !== -1; 
//     //   }
//     //   console.log('disabled', answer);
//     // }
//   },
//   {
//     name: 'eslint with react',
//     value: 2,
//     disabled: (answer) => {
//       if (answer.type) {
//         return answer.type.indexOf(1) !== -1; 
//       }
//       console.log('disabled', answer);
//     }
//   },
//   {
//     name: 'stylelint',
//     value: 3
//   },
//   {
//     name: 'commitlint',
//     value: 4
//   },
// ];
// inquirer.prompt({
//   name: 'type',
//   type: 'checkbox',
//   message: '请选择需要添加的lint',
//   choices: lintChoices,
// }).then((answer) => {
//   console.log('answer', answer);
// }).catch((err) => {
//   console.log('err', err);
// });
