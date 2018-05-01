;(function() {
  angular.module('odin.UI').component('pbsButtonDropdown', {
    templateUrl: 'UI/pbsDropdownButton/pbsButtonDropdown.component.html',
    bindings: {
      icon: '@',
      items: '<',
      onSelect: '&'
    },
    controller: Controller
  })

  function Controller(EventEmitter) {
    var ctrl = this

    ctrl.$onChanges = function(change) {
      if (!change.icon) return
      ctrl.icon = change.icon.currentValue || 'fa-cogs'
    }

    ctrl.select = function(item) {
      ctrl.onSelect(EventEmitter(item))
      ctrl.isActive = false
    }
  }
})()
