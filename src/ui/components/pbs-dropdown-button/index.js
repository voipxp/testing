import angular from 'angular'
import template from './index.html'

angular.module('odin.UI').component('pbsButtonDropdown', {
  template,
  controller,
  bindings: { icon: '@', items: '<', onSelect: '&' }
})

controller.$inject = ['EventEmitter']
function controller(EventEmitter) {
  const ctrl = this

  ctrl.$onChanges = function(change) {
    if (!change.icon) return
    ctrl.icon = change.icon.currentValue || 'fa-cogs'
  }

  ctrl.select = function(item) {
    ctrl.onSelect(EventEmitter(item))
    ctrl.isActive = false
  }
}
