import angular from 'angular'

angular.module('odin.UI').directive('pbsFormSection', pbsFormSection)

const template = `<h4 class="subtitle">{{ title }}<span ng-transclude></span></h4>`

function pbsFormSection() {
  return {
    template,
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: { title: '@' }
  }
}
