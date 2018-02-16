;(function() {
  angular.module('odin.serviceProvider').component('selectGroup', {
    templateUrl: 'serviceProvider/components/groups/select.component.html',
    controller: Controller,
    bindings: { onUpdate: '&', serviceProviderId: '<' }
  })

  function Controller(Alert, GroupService, EventEmitter, HashService, $scope) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.select = select

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function open() {
      ctrl.loading = true
      Alert.modal.open(ctrl.modalId)
      loadGroups()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadGroups() {
      return GroupService.index(ctrl.serviceProviderId).then(function(data) {
        ctrl.groups = data
      })
    }

    function select(group) {
      Alert.modal.close(ctrl.modalId)
      ctrl.onUpdate(EventEmitter({ groupId: group.groupId }))
    }

    $scope.$on('selectGroup:load', open)
  }
})()
