import angular from 'angular'

angular
  .module('odin.ui')
  .directive('pbsButton', pbsButton())
  .directive('pbsButtonNext', pbsButton('fa-chevron-right', 'is-link', 'Next'))
  .directive(
    'pbsButtonPrevious',
    pbsButton('fa-chevron-left', 'is-link', 'Previous')
  )
  .directive('pbsButtonCancel', pbsButton('fa-times', '', 'Cancel'))
  .directive('pbsButtonDelete', pbsButton('fa-trash', 'is-danger', 'Delete'))
  .directive('pbsButtonAdd', pbsButton('fa-plus', 'is-link', 'Add'))
  .directive(
    'pbsButtonDownload',
    pbsButton('fa-download', 'is-link', 'Download')
  )
  .directive('pbsButtonSave', pbsButton('fa-check', 'is-success', 'Save'))
  .directive('pbsButtonUpload', pbsButton('fa-upload', 'is-link', 'Upload'))
  .directive('pbsButtonConfig', pbsButton('fa-cog', 'is-link', 'Config'))
  .directive('pbsButtonInfo', pbsButton('fa-info', 'is-info', 'Info'))
  .directive('pbsButtonSearch', pbsButton('fa-search', 'is-info', 'Search'))

const template = `
<button type="button" class="button" ng-class="buttonColor">
  <span class="icon">
    <i class="fas" ng-class="iconClass"></i>
  </span>
  <span ng-bind="buttonText"></span>
</button>
`

export function pbsButton(icon, color, text) {
  button.$inject = []
  return button
  function button() {
    const directive = {
      restrict: 'E',
      link: linkFunc,
      template: template,
      replace: true,
      scope: { text: '@', color: '@', icon: '@' }
    }
    function linkFunc(scope) {
      scope.buttonText = scope.text || text
      scope.buttonColor = scope.color || color
      scope.iconClass = scope.icon || icon
    }
    return directive
  }
}
