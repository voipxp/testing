;(function() {
  angular
    .module('odin.trunkgroup')
    .controller('GroupTrunksController', GroupTrunksController)

  function GroupTrunksController(
    GroupTrunkService,
    EnterpriseTrunkService,
    $location,
    Alert,
    Session
  ) {
    var vm = this
    var _credentials = {}

    // UI Data
    vm.trunks = []
    vm.isLoading = true
    vm.openTrunkGroup = openTrunkGroup
    vm.isEnterprise = Session.data('isEnterprise')

    // Init
    activate()

    function activate() {
      setCredentials()
      loadTrunks()
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

    function openTrunkGroup(trunk) {
      return vm.isEnterprise
        ? openEnterpriseTrunkGroup(trunk)
        : openGroupTrunkGroup(trunk)
    }

    function openGroupTrunkGroup(trunk) {
      var search = {}
      if (!Session.data('serviceProviderId')) {
        search.serviceProviderId = _credentials.serviceProviderId
      }
      if (!Session.data('groupId')) {
        search.groupId = _credentials.groupId
      }
      $location.path('/trunking/group/' + trunk.name).search(search)
    }

    function openEnterpriseTrunkGroup(trunk) {
      var search = { groupId: trunk.groupId }
      if (!Session.data('serviceProviderId')) {
        search.serviceProviderId = _credentials.serviceProviderId
      }
      $location.path('/trunking/group/' + trunk.name).search(search)
    }

    function loadTrunks() {
      if (
        vm.isEnterprise &&
        (Session.data('loginType') === 'Service Provider' ||
          Session.data('loginType') === 'Provisioning')
      ) {
        loadEnterpriseTrunks()
      } else {
        loadGroupTrunks()
      }
    }

    function loadGroupTrunks() {
      GroupTrunkService.list(
        _credentials.serviceProviderId,
        _credentials.groupId
      )
        .then(function(trunks) {
          vm.trunks = trunks
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          vm.isLoading = false
        })
    }

    function loadEnterpriseTrunks() {
      EnterpriseTrunkService.availableTrunks(
        _credentials.serviceProviderId,
        _credentials.groupId
      )
        .then(function(trunks) {
          vm.trunks = _.map(trunks, function(trunk) {
            return { groupId: trunk.groupId, name: trunk.trunkGroupName }
          })
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          vm.isLoading = false
        })
    }
  }
})()
