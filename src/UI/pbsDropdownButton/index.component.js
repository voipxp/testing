;(function() {
  angular.module('odin.UI').component('pbsButtonDropdownDoc', {
    templateUrl: 'UI/pbsDropdownButton/index.component.html',
    controller: Controller
  })

  function Controller() {
    var ctrl = this

    ctrl.onSelect = function(event) {
      console.log('onClick', event)
      ctrl.selected = event
    }
    ctrl.icons = ['fa-cogs', 'fa-bulk', 'fa-sync']
    ctrl.icon = 'fa-cogs'
    ctrl.items = ['Do Something', 'Do Something Else']
  }
})()
