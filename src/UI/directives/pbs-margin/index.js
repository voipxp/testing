import angular from 'angular'

angular.module('odin.UI').directive('pbsMarginTop', pbsMarginTop)
angular.module('odin.UI').directive('pbsMarginBottom', pbsMarginBottom)

function pbsMarginTop() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.css('display', 'block')
      element.addClass('margin-top')
    }
  }
}

function pbsMarginBottom() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.css('display', 'block')
      element.addClass('margin-bottom')
    }
  }
}
