import angular from 'angular'

const template = `
<div ng-if="$ctrl.shouldLoad()">
  <div ng-show="$ctrl.item.selected" ng-transclude></div>
</div>
`

angular.module('odin.ui').component('pbsMenuItem', {
  template,
  controller,
  bindings: { label: '@', delay: '<' },
  require: { section: '^pbsMenuSection' },
  transclude: true
})

function controller() {
  const ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onDestroy = onDestroy
  ctrl.shouldLoad = shouldLoad

  function onInit() {
    ctrl.item = {
      label: ctrl.label,
      selected: false,
      section: ctrl.section.label
    }
    ctrl.section.add(ctrl.item)
  }

  function onDestroy() {
    ctrl.section.remove(ctrl.item)
  }

  function shouldLoad() {
    // always show if selected
    if (ctrl.item.selected) return true
    // if delay is implicitly set to false then show
    if (ctrl.delay === false) return true
    // if delay is implicitly set to true then hide
    if (ctrl.delay === true) return false
    // if section is set to true then hide
    if (ctrl.section.delay === true) return false
    // if menu delay is not set to true then show
    if (ctrl.section.menu.delay === true) return false
  }
}
