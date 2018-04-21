;(function() {
  angular.module('odin.common').directive('pbsMarginTop', pbsMarginTop)
  function pbsMarginTop() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.css('display', 'block')
        element.addClass('margin-top')
      }
    }
  }
  angular.module('odin.common').directive('pbsMarginBottom', pbsMarginBottom)
  function pbsMarginBottom() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.css('display', 'block')
        element.addClass('margin-bottom')
      }
    }
  }
})()
