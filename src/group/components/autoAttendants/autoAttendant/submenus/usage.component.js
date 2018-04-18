;(function() {
  angular.module('odin.group').component('groupAutoAttendantSubmenuUsage', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/submenus/usage.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      serviceUserId: '<',
      submenuId: '<'
    }
  })

  function Controller(Alert, GroupAutoAttendantSubmenuService, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open

    function onInit() {
      ctrl.loading = true
      return loadUsage()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUsage() {
      return GroupAutoAttendantSubmenuService.usage(
        ctrl.serviceUserId,
        ctrl.submenuId
      ).then(function(data) {
        ctrl.usage = data
        console.log('usage', data)
      })
    }

    function open(usage) {
      var route = Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'autoAttendants',
        ctrl.serviceUserId
      )
      usage.submenuId ? route('submenus', usage.submenuId) : route()
    }
  }
})()
