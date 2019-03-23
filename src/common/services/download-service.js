import angular from 'angular'

angular.module('odin.common').factory('DownloadService', DownloadService)

function DownloadService() {
  var service = {
    download: download,
    downloadCsv: downloadCsv,
    downloadText: downloadText
  }

  return service

  function download(content, filename, type) {
    filename = filename || 'download.csv'
    type = type || 'text/csv'
    var data = new Blob([content], { type: type + ';charset=utf-8;' })
    //IE11 & Edge
    if (window.navigator && window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(data, filename)
    } else {
      //In FF link must be added to DOM to be clicked
      var a = document.createElement('a')
      a.href = window.URL.createObjectURL(data)
      a.setAttribute('download', filename)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  function downloadCsv(content, filename) {
    return download(content, filename || 'download.csv', 'text/csv')
  }

  function downloadText(content, filename) {
    return download(content, filename || 'download.txt', 'text/plain')
  }
}
