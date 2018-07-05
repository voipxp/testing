/*
  Current: https://wikiki.github.io/form/checkradio/
  Alternate: https://lokesh-coder.github.io/pretty-checkbox/
*/

;(function() {
  angular.module('odin.common').directive('pbsInputCheckbox', Wrap('checkbox'))
  angular.module('odin.common').directive('pbsInputSwitch', Wrap('switch'))
  angular.module('odin.common').directive('pbsInputRadio', Wrap('radio'))
  angular.module('odin.common').directive('pbsInputCheckbox', Directive)
  angular.module('odin.common').directive('pbsInputRadio', Directive)
  angular.module('odin.common').directive('pbsInputSwitch', Directive)

  function Wrap(type) {
    return function() {
      var inputType = type === 'radio' ? 'radio' : 'checkbox'
      var directive = 'pbs-input-' + type
      return {
        restrict: 'E',
        template: '<input type="' + inputType + '"' + directive + '>',
        replace: true
      }
    }
  }

  function Directive(HashService) {
    return {
      restrict: 'A',
      compile: function(element, attrs) {
        if (attrs.ngShow) {
          console.log('ngShow is here')
        }
        return function(scope, element, attrs) {
          // add id and css classes to input
          var id = HashService.guid()
          element.attr('id', id)
          var cssClass = angular.isDefined(attrs.pbsInputSwitch)
            ? 'switch'
            : 'is-checkradio'
          element.addClass(cssClass)

          // create a wrapper
          var div = angular.element(document.createElement('div'))
          div.addClass('field')

          // wrap input inside div
          element.after(div)
          div.prepend(element)

          // create the label
          var label = angular.element(document.createElement('label'))
          label.attr('for', id)
          label.html(attrs.label)
          if (!attrs.label && !angular.isDefined(attrs.ngLabel)) {
            label.css({ paddingLeft: '.5rem' })
          }
          label.css({ marginLeft: 0 })

          // append label after input
          element.after(label)

          // blur the element on click
          element.on('click', function() {
            element[0].blur()
          })

          // add indeterminate if set
          if (angular.isDefined(attrs.indeterminate)) {
            scope.$watch('ngModel', function(newVal) {
              element[0].indeterminate = newVal === undefined
            })
          }

          // show/hide wrapped element via ngShow
          scope.$watch(attrs.ngShow, function(newVal) {
            if (angular.isDefined(attrs.ngShow)) {
              if (newVal) {
                div.removeClass('ng-hide')
              } else {
                div.addClass('ng-hide')
              }
            }
          })

          scope.$watch(attrs.ngLabel, function(newVal) {
            label.html(newVal)
            if (newVal) {
              label.css({ paddingLeft: null })
            }
          })

          // clean up the wrapped elements
          scope.$on('$destroy', function() {
            div.after(element)
            div.remove()
          })
        }
      }
    }
  }
})()
