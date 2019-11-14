module.exports = (generatorApi) => {
  generatorApi.addFolderOrFile('./template') 

  generatorApi.extendPackage({
    scripts: {
      "test:unit": "yummi test:unit"
    }
  })

}