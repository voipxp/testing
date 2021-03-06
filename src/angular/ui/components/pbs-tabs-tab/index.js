import angular from 'angular'

const template = `
  <div ng-if="$ctrl.shouldLoad()">
    <div ng-show="$ctrl.tab.selected" ng-transclude></div>
  </div>
  `

angular.module('odin.ui').component('pbsTab', {
  template: template,
  controller,
  bindings: { label: '@', delay: '<' },
  require: { tabs: '^^pbsTabs' },
  transclude: true
})

function controller() {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onDestroy = onDestroy
  ctrl.shouldLoad = shouldLoad

  function onInit() {
    ctrl.tab = {
      label: ctrl.label,
      selected: false
    }
    ctrl.tabs.add(ctrl.tab)
  }

  function onDestroy() {
    ctrl.tabs.remove(ctrl.tab)
  }

  function shouldLoad() {
    // always show if selected
    if (ctrl.tab.selected) return true
    // if delay is implicitly set to false then show
    if (ctrl.delay === false) return true
    // if delay is implicitly set to true then hide
    if (ctrl.delay === true) return false
    // if parent.delay is not set to true then show
    return ctrl.tabs.delay !== true
  }
}
