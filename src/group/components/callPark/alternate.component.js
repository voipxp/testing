;(function() {
  angular.module('odin.group').component('selectAlternateUser', {
    templateUrl: 'group/components/callPark/alternate.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', settings: '=' }
  })

  function Controller(Alert, GroupCallParkService, $routeParams) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.select = select
    ctrl.onSelect = onSelect

    function select() {
      Alert.spinner.open()
      GroupCallParkService.recall(ctrl.serviceProviderId, ctrl.groupId)
        .then(function(data) {
          ctrl.users = data
          Alert.modal.open('groupCallParkRecallUserModal')
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function onSelect(user) {
      ctrl.settings.recallAlternateUserId = user && user.userId
      Alert.modal.close('groupCallParkRecallUserModal')
    }
  }
})()
