module.exports = (generatorApi) => {
  generatorApi.addFolderOrFile('./cypress') 

  generatorApi.extendPackage({
    scripts: {
      "test:e2e": "yuumi test:e2e"
    }
  })
}