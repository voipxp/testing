;(function() {
  angular
    .module('odin.trunkgroup')
    .controller('GroupTrunkController', GroupTrunkController)

  function GroupTrunkController(
    GroupTrunkService,
    EnterpriseTrunkService,
    $routeParams,
    Session,
    Alert,
    $location,
    DepartmentsService,
    $q,
    $timeout
  ) {
    var vm = this
    var _credentials = {}
    var _cachedTrunk = {}
    var _confirmMessages = {
      unreachableDestinationAction: {
        Forward:
          'Warning: You are about to forward calls when this trunk is unreachable to another phone number. Please ensure the phone number is valid and can be dialled successfully from this trunk. Forwarding calls to a number that is not reachable from the trunk will result in callers being presented a disconnection message. Please note additional call charges may apply for forwarded calls.',
        Reroute:
          'Warning: You are about to forward calls when this trunk is unreachable to another trunk. Please ensure the destination trunk and associated equipment has been configured correctly and that there is sufficient capacity to receive these redirected calls. Not doing so will result in calls failing. Please note additional call charges may apply for forwarded calls.'
      },
      callForwardingAlwaysAction: {
        Forward:
          'Warning: You are about to forward all calls for this trunk to another phone number. Please ensure the phone number is valid and can be dialled successfully from this trunk. Forwarding calls to a number that is not reachable will result in callers receiving a disconnection message. Please note additional call charges may apply for forwarded calls.',
        Reroute:
          'Warning: You are about to forward all calls for this trunk to another trunk. Please ensure the destination trunk and associated equipment has been configured correctly and that there is sufficient capacity to receive these redirected calls. Not doing so will result in calls failing. Please note additional call charges may apply for forwarded calls. '
      }
    }

    // UI Data
    vm.isLoading = true
    vm.trunk = {}
    vm.trunkName = $routeParams.trunkName
    vm.groupId = $location.search().groupId || null
    vm.returnTo = $location.search().returnTo || null
    vm.departments = []
    vm.availableTrunks = []
    vm.updateTrunk = updateTrunk
    vm.updateConfirm = updateConfirm
    vm.canChangeAuthentication = canChangeAuthentication
    vm.updateAuthentication = updateAuthentication
    vm.availableUsers = []
    vm.isDisabled = {
      maxActiveCalls: true,
      pilotUserId: true,
      newName: true,
      trunkGroupState: true,
      sipAuthenticationUserName: true,
      sipAuthenticationPassword: true,
      requireAuthentication: true,
      enableNetworkAddressIdentity: true
    }

    vm.openTrunkGroups = openTrunkGroups
    vm.openEnterpriseTrunks = openEnterpriseTrunks
    vm.openEnterpriseTrunk = openEnterpriseTrunk

    // Init
    activate()

    function activate() {
      vm.isLoading = true
      loadTab($location.search().tab)
      setCredentials()
      $q
        .all([
          GroupTrunkService.get(
            vm.trunkName,
            _credentials.serviceProviderId,
            _credentials.groupId
          ),
          GroupTrunkService.list(
            _credentials.serviceProviderId,
            _credentials.groupId
          ),
          DepartmentsService.list(
            _credentials.serviceProviderId,
            _credentials.groupId,
            true
          )
        ])
        .then(function(results) {
          loadTrunk(results[0])
          console.log('TRUNK', results[0])
          setAvailableTrunks(results[1])
          vm.departments = results[2]
          vm.refreshTabs = true
        })
        .catch(function(error) {
          Alert.notify.danger(error)
          return $q.reject(error)
        })
        .finally(function() {
          vm.isLoading = false
        })
      if (!vm.isDisabled.pilotUserId) {
        loadUsers()
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

    function loadUsers() {
      GroupTrunkService.availableUsers(
        vm.trunkName,
        _credentials.serviceProviderId,
        _credentials.groupId
      )
        .then(function(users) {
          vm.availableUsers = users
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
    }

    function loadTab(tab) {
      if (tab) {
        $timeout(function() {
          $('#' + tab).showTab()
        }, 25)
      }
    }

    function loadTrunk(data) {
      if (data.newName) {
        vm.trunkName = data.newName
      } else {
        data.newName = vm.trunkName
      }
      _cachedTrunk = data
      vm.trunk = angular.copy(_cachedTrunk)
    }

    function revertTrunk() {
      vm.trunk = angular.copy(_cachedTrunk)
    }

    function setAvailableTrunks(trunks) {
      var _availableTrunks = _.reject(trunks, function(trunk) {
        if (vm.groupId) {
          return vm.trunkName === trunk.name && vm.groupId === trunk.groupId
        } else {
          return vm.trunkName === trunk.name
        }
      })
      vm.availableTrunks = _.map(_availableTrunks, function(trunk) {
        return {
          serviceProviderId: _credentials.serviceProviderId,
          groupId: trunk.groupId || _credentials.groupId,
          name: trunk.name
        }
      })
    }

    function updateConfirm(propertyName, changeType) {
      var message = _.get(_confirmMessages, [propertyName, changeType])
      if (!message) return
      Alert.confirm.open(message, function onCancel() {
        vm.trunk[propertyName] = _cachedTrunk[propertyName]
      })
    }

    function canChangeAuthentication() {
      return (
        !vm.isDisabled.requireAuthentication ||
        !vm.isDisabled.sipAuthenticationUserName ||
        !vm.isDisabled.sipAuthenticationPassword
      )
    }

    function updateAuthentication() {
      if (vm.trunk.sipAuthenticationPassword) {
        if (
          vm.trunk.sipAuthenticationPassword !==
          vm.sipAuthenticationPasswordCheck
        ) {
          Alert.notify.danger(
            'Password and Password Confirmation do not match.'
          )
          return
        }
      }
      Alert.confirm
        .open('Are you sure you want to change your Authentication?')
        .then(function() {
          updateTrunk(function() {
            vm.trunk.sipAuthenticationPassword = null
            vm.sipAuthenticationPasswordCheck = null
          })
        })
      /*
        function() {
          vm.trunk.requireAuthentication = _cachedTrunk.requireAuthentication
          vm.trunk.sipAuthenticationUserName =
            _cachedTrunk.sipAuthenticationUserName
          vm.trunk.sipAuthenticationPassword = null
          vm.sipAuthenticationPasswordCheck = null
        }
      */
    }

    function safeTrunkUpdate(trunk) {
      return _.omitBy(trunk, function(value, key) {
        return vm.isDisabled[key]
      })
    }

    function updateTrunk(callback) {
      Alert.spinner.open()
      GroupTrunkService.update(
        vm.trunkName,
        _credentials.serviceProviderId,
        _credentials.groupId,
        safeTrunkUpdate(vm.trunk)
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

    function openTrunkGroups() {
      var search = {}
      if (!Session.data('groupId')) {
        search.groupId = _credentials.groupId
      }
      if (!Session.data('serviceProviderId')) {
        search.serviceProviderId = _credentials.serviceProviderId
      }
      $location.path('/trunking/group').search(search)
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

    function openEnterpriseTrunk() {
      var search = { tab: 'et-trunks' }
      if (!Session.data('groupId')) {
        search.groupId = _credentials.groupId
      }
      if (!Session.data('serviceProviderId')) {
        search.serviceProviderId = _credentials.serviceProviderId
      }
      $location.path('/trunking/enterprise/' + vm.returnTo).search(search)
    }
  }
})()
