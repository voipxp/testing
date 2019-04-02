import angular from 'angular'
import _ from 'lodash'

angular
  .module('odin.common')
  .directive('ifModuleCreate', ModuleConstructor('create'))
  .directive('ifModuleRead', ModuleConstructor('read'))
  .directive('ifModuleUpdate', ModuleConstructor('update'))
  .directive('ifModuleDelete', ModuleConstructor('delete'))

function ModuleConstructor(permission) {
  return [
    'ngIfDirective',
    'Module',
    function(ngIfDirective, Module) {
      var ngIf = ngIfDirective[0]
      return {
        transclude: ngIf.transclude,
        priority: ngIf.priority,
        terminal: ngIf.terminal,
        restrict: ngIf.restrict,
        link: function($scope, $element, attribute) {
          var attributeName = _.camelCase('if-module-' + permission)
          var value = attribute[attributeName]
          if (!value) return
          var module = $scope.$eval(value)
          if (!module) return
          attribute.ngIf = function() {
            return Module[permission](module)
          }
          ngIf.link.apply(ngIf, arguments)
        }
      }
    }
  ]
}
