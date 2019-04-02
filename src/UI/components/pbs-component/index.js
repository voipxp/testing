import angular from 'angular'
import _ from 'lodash'

angular.module('odin.UI').directive('pbsComponent', Directive)

function Directive($compile, $parse) {
  return {
    restrict: 'E',
    link: function(scope, element, attributes) {
      const { component, ...props } = attributes
      const name = _.kebabCase($parse(component)(scope))
      let template = `<${name}`
      Object.entries(props).forEach(([k, v]) => {
        if (!/^\$/.test(k)) {
          template += ` ${_.kebabCase(k)}="${v}"`
        }
      })
      template += `></${name}>`
      element.append($compile(template)(scope))
    }
  }
}
