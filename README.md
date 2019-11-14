# Yuumi
yuumi(内部项目)的cli工具扩展

# yuumi插件列表
- @mlz/cli-plugin-unit-jest

# 使用插件
yuumi add [pluginName]


# 如何开发插件
在package/@mlz文件夹下添加插件包，注意需要在包的`package.json`中配置
```js
  "publishConfig": {
    "access": "public"
  },
```
开发完成后运行`npm run publish`发布包到@mlz scope下面

#### 插件文件结构
```js
├── generator //该插件需要插入到项目中的文件或者文件夹
│   ├── index.js 
│   └── template
├── index.js
├── package-lock.json
├── package.json
└── readme.md
```

#### 插件核心文件
- index.js
需导出扩展脚手架program命令的函数

- generator/index.js
需导出一个函数，函数传入generatorApi参数，generatorApi提供了一些常用方法给插件使用。
```js
//extendPackage 该函数会合并传入的对象到项目中的package.json文件，
generatorApi.extendPackage({
  scripts: {
    "test:unit": "yummi test:unit"
  }
})

//addFolderOrFile 该函数会将template目录下的所有文件插入到项目中
generatorApi.addFolderOrFile('./template') 
```


