;(function() {
  angular.module('odin.group').component('groupCallCenterDnis', {
    templateUrl:
      'group/components/callCenters/callCenter/advanced/dnis.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', serviceUserId: '<' }
  })

  function Controller(
    GroupCallCenterDnisService,
    GroupCallCenterDnisInstanceService,
    Alert,
    $q,
    Route,
    GroupNumberService
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    ctrl.open = open
    ctrl.add = add
    ctrl.setExtension = setExtension
    ctrl.options = GroupCallCenterDnisService.options
    ctrl.instanceOptions = GroupCallCenterDnisInstanceService.options

    function onInit() {
      ctrl.loading = true
      loadService()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onChanges(changes) {
      if (changes.serviceUserId) {
        ctrl.serviceUserId = changes.serviceUserId.currentValue
      }
      if (changes.serviceProviderId) {
        ctrl.serviceProviderId = changes.serviceProviderId.currentValue
      }
      if (changes.groupId) {
        ctrl.groupId = changes.groupId.currentValue
      }
    }

    function loadService() {
      return GroupCallCenterDnisService.show(ctrl.serviceUserId).then(function(
        data
      ) {
        console.log('DNIS', data)
        ctrl.service = data
      })
    }

    function edit() {
      ctrl.editService = angular.copy(ctrl.service)
      Alert.modal.open('editGroupCallCenterDNIS', function onSave(close) {
        update(ctrl.editService, close)
      })
    }

    function loadNumbers() {
      Alert.spinner.open()
      return loadAvailableNumbers()
        .catch(function(error) {
          Alert.notify.danger(error)
          return $q.reject(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadAvailableNumbers() {
      return GroupNumberService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        'available'
      ).then(function(data) {
        ctrl.numbers = data
      })
    }

    function add() {
      loadNumbers().then(function() {
        ctrl.newService = {
          name: null,
          priority: null,
          dnisPhoneNumber: null,
          extension: null,
          callingLineIdPhoneNumber: null,
          useCustomCLIDSettings: false,
          callingLineIdLastName: null,
          callingLineIdFirstName: null,
          useCustomDnisAnnouncementSettings: false,
          allowOutgoingACDCall: false
        }
        Alert.modal.open('newGroupCallCenterDnisInstance', function(close) {
          create(ctrl.newService, close)
        })
      })
    }

    function setExtension() {
      if (!ctrl.newService.dnisPhoneNumber) {
        ctrl.newService.extension = null
      } else {
        ctrl.newService.extension = ctrl.newService.dnisPhoneNumber.slice(-4)
      }
    }

    function open(dnis) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'callCenters',
        ctrl.serviceUserId
      )(dnis.name)
    }

    function update(service, callback) {
      console.log('GroupCallCenterDnisService', service)
      Alert.spinner.open()
      GroupCallCenterDnisService.update(ctrl.serviceUserId, service)
        .then(loadService)
        .then(function() {
          Alert.notify.success('DNIS Updated')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function create(service, callback) {
      console.log('GroupCallCenterDnisService', service)
      Alert.spinner.open()
      GroupCallCenterDnisInstanceService.store(ctrl.serviceUserId, service)
        .then(function() {
          Alert.notify.success('DNIS Created')
          if (_.isFunction(callback)) {
            callback()
          }
          open(service)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
