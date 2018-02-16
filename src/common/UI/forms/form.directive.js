;(function() {
  angular.module('odin.common').directive('pbsForm', pbsForm)

  function pbsForm() {
    var template = '<form novalidate ng-transclude></form>'

    return {
      restrict: 'E',
      template: template,
      replace: true,
      transclude: true
    }
  }

  angular.module('odin.common').directive('pbsFormField', pbsFormField)

  function pbsFormField() {
    var template =
      '<div class="field">' +
      '  <label class="label">{{ label }}</label>' +
      '  <div class="control">' +
      '    <ng-transclude-replace></ng-transclude-replace>' +
      '  </div>' +
      '</div>'
    return {
      restrict: 'E',
      template: template,
      replace: true,
      transclude: true,
      scope: { label: '@' }
    }
  }

  angular
    .module('odin.common')
    .directive('pbsFormFieldHorizontal', pbsFormFieldHorizontal)

  function pbsFormFieldHorizontal() {
    var template =
      '<div class="columns">' +
      '  <div class="column">' +
      '    <pbs-button-static class="is-fullwidth">{{ label }}</pbs-button-static>' +
      '  </div>' +
      '  <div class="column" ng-transclude></div>' +
      '</div>'
    return {
      restrict: 'E',
      template: template,
      replace: true,
      transclude: true,
      scope: { label: '@' }
    }
  }

  angular.module('odin.common').directive('pbsFormSection', pbsFormSection)

  function pbsFormSection() {
    var template =
      '<h4 class="subtitle">{{ title }}<span ng-transclude></span></h4>'
    return {
      restrict: 'E',
      template: template,
      replace: true,
      transclude: true,
      scope: { title: '@' }
    }
  }
})()
