;(function() {
  angular.module('odin.common').component('serviceSearch', {
    templateUrl: 'common/components/serviceSearch/search.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    UserServiceSearchService,
    HashService,
    Route,
    $rootScope,
    ACL,
    Session
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$doCheck = doCheck
    ctrl.search = search
    ctrl.onPagination = onPagination
    ctrl.select = select

    ctrl.types = [
      { key: 'userId', name: 'User ID' },
      { key: 'lastName', name: 'Name' },
      { key: 'dn', name: 'Phone Number' },
      { key: 'extension', name: 'Extension' }
    ]

    ctrl.serviceTypes = [
      { name: 'Auto Attendant', path: 'autoAttendants' },
      { name: 'Call Center', path: 'callCenters' },
      { name: 'Collaborate Bridge', path: 'collaborate' },
      { name: 'Group Paging', path: 'paging' },
      { name: 'Hunt Group', path: 'huntGroups' },
      { name: 'Meet-Me Conference Bridge', path: 'meetMe' }
    ]

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.modalId = HashService.guid()
      Session.load().then(function() {
        ctrl.isProvisioning = ACL.has('Provisioning')
        if (!ACL.hasVersion('20')) {
          _.remove(ctrl.serviceTypes, { name: 'Collaborate Bridge' })
        }
      })
    }

    function doCheck() {
      if (!ctrl.filter) {
        ctrl.users = null
      }
    }

    function search() {
      if (!ctrl.filter) return
      ctrl.isLoading = true
      var params = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId
      }
      params[ctrl.type] = ctrl.filter
      params.serviceType = ctrl.serviceType
      UserServiceSearchService.index(params)
        .then(function(data) {
          console.log('data', data)
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
      var url = Route.open('groups', user.serviceProviderId, user.groupId)
      var service = _.find(ctrl.serviceTypes, function(type) {
        var regexp = new RegExp(type.name)
        return regexp.test(user.serviceType)
      })
      if (!service) {
        Alert.notify.danger('Service Type unknown: ' + user.serviceType)
      } else {
        url(service.path, user.userId)
      }
    }

    $rootScope.$on('serviceSearch:load', function(event, data) {
      ctrl.onSelect = data.onSelect
      ctrl.serviceProviderId = data.serviceProviderId
      ctrl.groupId = data.groupId
      ctrl.filter = null
      ctrl.users = null
      ctrl.serviceType = ctrl.serviceTypes[0].name
      ctrl.type = 'lastName'
      Alert.modal.open(ctrl.modalId)
    })
  }
})()
