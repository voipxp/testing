import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterCreate', {
  template,
  controller,
  bindings: { serviceProviderId: '=', groupId: '=', onSave: '&' }
})

controller.$inject = [
  'Alert',
  'GroupCallCenterService',
  '$scope',
  'GroupDomainService',
  'GroupPasswordService',
  '$q'
]
function controller(
  Alert,
  GroupCallCenterService,
  $scope,
  GroupDomainService,
  GroupPasswordService,
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
      internalPreferredAudioCodec: 'None',
      enableReporting: false,
      allowCallsToAgentsInWrapUp: false,
      overrideAgentWrapUpTime: false,
      enableAutomaticStateChangeForAgents: false,
      forceDeliveryOfCalls: false
    }
    if ($scope.addGroupCallCenterDetailsForm) {
      $scope.addGroupCallCenterDetailsForm.$setPristine()
    }
    
    Alert.spinner.open()
    loadPasswordRulesMinLength()
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
    return GroupDomainService.index(ctrl.serviceProviderId, ctrl.groupId).then(
      function(data) {
        ctrl.domains = data
        return data
      }
    )
  }

  function  loadPasswordRulesMinLength() {
      GroupPasswordService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(rules) {
      ctrl.passMinLen = rules.minLength
      return rules
    })
  }
  
  function create(center, callback) {
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
