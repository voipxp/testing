import angular from 'angular'

angular.module('odin.ui').directive('pbsList', pbsList)

const template = '<table class="table is-fullwidth" ng-transclude></table>'

function pbsList() {
  return {
    restrict: 'E',
    template: template,
    replace: true,
    transclude: true
  }
}
