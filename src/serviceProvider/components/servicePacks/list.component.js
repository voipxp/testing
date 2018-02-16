;(function() {
  angular.module('odin.serviceProvider').component('servicePacksList', {
    templateUrl: 'serviceProvider/components/servicePacks/list.component.html',
    controller: Controller,
    require: {
      parent: '^servicePacks'
    }
  })

  function Controller() {
    var ctrl = this
    ctrl.$onInit = function() {
      ctrl.filter = ''
    }
  }
})()
