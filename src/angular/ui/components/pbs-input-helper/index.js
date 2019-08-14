/*
  Current: https://wikiki.github.io/form/checkradio/
  Alternate: https://lokesh-coder.github.io/pretty-checkbox/
*/

import angular from 'angular'

export function Wrap(type) {
  return function() {
    const inputType = type === 'radio' ? 'radio' : 'checkbox'
    const template = `<input type="${inputType}" pbs-input-${type}>`
    return { template, restrict: 'E', replace: true }
  }
}

Directive.$inject = ['HashService']
export function Directive(HashService) {
  return {
    restrict: 'A',
    compile: function(element, attributes) {
      if (attributes.ngShow) {
        // console.log('ngShow is here')
      }
      return function(scope, element, attributes) {
        // add id and css classes to input
        const id = HashService.guid()
        element.attr('id', id)
        const cssClass = angular.isDefined(attributes.pbsInputSwitch) ? 'switch' : 'is-checkradio'
        element.addClass(cssClass)

        // create a wrapper
        const div = angular.element(document.createElement('div'))
        div.addClass('field')

        // wrap input inside div
        element.after(div)
        div.prepend(element)

        // create the label
        const label = angular.element(document.createElement('label'))
        label.attr('for', id)
        label.html(attributes.label)
        if (!attributes.label && !angular.isDefined(attributes.ngLabel)) {
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
        if (angular.isDefined(attributes.indeterminate)) {
          scope.$watch('ngModel', function(newValue) {
            element[0].indeterminate = newValue === undefined
          })
        }

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

        scope.$watch(attributes.ngLabel, function(newValue) {
          label.html(newValue)
          if (newValue) {
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
