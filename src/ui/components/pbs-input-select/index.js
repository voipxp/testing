import angular from 'angular'

angular.module('odin.ui').directive('pbsInputSelect', Wrap)
angular.module('odin.ui').directive('pbsInputSelect', Directive)

function Wrap() {
  return {
    restrict: 'E',
    template: '<select pbs-input-select ng-transclude></select>',
    replace: true,
    transclude: true
  }
}

function Directive() {
  return {
    restrict: 'A',
    scope: { loading: '<' },
    link: function(scope, element, attributes) {
      // create a wrapper
      const div = angular.element(document.createElement('div'))
      div.addClass('select is-fullwidth')

      // wrap select in div
      element.after(div)
      div.prepend(element)

      // show/hide wrapped element via ngShow
      scope.$watch(attributes.ngShow, function(newValue) {
        if (angular.isDefined(attributes.ngShow)) {
          if (newValue) {
            div.removeClass('ng-hide')
          } else {
            div.addClass('ng-hide')
          }
        }
      })

      // clean up the wrap element
      scope.$on('$destroy', function() {
        div.after(element)
        div.remove()
      })

      scope.$watch('loading', function(newValue) {
        if (newValue) {
          div.addClass('is-loading')
        } else {
          div.removeClass('is-loading')
        }
      })
    }
  }
}
