;(function() {
  angular.module('odin.common').directive('stringToNumber', stringToNumber)

  function stringToNumber() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(value) {
          return '' + value
        })
        ngModel.$formatters.push(function(value) {
          return parseFloat(value, 10)
        })
      }
    }
  }
})()