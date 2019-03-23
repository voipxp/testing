import angular from 'angular'

angular.module('odin.common').filter('humanize', Humanize)

function Humanize() {
  return function(input) {
    if (typeof input === 'string') {
      return input.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
        return str.toUpperCase()
      })
    }
  }
}
