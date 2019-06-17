import angular from 'angular'
import Papa from 'papaparse'

angular.module('odin.common').factory('CsvService', CsvService)

CsvService.$inject = ['$q', 'UtilityService']
function CsvService($q, UtilityService) {
  const service = { import: importCsv, export: exportCsv }
  return service

  function importCsv(content, addIndex) {
    return $q((resolve, reject) => {
      if (!content) return reject('File is empty')

      /* strip non unicode characters and fix windows returns */
      /* eslint-disable-next-line no-control-regex */
      content = content.replace(/[^\u0000-\u007F]/g, '')
      content = content.replace(/\r\r/gm, '\r')

      Papa.parse(content, {
        header: true,
        dynamicTyping: false,
        skipEmptyLines: 'greedy',
        complete: ({ data }) => {
          if (data.length === 0) return reject('No Rows Found')
          resolve(data)
        },
        error: () => reject('CSV Parse Error')
      })
    })
  }

  function exportCsv(data) {
    return $q((resolve, reject) => {
      try {
        data = UtilityService.castArray(data)
        const options = { delimiter: ',', newline: '\r\n', quotes: true }
        const flattened = UtilityService.flatten(data)
        const stripped = UtilityService.stripSpecial(flattened)
        resolve(Papa.unparse(stripped, options))
      } catch (error) {
        reject('CSV Generation Error')
      }
    })
  }
}
