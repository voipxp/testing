import angular from 'angular'

angular.module('odin.UI').filter('humanize', Humanize)

function Humanize() {
  return function(input) {
    if (typeof input === 'string') {
      return input.replace(/([A-Z])/g, ' $1').replace(/^./, function(string) {
        return string.toUpperCase()
      })
    }
  }
}
