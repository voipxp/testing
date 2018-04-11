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

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.modalId = HashService.guid()
      Session.load().then(function() {
        ctrl.isProvisioning = ACL.has('Provisioning')
      })
    }

    function doCheck() {
      if (!ctrl.filter) {
        ctrl.users = null
      }
    }

    function search() {
      ctrl.isLoading = true
      var params = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId
      }
      params[ctrl.type] = ctrl.filter
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
      console.log('selected', user)
      Alert.notify.warning('NOT IMPLEMENTED YET')
      // if (_.isFunction(ctrl.onSelect)) {
      //   return ctrl.onSelect(user)
      // }
      // Route.open('users')(user.serviceProviderId, user.groupId, user.userId)
    }

    $rootScope.$on('serviceSearch:load', function(event, data) {
      ctrl.onSelect = data.onSelect
      ctrl.serviceProviderId = data.serviceProviderId
      ctrl.groupId = data.groupId
      ctrl.filter = null
      ctrl.users = null
      ctrl.type = 'lastName'
      Alert.modal.open(ctrl.modalId)
    })
  }
})()
