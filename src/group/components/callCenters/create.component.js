;(function() {
  angular.module('odin.group').component('groupCallCenterCreate', {
    templateUrl: 'group/components/callCenters/create.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '=', groupId: '=', onSave: '&' }
  })

  function Controller(
    Alert,
    GroupCallCenterService,
    $scope,
    EventEmitter,
    GroupDomainService,
    $q
  ) {
    var ctrl = this

    ctrl.options = GroupCallCenterService.options
    ctrl.hasPermission = hasPermission

    function activate() {
      ctrl.center = {
        enableVideo: false,
        allowCallerToDialEscapeDigit: false,
        resetCallStatisticsUponEntryInQueue: false,
        allowAgentLogoff: false,
        allowCallWaitingForAgents: false,
        playRingingWhenOfferingCall: false,
        externalPreferredAudioCodec: 'None',
        internalPreferredAudioCodec: 'None'
      }
      if ($scope.addGroupCallCenterDetailsForm) {
        $scope.addGroupCallCenterDetailsForm.$setPristine()
      }
      Alert.spinner.open()
      return loadDomains()
        .catch(function(error) {
          Alert.notify.danger(error)
          return $q.reject(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function hasPermission(attribute) {
      return GroupCallCenterService.hasPermission(ctrl.center, attribute)
    }

    function add() {
      activate().then(function() {
        Alert.modal.open('addGroupCallCenterDetails', function onSave(close) {
          create(ctrl.center, close)
        })
      })
    }

    function loadDomains() {
      return GroupDomainService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.domains = data
        console.log('domains', data)
        return data
      })
    }

    function create(center, callback) {
      if (
        center.serviceInstanceProfile.password &&
        center.serviceInstanceProfile.password !==
          center.serviceInstanceProfile.password2
      ) {
        Alert.notify.danger('Profile Passwords Do Not Match')
        return
      }
      center.serviceProviderId = ctrl.serviceProviderId
      center.groupId = ctrl.groupId
      center.serviceUserId =
        center.serviceUserIdPrefix + '@' + center.serviceUserIdSuffix
      Alert.spinner.open()
      GroupCallCenterService.store(ctrl.serviceProviderId, ctrl.groupId, center)
        .then(function() {
          Alert.notify.success('Call Center Created')
          if (_.isFunction(callback)) {
            callback()
          }
          if (_.isFunction(ctrl.onSave)) {
            ctrl.onSave({ center: center })
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    $scope.$on('groupCallCenterCreate:load', add)
  }
})()
