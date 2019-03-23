import angular from 'angular'
import Papa from 'papaparse'

angular.module('odin.common').factory('CsvService', CsvService)

CsvService.$inject = ['$q', 'UtilityService']
function CsvService($q, UtilityService) {
  var service = { import: importCsv, export: exportCsv }
  return service

  function importCsv(content, addIndex) {
    return $q(function(resolve, reject) {
      if (!content) {
        return reject('File is empty')
      }
      var csvResults = []
      // strip non unicode characters
      /* eslint no-control-regex: 0 */
      content = content.replace(/[^\x00-\x7F]/g, '')
      // fix windows returns
      content = content.replace(/\r\r/gm, '\r')
      Papa.parse(content, {
        header: true,
        dynamicTyping: false,
        skipEmptyLines: true,
        step: function(results) {
          var row = results.data[0]
          if (addIndex) {
            row.index = csvResults.length + 1
          }
          csvResults.push(row)
        },
        complete: function() {
          if (csvResults.length < 1) {
            return reject('No Users Found')
          }
          resolve(csvResults)
        },
        error: function() {
          // console.log('CsvService#import', error)
          return reject('CSV Parse Error')
        }
      })
    })
  }

  function exportCsv(data) {
    return $q(function(resolve, reject) {
      try {
        var options = { delimiter: ',', newline: '\r\n', quotes: true }
        data = UtilityService.castArray(data)
        var flattened = UtilityService.flatten(data)
        var stripped = UtilityService.stripSpecial(flattened)
        resolve(Papa.unparse(stripped, options))
      } catch (error) {
        // console.log('CsvService#export', error)
        reject('CSV Generation Error')
      }
    })
  }
}
