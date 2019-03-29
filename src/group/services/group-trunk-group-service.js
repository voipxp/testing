import angular from 'angular'

angular.module('odin.group').factory('GroupTrunkGroupService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = {
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy
  }
  service.options = {
    capacityExceededAction: ['Forward', 'Reroute'],
    unreachableDestinationAction: ['Forward', 'Reroute'],
    callForwardingAlwaysAction: ['Forward', 'Reroute'],
    pilotUserCallingLineIdentityForExternalCallsPolicy: [
      'All Originating Calls',
      'Unscreened Originating Calls',
      'No Calls'
    ],
    pilotUserCallingLineIdentityPolicy: [
      'All Originating Calls',
      'Unscreened Originating Calls',
      'No Calls'
    ],
    pilotUserChargeNumberPolicy: [
      'All Originating Calls',
      'Unscreened Originating Calls',
      'No Calls'
    ],
    pilotUserCallingLineAssertedIdentityPolicy: [
      'All Originating Calls',
      'Unscreened Originating Calls'
    ],
    pilotUserCallOptimizationPolicy: [
      'Optimize For User Services',
      'Optimize For High Call Volume'
    ],
    clidSourceForScreenedCallsPolicy: [
      'Profile Name Profile Number',
      'Received Name Profile Number',
      'Received Name Received Number'
    ],
    userLookupPolicy: ['Basic', 'Extended'],
    pilotUserCallingLineIdentityForEmergencyCallsPolicy: [
      'All Originating Calls',
      'Unscreened Originating Calls',
      'No Calls'
    ],
    invitationTimeout: { min: 1, max: 15 },
    continuousOptionsSendingIntervalSeconds: { min: 30, max: 86400 },
    failureOptionsSendingIntervalSeconds: { min: 10, max: 86400 },
    failureThresholdCounter: { min: 1, max: 60 },
    successThresholdCounter: { min: 1, max: 60 },
    inviteFailureThresholdCounter: { min: 1, max: 60 },
    inviteFailureThresholdWindowSeconds: { min: 30, max: 240 },
    maxActiveCalls: { min: 1 },
    maxIncomingCalls: { min: 1, max: 999999 },
    maxOutgoingCalls: { min: 1, max: 999999 },
    burstingMaxActiveCalls: { min: 0, max: 999999 },
    burstingMaxIncomingCalls: { min: 0, max: 999999 },
    burstingMaxOutgoingCalls: { min: 0, max: 999999 },
    capacityExceededTrapInitialCalls: { min: 0 },
    capacityExceededTrapOffsetCalls: { min: 0 }
  }
  service.default = function() {
    return {
      allowTerminationToDtgIdentity: false,
      allowTerminationToTrunkGroupIdentity: false,
      allowUnscreenedCalls: false,
      allowUnscreenedEmergencyCalls: false,
      capacityExceededTrapInitialCalls: 0,
      capacityExceededTrapOffsetCalls: 0,
      clidSourceForScreenedCallsPolicy: 'Profile Name Profile Number',
      continuousOptionsSendingIntervalSeconds: 30,
      enableBursting: false,
      enableNetworkAddressIdentity: false,
      failureOptionsSendingIntervalSeconds: 10,
      failureThresholdCounter: 1,
      includeDtgIdentity: false,
      includeOtgIdentityForNetworkCalls: false,
      includeTrunkGroupIdentity: false,
      includeTrunkGroupIdentityForNetworkCalls: false,
      invitationTimeout: 6,
      inviteFailureThresholdCounter: 1,
      inviteFailureThresholdWindowSeconds: 30,
      pilotUserCallOptimizationPolicy: 'Optimize For User Services',
      pilotUserCallingLineAssertedIdentityPolicy:
        'Unscreened Originating Calls',
      pilotUserCallingLineIdentityForEmergencyCallsPolicy: 'No Calls',
      pilotUserCallingLineIdentityForExternalCallsPolicy: 'No Calls',
      pilotUserChargeNumberPolicy: 'No Calls',
      prefixEnabled: false,
      requireAuthentication: false,
      routeToPeeringDomain: false,
      sendContinuousOptionsMessage: false,
      statefulReroutingEnabled: false,
      successThresholdCounter: 1,
      useSystemCLIDSourceForScreenedCallsPolicy: true,
      useSystemCallingLineAssertedIdentityPolicy: true,
      useSystemUserLookupPolicy: true,
      userLookupPolicy: 'Basic'
    }
  }
  var url = Route.api('/groups/trunk-groups')

  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function store(serviceProviderId, groupId, obj) {
    return $http.post(url(), obj).then(function(response) {
      return response.data
    })
  }

  function show(serviceProviderId, groupId, trunkName) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          name: trunkName
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceProviderId, groupId, trunkName, trunk) {
    return $http.put(url(), trunk).then(function(response) {
      return response.data
    })
  }

  function destroy(serviceProviderId, groupId, trunkName) {
    return $http
      .delete(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          name: trunkName
        }
      })
      .then(function(response) {
        return response.data
      })
  }
}
