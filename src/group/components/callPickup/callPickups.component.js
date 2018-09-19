;(function() {
  angular.module('odin.group').component('groupCallPickups', {
    templateUrl: 'group/components/callPickup/callPickups.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Alert, GroupCallPickupService, $routeParams, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open
    ctrl.add = add

    function onInit() {
      ctrl.loading = true
      loadGroups()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadGroups() {
      return GroupCallPickupService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.groups = data
        console.log('groups', data)
      })
    }

    function add() {
      ctrl.editGroup = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId
      }
      Alert.modal.open('groupCallPickupCreateModal', function(close) {
        create(ctrl.editGroup, close)
      })
    }

    function create(group, callback) {
      Alert.spinner.open()
      GroupCallPickupService.store(group)
        .then(function() {
          callback()
          Alert.notify.success('Group Created')
          open(group)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function open(group) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'callPickup',
        group.name
      )
    }
  }
})()
