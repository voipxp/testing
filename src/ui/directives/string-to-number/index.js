import angular from 'angular'

angular.module('odin.ui').directive('stringToNumber', stringToNumber)

function stringToNumber() {
  return {
    require: 'ngModel',
    link: function(scope, element, attributes, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value
      })
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10)
      })
    }
  }
}
