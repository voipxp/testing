;(function() {
  angular
    .module('odin.trunkgroup')
    .factory('GroupTrunkService', GroupTrunkService)

  function GroupTrunkService($http) {
    var service = {
      list: list,
      get: get,
      update: update,
      availableUsers: availableUsers
    }
    return service

    function list(serviceProviderId, groupId) {
      return $http
        .get('/trunkgroup/group-trunks/', {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          var data = response.data.groupTrunkGroupGetInstanceListResponse || {}
          var table = data.trunkGroupTable || []
          return _.reject(table, function(trunk) {
            return !trunk.deviceName
          })
        })
    }

    function get(trunkName, serviceProviderId, groupId) {
      return $http
        .get('/trunkgroup/group-trunks/' + trunkName, {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return normalizeTrunk(response.data)
        })
    }

    function update(trunkName, serviceProviderId, groupId, trunkData) {
      return $http
        .put('/trunkgroup/group-trunks/' + trunkName, trunkData, {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return normalizeTrunk(response.data)
        })
    }

    function availableUsers(trunkName, serviceProviderId, groupId) {
      return $http
        .get('/trunkgroup/group-trunks-users/' + trunkName, {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          var data =
            response.data.groupTrunkGroupGetInstanceUserListResponse || {}
          return data.trunkGroupUserTable || []
        })
    }

    function normalizeTrunk(data) {
      var trunk =
        data.groupTrunkGroupGetInstanceResponse ||
        data.groupTrunkGroupModifyInstanceResponse ||
        {}
      trunk.unreachableDestinationAction =
        trunk.unreachableDestinationAction || ''
      trunk.callForwardingAlwaysAction = trunk.callForwardingAlwaysAction || ''
      var integerFields = [
        'maxActiveCalls',
        'maxIncomingCalls',
        'maxOutgoingCalls',
        'continuousOptionsSendingIntervalSeconds',
        'failureOptionsSendingIntervalSeconds',
        'failureThresholdCounter',
        'successThresholdCounter',
        'inviteFailureThresholdCounter',
        'inviteFailureThresholdWindowSeconds'
      ]
      _.forEach(integerFields, function(field) {
        trunk[field] = parseInt(trunk[field], 10) || null
      })
      return trunk
    }
  }
})()
