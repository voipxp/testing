;(function() {
  angular
    .module('odin.trunkgroup')
    .controller('EnterpriseTrunkController', EnterpriseTrunkController)

  function EnterpriseTrunkController(
    EnterpriseTrunkService,
    $routeParams,
    Session,
    Alert,
    $location,
    $timeout,
    $window,
    $q
  ) {
    var vm = this

    var _credentials = {}
    var _availableTrunks = []
    var _cachedTrunk = {}
    var _confirmMessages = {
      routeExhaustionAction: {
        Forward:
          'Warning: You are about to forward excess calls for this trunk to another phone number whenever this trunk has reached capacity. Please ensure the phone number is valid and can be dialled successfully from this trunk. Forwarding calls to a number that is not reachable from the trunk will result in callers being presented a disconnection message. Please note additional call charges may apply for forwarded calls.'
      }
    }

    // UI data
    vm.trunkName = $routeParams.trunkName
    vm.isLoading = false
    vm.isDisabled = { newEnterpriseTrunkName: true }
    vm.isEnterprise = Session.data('isEnterprise')
    // vm.isEnterprise = true
    // Trunk data
    vm.trunk = {}
    vm.cachedTrunk = {}
    vm.updateTrunk = updateTrunk
    vm.updateConfirm = updateConfirm

    // UI functions
    vm.openTrunkGroup = openTrunkGroup
    vm.openUser = openUser
    vm.openEnterpriseTrunks = openEnterpriseTrunks

    // TrunkGroups
    vm.selectedPriority = {}
    vm.selectedTrunks = []
    vm.availableTrunks = availableTrunks
    vm.addTrunks = addTrunks
    vm.toggleSelectedTrunk = toggleSelectedTrunk
    vm.isSelectedTrunk = isSelectedTrunk
    vm.removeTrunk = removeTrunk
    vm.updateTrunkPriority = updateTrunkPriority

    // Users
    vm.selectedUsers = []
    vm.assignedUsers = []
    vm.availableUsers = []
    vm.addUsers = addUsers
    vm.toggleSelectedUser = toggleSelectedUser
    vm.isSelectedUser = isSelectedUser
    vm.removeUser = removeUser

    // load initial data
    activate()

    function activate() {
      vm.isLoading = true
      loadTab($location.search().tab)
      setCredentials()
      $q
        .all([
          EnterpriseTrunkService.get(
            vm.trunkName,
            _credentials.serviceProviderId,
            _credentials.groupId
          ),
          EnterpriseTrunkService.availableTrunks(
            _credentials.serviceProviderId,
            _credentials.groupId
          ),
          EnterpriseTrunkService.assignedUsers(
            vm.trunkName,
            _credentials.serviceProviderId,
            _credentials.groupId
          ),
          EnterpriseTrunkService.availableUsers(
            _credentials.serviceProviderId,
            _credentials.groupId
          )
        ])
        .then(function(results) {
          loadTrunk(results[0])
          _availableTrunks = results[1]
          vm.assignedUsers = results[2]
          vm.availableUsers = results[3]
          vm.refreshTabs = true
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          vm.isLoading = false
        })
    }

    function loadTab(tab) {
      if (tab) {
        $timeout(function() {
          $('#' + tab).showTab()
        }, 25)
      }
    }

    function setCredentials() {
      _credentials = _credentials || {}
      _credentials.serviceProviderId = Session.data('serviceProviderId')
      _credentials.groupId = Session.data('groupId')
      var _groupId = $location.search().groupId
      var _serviceProviderId = $location.search().serviceProviderId
      if (_groupId) {
        _credentials.groupId = _groupId
      }
      if (_serviceProviderId) {
        _credentials.serviceProviderId = _serviceProviderId
      }
    }

    function loadTrunk(data) {
      console.log('loadTrunk', data)
      if (data.newEnterpriseTrunkName) {
        vm.trunkName = data.newEnterpriseTrunkName
      } else {
        data.newEnterpriseTrunkName = vm.trunkName
      }
      _cachedTrunk = data
      vm.trunk = angular.copy(_cachedTrunk)
    }

    function revertTrunk() {
      vm.trunk = angular.copy(_cachedTrunk)
    }

    function openTrunkGroup(trunk) {
      var trunkGroupName
      var groupId
      if (trunk.trunkGroupName) {
        // EnterpriseEnterprise ordered routing
        // GroupEnterprise ordered routing
        trunkGroupName = trunk.trunkGroupName
        groupId = trunk.groupId
      } else {
        var trunkGroup = trunk.trunkGroup
        if (_.isObject(trunkGroup)) {
          // EnterpriseEnterprise priority routing
          trunkGroupName = trunkGroup.trunkGroupName
          groupId = trunkGroup.groupId
        } else {
          // GroupEnterprise priority routing
          trunkGroupName = trunkGroup
          if (!Session.data('groupId')) {
            groupId = _credentials.groupId
          }
        }
      }
      var search = { returnTo: vm.trunkName }
      // needed for EnterpriseEnterprise
      if (groupId) {
        search.groupId = groupId
      }
      if (!Session.data('serviceProviderId')) {
        search.serviceProviderId = _credentials.serviceProviderId
      }
      $location.path('/trunking/group/' + trunkGroupName).search(search)
    }

    function openUser(user) {
      $window.location.href = '/app/#!/users/' + user.userId
    }

    function updateTrunkPriority(trunk) {
      vm.selectedPriority = trunk
      vm.selectedPriority.weight = parseInt(vm.selectedPriority.weight, 10)
      Alert.modal.open('group-trunk-priority', function onSave(close) {
        updateTrunk(close)
      })
    }

    function addTrunks() {
      vm.selectedTrunks = []
      Alert.modal.open('add-group-trunk', function onSave(close) {
        if (vm.selectedTrunks.length < 1) {
          return close()
        }
        _.forEach(vm.selectedTrunks, _addTrunk)
        updateTrunk(close)
      })
    }

    function removeTrunk(trunk) {
      Alert.confirm
        .open('Are you sure you want to remove ' + getTrunkName(trunk) + '?')
        .then(function() {
          _removeTrunk(trunk)
          updateTrunk()
        })
    }

    function _removeTrunk(trunk) {
      if (trunk.trunkGroup) {
        _.remove(vm.trunk.priorityWeightedRouting.priorityWeightedTrunkGroup, {
          trunkGroup: trunk.trunkGroup
        })
      } else if (trunk.trunkGroupName) {
        _.remove(vm.trunk.orderedRouting.trunkGroup, {
          trunkGroupName: trunk.trunkGroupName
        })
      }
    }

    function _addTrunk(trunk) {
      return vm.isEnterprise
        ? _addEnterpriseTrunk(trunk)
        : _addGroupTrunk(trunk)
    }

    function _addEnterpriseTrunk(trunk) {
      if (vm.trunk.priorityWeightedRouting) {
        vm.trunk.priorityWeightedRouting.priorityWeightedTrunkGroup.push({
          trunkGroup: trunk,
          weight: '50',
          priority: '10'
        })
      } else if (vm.trunk.orderedRouting) {
        vm.trunk.orderedRouting.trunkGroup.push(trunk)
      }
    }

    function _addGroupTrunk(trunk) {
      if (vm.trunk.priorityWeightedRouting) {
        vm.trunk.priorityWeightedRouting.priorityWeightedTrunkGroup.push({
          trunkGroup: trunk.trunkGroupName,
          weight: '50',
          priority: '10'
        })
      } else if (vm.trunk.orderedRouting) {
        vm.trunk.orderedRouting.trunkGroup.push({
          trunkGroupName: trunk.trunkGroupName
        })
      }
    }

    function isSelectedTrunk(trunk) {
      return _.indexOf(vm.selectedTrunks, trunk) !== -1
    }

    function toggleSelectedTrunk(trunk) {
      if (isSelectedTrunk(trunk)) {
        vm.selectedTrunks.splice(_.indexOf(vm.selectedTrunks, trunk), 1)
      } else {
        vm.selectedTrunks.push(trunk)
      }
    }

    function removeUser(user) {
      var message = 'Are you sure you want to remove ' + user.userId + '?'
      Alert.confirm.open(message).then(function() {
        Alert.spinner.open()
        EnterpriseTrunkService.removeUsers(
          vm.trunkName,
          _credentials.serviceProviderId,
          _credentials.groupId,
          [user.userId]
        )
          .then(function() {
            _removeUser(user)
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
    }

    function _removeUser(user) {
      _.remove(vm.assignedUsers, { userId: user.userId })
      vm.availableUsers.push(user)
    }

    function _addUser(user) {
      _.remove(vm.availableUsers, { userId: user.userId })
      vm.assignedUsers.push(user)
    }

    function addUsers() {
      vm.selectedUsers = []
      Alert.modal.open('add-trunk-users', function onSave(close) {
        if (vm.selectedUsers.length < 1) {
          return close()
        }
        Alert.spinner.open()
        var userIds = _.map(vm.selectedUsers, 'userId')
        EnterpriseTrunkService.addUsers(
          vm.trunkName,
          _credentials.serviceProviderId,
          _credentials.groupId,
          userIds
        )
          .then(function() {
            _.forEach(vm.selectedUsers, _addUser)
            close()
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
    }

    function toggleSelectedUser(user) {
      if (isSelectedUser(user)) {
        vm.selectedUsers.splice(_.indexOf(vm.selectedUsers, user), 1)
      } else {
        vm.selectedUsers.push(user)
      }
    }

    function isSelectedUser(user) {
      return _.indexOf(vm.selectedUsers, user) !== -1
    }

    function availableTrunks() {
      return _.filter(_availableTrunks, function(thisTrunk) {
        return !EnterpriseTrunkService.isAssignedTrunk(
          vm.trunk,
          thisTrunk,
          vm.isEnterprise
        )
      })
    }

    function updateConfirm(propertyName, changeType) {
      var message = _.get(_confirmMessages, [propertyName, changeType])
      if (!message) return
      Alert.confirm.open(message, function onCancel() {
        vm.trunk[propertyName] = _cachedTrunk[propertyName]
      })
    }

    function updateTrunk(callback) {
      Alert.spinner.open()
      EnterpriseTrunkService.update(
        vm.trunkName,
        _credentials.serviceProviderId,
        _credentials.groupId,
        vm.trunk
      )
        .then(function(trunk) {
          loadTrunk(trunk)
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          revertTrunk()
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function getTrunkName(trunk) {
      if (!trunk) {
        return
      }
      if (trunk.trunkGroupName && trunk.groupId) {
        return trunk.trunkGroupName + ' (' + trunk.groupId + ')'
      }
      var trunkGroup = trunk.trunkGroup
      if (_.isObject(trunkGroup)) {
        return trunkGroup.trunkGroupName + ' (' + trunkGroup.groupId + ')'
      } else {
        return trunkGroup
      }
    }

    function openEnterpriseTrunks() {
      var search = {}
      if (!Session.data('groupId')) {
        search.groupId = _credentials.groupId
      }
      if (!Session.data('serviceProviderId')) {
        search.serviceProviderId = _credentials.serviceProviderId
      }
      $location.path('/trunking/enterprise').search(search)
    }
  }
})()
