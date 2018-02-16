;(function() {
  angular
    .module('odin.trunkgroup')
    .controller('EnterpriseTrunksController', EnterpriseTrunksController)

  function EnterpriseTrunksController(
    EnterpriseTrunkService,
    $location,
    Session,
    Alert
  ) {
    var vm = this
    var credentials = {}

    // UI Data
    vm.trunks = []
    vm.isLoading = true
    vm.openEnterpriseTrunk = openEnterpriseTrunk

    // Init
    activate()

    function activate() {
      setCredentials()
      loadTrunks()
    }

    function setCredentials() {
      credentials.serviceProviderId = Session.data('serviceProviderId')
      credentials.groupId = Session.data('groupId')
      var _groupId = $location.search().groupId
      var _serviceProviderId = $location.search().serviceProviderId
      if (_groupId) {
        credentials.groupId = _groupId
      }
      if (_serviceProviderId) {
        credentials.serviceProviderId = _serviceProviderId
      }
    }

    function openEnterpriseTrunk(trunk) {
      var search = {}
      if (!Session.data('groupId')) {
        search.groupId = credentials.groupId
      }
      if (!Session.data('serviceProviderId')) {
        search.serviceProviderId = credentials.serviceProviderId
      }
      $location
        .path('/trunking/enterprise/' + trunk.enterpriseTrunk)
        .search(search)
    }

    function loadTrunks() {
      EnterpriseTrunkService.list(
        credentials.serviceProviderId,
        credentials.groupId
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
  }
})()
