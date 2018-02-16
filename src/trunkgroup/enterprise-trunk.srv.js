;(function() {
  angular
    .module('odin.trunkgroup')
    .factory('EnterpriseTrunkService', EnterpriseTrunkService)

  function EnterpriseTrunkService($http) {
    var service = {
      list: list,
      get: get,
      update: update,
      assignedUsers: assignedUsers,
      availableUsers: availableUsers,
      addUsers: addUsers,
      removeUsers: removeUsers,
      availableTrunks: availableTrunks,
      assignedTrunks: assignedTrunks,
      isAssignedTrunk: isAssignedTrunk
    }
    return service

    function list(serviceProviderId, groupId) {
      return $http
        .get('/trunkgroup/enterprise-trunks/', {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          var data = response.data.trunks
          console.log('trunks', data.enterpriseTrunkTable)
          return data.enterpriseTrunkTable || []
        })
    }

    function get(trunkName, serviceProviderId, groupId) {
      return $http
        .get('/trunkgroup/enterprise-trunks/' + trunkName, {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data.trunk
        })
    }

    function update(trunkName, serviceProviderId, groupId, trunkData) {
      return $http
        .put('/trunkgroup/enterprise-trunks/' + trunkName, trunkData, {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data.trunk
        })
    }

    function assignedUsers(trunkName, serviceProviderId, groupId) {
      return $http
        .get('/trunkgroup/enterprise-trunks-users/' + trunkName, {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          var data = response.data.assignedUsers
          return data.enterpriseTrunkUserTable || []
        })
    }

    function availableUsers(serviceProviderId, groupId) {
      return $http
        .get('/trunkgroup/enterprise-trunks-users/', {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          var data = response.data.availableUsers
          return data.userTable || []
        })
    }

    function addUsers(trunkName, serviceProviderId, groupId, userIds) {
      if (_.isArray(userIds)) {
        userIds = { add: userIds }
      }
      return $http
        .put('/trunkgroup/enterprise-trunks-users/' + trunkName, userIds, {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            method: 'PUT'
          }
        })
        .then(function(response) {
          return response.data.addUsers
        })
    }

    function removeUsers(trunkName, serviceProviderId, groupId, userIds) {
      if (_.isArray(userIds)) {
        userIds = { remove: userIds }
      }
      return $http
        .put('/trunkgroup/enterprise-trunks-users/' + trunkName, userIds, {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data.removeUsers
        })
    }

    function availableTrunks(serviceProviderId, groupId) {
      return $http
        .get('/trunkgroup/enterprise-trunks-group-trunks/', {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data.availableTrunkGroups
        })
    }

    function assignedTrunks(trunk) {
      var trunks = []
      if (trunk.priorityWeightedRouting) {
        trunks = trunk.priorityWeightedRouting.priorityWeightedTrunkGroup
      } else if (trunk.orderedRouting) {
        trunks = trunk.orderedRouting.trunkGroup
      }
      return trunks
    }

    function isAssignedTrunk(trunk, newTrunk, isEnterprise) {
      return isEnterprise
        ? isAssignedEnterpriseTrunk(trunk, newTrunk)
        : isAssignedGroupTrunk(trunk, newTrunk)
    }

    function isAssignedEnterpriseTrunk(trunk, newTrunk) {
      return _.find(assignedTrunks(trunk), function(assigned) {
        if (trunk.priorityWeightedRouting) {
          return (
            assigned.trunkGroup.trunkGroupName === newTrunk.trunkGroupName &&
            assigned.trunkGroup.groupId === newTrunk.groupId
          )
        } else if (trunk.orderedRouting) {
          return (
            assigned.trunkGroupName === newTrunk.trunkGroupName &&
            assigned.groupId === newTrunk.groupId
          )
        } else {
          return false
        }
      })
    }

    function isAssignedGroupTrunk(trunk, newTrunk) {
      return _.find(assignedTrunks(trunk), function(assigned) {
        if (trunk.priorityWeightedRouting) {
          return assigned.trunkGroup === newTrunk.trunkGroupName
        } else if (trunk.orderedRouting) {
          return assigned.trunkGroupName === newTrunk.trunkGroupName
        } else {
          return false
        }
      })
    }
  }
})()
