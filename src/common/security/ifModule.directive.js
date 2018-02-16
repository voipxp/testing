;(function() {
  angular
    .module('odin.common')
    .directive('ifModuleCreate', ModuleConstructor('create'))
    .directive('ifModuleRead', ModuleConstructor('read'))
    .directive('ifModuleUpdate', ModuleConstructor('update'))
    .directive('ifModuleDelete', ModuleConstructor('delete'))

  function ModuleConstructor(permission) {
    return function(ngIfDirective, Module) {
      'ngInject'
      var ngIf = ngIfDirective[0]
      return {
        transclude: ngIf.transclude,
        priority: ngIf.priority,
        terminal: ngIf.terminal,
        restrict: ngIf.restrict,
        link: function($scope, $element, $attr) {
          var attrName = _.camelCase('if-module-' + permission)
          var value = $attr[attrName]
          if (!value) return
          var module = $scope.$eval(value)
          if (!module) return
          $attr.ngIf = function() {
            return Module[permission](module)
          }
          ngIf.link.apply(ngIf, arguments)
        }
      }
    }
  }
})()
