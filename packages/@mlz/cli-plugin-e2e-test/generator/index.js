module.exports = (generatorApi) => {
  generatorApi.addFolderOrFile('./template') 

  generatorApi.extendPackage({
    scripts: {
      "test:e2e-open": "yuumi test:e2e-open",
      "test:e2e-run": "yuumi test:e2e-run",
      "test:e2e-run-s": "yuumi test:e2e-run -s",
      "test:e2e-run-r": "yuumi test:e2e-run -r",
    }
  })
}