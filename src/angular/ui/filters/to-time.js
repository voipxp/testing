import angular from 'angular'
import Sugar from 'sugar-date'

angular.module('odin.ui').filter('toTime', Controller)

function Controller() {
  return function(input) {
    var seconds = parseInt(input, 10)
    var date = Sugar.Date.beginningOfDay(new Date())
    Sugar.Date.addSeconds(date, seconds || 0)
    return Sugar.Date.format(date, '{HH}:{mm}:{ss}')
  }
}
