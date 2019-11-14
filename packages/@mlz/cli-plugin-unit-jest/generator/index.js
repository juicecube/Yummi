module.exports = (generatorApi) => {
  generatorApi.addFolderOrFile('./template') 

  generatorApi.extendPackage({
    scripts: {
      "test:unit": "yuumi test:unit"
    }
  })

}