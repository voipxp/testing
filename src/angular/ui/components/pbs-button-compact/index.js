import angular from 'angular'
angular
  .module('odin.ui')
  .directive('pbsButtonCompact', pbsButtonCompact())
  .directive('pbsButtonCompactAdd', pbsButtonCompact('fa-plus'))
  .directive('pbsButtonCompactCreate', pbsButtonCompact('fa-plus-circle'))
  .directive('pbsButtonCompactCheck', pbsButtonCompact('fa-check'))
  .directive('pbsButtonCompactCancel', pbsButtonCompact('fa-times'))
  .directive('pbsButtonCompactDelete', pbsButtonCompact('fa-trash'))
  .directive('pbsButtonCompactEdit', pbsButtonCompact('fa-cog'))
  .directive('pbsButtonCompactSearch', pbsButtonCompact('fa-search'))
  .directive('pbsButtonCompactSelect', pbsButtonCompact('fa-user-plus'))
  .directive('pbsButtonCompactTarget', pbsButtonCompact('fa-bullseye'))
  .directive('pbsButtonCompactDownload', pbsButtonCompact('fa-download'))
  .directive('pbsButtonCompactUpload', pbsButtonCompact('fa-upload'))
  .directive('pbsButtonCompactInfo', pbsButtonCompact('fa-info'))
  .directive('pbsButtonCompactRefresh', pbsButtonCompact('fa-sync'))
  .directive('pbsButtonCompactList', pbsButtonCompact('fa-list'))
  .directive('pbsButtonCompactDevice', pbsButtonCompact('fa-wrench'))
  .directive('pbsButtonCompactOpen', pbsButtonCompact('fa-external-link-alt'))
  .directive('pbsButtonCompactTag', pbsButtonCompact('fa-tag'))
  .directive('pbsButtonCompactLeft', pbsButtonCompact('fa-chevron-left'))
  .directive('pbsButtonCompactRight', pbsButtonCompact('fa-chevron-right'))
  .directive('pbsButtonCompactLock', pbsButtonCompact('fa-lock'))
  .directive('pbsButtonCompactUsers', pbsButtonCompact('fa-users'))
  .directive('pbsButtonCompactClone', pbsButtonCompact('fa-clone'))
  .directive('pbsButtonCompactBulk', pbsButtonCompact('fa-sitemap'))
  .directive('pbsButtonCompactCogs', pbsButtonCompact('fa-cogs'))
  .directive('pbsButtonCompactVisual', pbsButtonCompact('fa-project-diagram'))

const template = `
<button class="button is-link is-small">
  <span class="icon"><i class="fas"></i></span>
</button>
`
export function pbsButtonCompact(icon) {
  button.$inject = []
  return button
  function button() {
    const directive = {
      template,
      restrict: 'E',
      replace: true,
      link: linkFunc
    }
    function linkFunc(scope, element, attributes) {
      element.find('i').addClass(attributes.icon || icon)
      if (attributes.color) {
        element.find('i').addClass('has-text-' + attributes.color)
      }
    }
    return directive
  }
}
