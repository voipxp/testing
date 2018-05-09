;(function() {
  angular.module('odin.common').component('groupDnSearch', {
    templateUrl: 'common/components/groupDnSearch/search.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    GroupDnSearchService,
    HashService,
    Route,
    $rootScope,
    ACL,
    Session,
    NumberService,
    $scope,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$doCheck = doCheck
    ctrl.search = search
    ctrl.onPagination = onPagination
    ctrl.select = select
    ctrl.selectServiceProvider = selectServiceProvider
    ctrl.onSelectServiceProvider = onSelectServiceProvider

    ctrl.types = [
      { key: 'dn', name: 'Phone Number' },
      { key: 'extension', name: 'Extension' },
      { key: 'lastName', name: 'Last Name' },
      { key: 'firstName', name: 'First Name' },
      { key: 'userId', name: 'User ID' }
    ]

    ctrl.userTypes = {
      Normal: 'users',
      'Auto Attendant': 'autoAttendants',
      'BroadWorks Anywhere': null,
      'Call Center': 'callCenters',
      'Collaborate Bridge': 'collaborate',
      'Find-me/Follow-me': null,
      'Flexible Seating Host': null,
      'Group Paging': 'paging',
      'Hunt Group': 'huntGroups',
      'Instant Group Call': null,
      'Meet-Me Conferencing': 'meetMe',
      'Music On Hold': null,
      'Route Point': null,
      'Voice Messaging': null
    }

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.modalId = HashService.guid()
      ctrl.isProvisioning = ACL.has('Provisioning')
    }

    function doCheck() {
      if (!ctrl.filter) {
        ctrl.users = null
      }
    }

    function selectServiceProvider() {
      $scope.$broadcast('selectServiceProvider:load')
    }

    function onSelectServiceProvider(event) {
      ctrl.serviceProviderId = event.serviceProviderId
    }

    function search() {
      ctrl.isLoading = true
      var params = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId
      }
      params[ctrl.type] = ctrl.filter
      console.log('groupDnSearch', params)
      ctrl.users = null
      GroupDnSearchService.index(params)
        .then(function(data) {
          console.log('DATA', data)
          data.forEach(function(user) {
            user.dns = _.map(NumberService.expand(user.dns), 'min')
          })
          ctrl.users = data
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.isLoading = false
        })
    }

    function select(user) {
      Alert.modal.close(ctrl.modalId)
      ctrl.filter = null
      ctrl.users = null
      return _.isFunction(ctrl.onSelect) ? ctrl.onSelect(user) : route(user)
    }

    function route(user) {
      console.log('route', user)
      if (user.userType === 'Normal') {
        Route.open('users')(user.serviceProviderId, user.groupId, user.userId)
      } else {
        var url = Route.open('groups')
        var path = ctrl.userTypes[user.userType]
        path && url(user.serviceProviderId, user.groupId, path, user.userId)
      }
    }

    $rootScope.$on('groupDnSearch:load', function(event, data) {
      ctrl.onSelect = data.onSelect
      ctrl.serviceProviderId =
        data.serviceProviderId || $routeParams.serviceProviderId
      ctrl.groupId = data.groupId
      ctrl.filter = null
      ctrl.users = null
      ctrl.type = 'dn'
      Alert.modal.open(ctrl.modalId)
    })
  }
})()
