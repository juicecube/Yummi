module.exports = (generatorApi) => {
  generatorApi.addFolderOrFile('./template') 

  generatorApi.extendPackage({
    scripts: {
      "test:e2e": "yuumi test:e2e"
    }
  })
}