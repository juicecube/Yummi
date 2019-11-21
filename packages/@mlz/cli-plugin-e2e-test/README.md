## 安装
`yuumi add @mlz/cli-plugin-e2e-test`

---
## 使用

### 打开cypress test runner:
`npm run test:e2e-open`
### 测试：
（命令行中跑的测试默认不开启屏幕快照和视频记录）
- 测试全部用例：
`npm run test:e2e-run`

- 测试指定模块用例：
`npm run test:e2e-run [moduleName]`  (moduleName 为'cypress/integration'文件夹下的文件夹名称)
- 测试开启屏幕快照：
`npm run test:e2e-run-s`
- 测试开启视频记录：
`npm run test:e2e-run-r`

---
## 测试用例编写
- 在‘cypress/integration‘文件夹下建立以模块名为命名的文件，存放相应测试用例
- 每个模块的测试用例要覆盖核心业务逻辑
- 在模块文件夹下建立以独立功能为命名的.spec.js文件，存放该独立功能的相关测试版用例
- 测试用例编写规则，可查阅：https://docs.cypress.io/api/commands/and.html#Syntax
- cypress文件夹目录结构：
```js
├── cypress // e2e测试相关
    ├── integration // 存放测试用例
    |   └── index // index模块的测试用例
    |   |   └── xxx.spec.js // xxx功能的测试用例文件
    └── plugins // cypress的扩展插件
    └── support // cypress的一些全局生效的支持/自定义方法
    └── fixtures // 用于存放一些资源或数据(可当做测试数据库)
    └── screenshots // 用于存放屏幕快照(如果测试时开启快照功能，在测试用例不通过时会自动进行屏幕快照，并存生成该文件进行存放)
    └── video // 用于存放video(如果测试时开启video功能，则会生成video和该文件夹进行存放)   
```

注意：.gitignore文件应该加上上述screenshots和video文件夹

文件夹详细功能可查阅cypress官网：

https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell