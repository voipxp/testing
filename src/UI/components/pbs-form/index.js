import angular from 'angular'
import './index.css'

angular.module('odin.UI').directive('pbsForm', pbsForm)

const template = '<form novalidate ng-transclude></form>'

function pbsForm() {
  return {
    restrict: 'E',
    template: template,
    replace: true,
    transclude: true
  }
}
