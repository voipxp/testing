;(function() {
  angular.module('odin.common').directive('pbsListItem', pbsListItem)

  function pbsListItem() {
    var template =
      '<tr>' +
      '  <td style="width: 60%">' +
      '    <span ng-class="{\'is-child\': nested}">{{ label }}</span>' +
      '  </td>' +
      '  <td ng-transclude></td>' +
      '</tr>'
    return {
      restrict: 'E',
      template: template,
      replace: true,
      transclude: true,
      scope: { label: '@', nested: '<' }
    }
  }

  angular.module('odin.common').directive('pbsListSection', pbsListSection)

  function pbsListSection() {
    var template =
      '<tr><th colspan="2" style="padding-left: 0"><h4 class="subtitle has-text-weight-semibold" ng-transclude></h4></th></tr>'
    return {
      restrict: 'E',
      template: template,
      replace: true,
      transclude: true,
      scope: { label: '@' }
    }
  }
})()
