;(function() {
  angular.module('odin.UI').component('pbsDropdownButton', {
    templateUrl: 'UI/pbsDropdownButton/pbsDropdownButton.component.html',
    bindings: {
      icon: '@',
      items: '<',
      onSelect: '&'
    },
    controller: Controller
  })

  function Controller(EventEmitter) {
    var ctrl = this

    ctrl.$onInit = function() {
      ctrl.icon = ctrl.icon || 'fa-cogs'
    }

    ctrl.select = function(item) {
      ctrl.onSelect(EventEmitter(item))
      ctrl.isActive = false
    }
  }
})()
