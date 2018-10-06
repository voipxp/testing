;(function() {
  angular.module('odin.group').component('groupCollaborate', {
    templateUrl: 'group/components/collaborate/collaborate.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, GroupCollaborateService, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.add = add
    ctrl.onClick = onClick
    ctrl.onSelectUserId = onSelectUserId
    ctrl.onSelectPhone = onSelectPhone

    ctrl.columns = [
      {
        key: 'name',
        label: 'Name'
      },
      {
        key: 'participants',
        label: 'Participants'
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number'
      },
      {
        key: 'extension',
        label: 'Extension'
      },
      {
        key: 'department',
        label: 'Department'
      }
    ]

    function onInit() {
      ctrl.loading = true
      return loadBridges()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadBridges() {
      return GroupCollaborateService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.bridges = data
      })
    }

    function onClick(bridge) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'collaborate',
        bridge.serviceUserId
      )
    }

    function add() {
      ctrl.addBridge = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId,
        supportOutdial: false
      }
      Alert.modal.open('addGroupCollaborate', function(close) {
        create(ctrl.addBridge, close)
      })
    }

    function onSelectUserId(event) {
      ctrl.addBridge.serviceUserId = event.userId
    }

    function onSelectPhone(event) {
      console.log('onSelectPhone', event)
      _.set(
        ctrl.addBridge,
        'serviceInstanceProfile.phoneNumber',
        event.phoneNumber
      )
    }

    function create(bridge, callback) {
      Alert.spinner.open()
      GroupCollaborateService.store(bridge.serviceUserId, bridge)
        .then(function() {
          Alert.notify.success('Bridge Created')
          callback()
          onClick(bridge)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
