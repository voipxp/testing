;(function() {
  angular.module('odin.serviceProvider').component('servicePacksUtilization', {
    templateUrl:
      'serviceProvider/components/servicePacks/utilization.component.html',
    controller: Controller,
    require: {
      parent: '^servicePacks'
    }
  })

  function Controller() {
    var ctrl = this
    ctrl.$onInit = function() {
      ctrl.filter = ''
      loadUtilization()
    }

    function loadUtilization() {
      ctrl.utilization = []
      ctrl.parent.servicePacks.forEach(function(servicePack) {
        servicePack.utilization.forEach(function(group) {
          var item = {
            servicePackName: servicePack.servicePackName,
            group: group.group,
            totalPacks: group.totalPacks,
            assigned: group.assigned
          }
          ctrl.utilization.push(item)
        })
      })
    }
  }
})()
