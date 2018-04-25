;(function() {
  angular.module('odin.group').component('autoAttendantClone', {
    templateUrl: 'group/components/autoAttendants/clone.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', onUpdate: '&' }
  })

  function Controller(
    EventEmitter,
    CloneGroupServiceService,
    GroupAutoAttendantService,
    $scope,
    Alert,
    ACL
  ) {
    var ctrl = this
    ctrl.selectServiceProvider = selectServiceProvider
    ctrl.selectGroup = selectGroup
    ctrl.onSelectServiceProvider = onSelectServiceProvider
    ctrl.onSelectGroup = onSelectGroup
    ctrl.selectAutoAttendant = selectAutoAttendant
    ctrl.onSelectAutoAttendant = onSelectAutoAttendant
    ctrl.onSelectUserId = onSelectUserId
    ctrl.onSelectPhone = onSelectPhone

    function selectServiceProvider() {
      $scope.$broadcast('selectServiceProvider:load')
    }

    function selectGroup() {
      if (!ctrl.fromServiceProviderId) return selectServiceProvider()
      $scope.$broadcast('selectGroup:load')
    }

    function selectAutoAttendant() {
      if (!ctrl.fromServiceProviderId) return selectServiceProvider()
      if (!ctrl.fromGroupId) return selectGroup()
      $scope.$broadcast('selectAutoAttendant:load')
    }

    function onSelectServiceProvider(event) {
      if (event.serviceProviderId !== ctrl.fromServiceProviderId) {
        ctrl.fromGroupId = null
        ctrl.fromAutoAttendantId = null
      }
      ctrl.fromServiceProviderId = event.serviceProviderId
    }

    function onSelectGroup(event) {
      if (event.groupId !== ctrl.fromGroupId) {
        ctrl.fromAutoAttendantId = null
      }
      ctrl.fromGroupId = event.groupId
    }

    function onSelectAutoAttendant(event) {
      ctrl.fromAutoAttendantId = event.serviceUserId
    }

    function onSelectUserId(event) {
      ctrl.autoAttendant.serviceUserId = event.userId
    }

    function onSelectPhone(event) {
      _.set(
        ctrl.autoAttendant,
        'serviceInstanceProfile.phoneNumber',
        event.phoneNumber
      )
    }

    function load() {
      ctrl.isProvisioning = ACL.has('Provisioning')
      ctrl.isServiceProvider = ACL.has('Service Provider')
      if (!ctrl.isProvisioning) {
        ctrl.fromServiceProviderId = ctrl.serviceProviderId
      }
      if (!ctrl.isServiceProvider) {
        ctrl.fromGroupId = ctrl.groupId
      }
      ctrl.fromAutoAttendantId = null
      ctrl.autoAttendant = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId,
        serviceInstanceProfile: {
          aliases: [],
          phoneNumber: null,
          extension: null
        }
      }
      ctrl.options = {}
      Alert.modal.open('cloneGroupAutoAttendantModal', function(close) {
        create(ctrl.autoAttendant, ctrl.options, close)
      })
    }

    function create(autoAttendant, options, callback) {
      console.log('create', autoAttendant)
      if (
        _.get(autoAttendant, 'serviceInstanceProfile.password') !==
        _.get(autoAttendant, 'serviceInstanceProfile.password2')
      ) {
        Alert.notify.danger('Passwords do not match')
        return
      }
      Alert.spinner.open()
      CloneGroupServiceService.autoAttendant(ctrl.fromAutoAttendantId, {
        data: autoAttendant,
        options: options
      })
        .then(function() {
          Alert.notify.success('Auto Attendant Cloned')
          // callback()
          sendUpdate(autoAttendant)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function sendUpdate(autoAttendant) {
      ctrl.onUpdate(EventEmitter({ autoAttendant: autoAttendant }))
    }

    $scope.$on('groupCloneAutoAttendant:load', load)
  }
})()
