;(function() {
  angular.module('odin.common').component('userSearch', {
    templateUrl: 'common/components/userSearch/search.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    UserSearchService,
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
      if (ctrl.type === 'macAddress' && /\*/.test(ctrl.filter)) {
        Alert.notify.warning('MAC search cannot contain wildcards')
        return
      }
      ctrl.isLoading = true
      var params = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId
      }
      params[ctrl.type] = ctrl.filter
      console.log('userSearch', params)
      UserSearchService.index(params)
        .then(function(data) {
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
      if (_.isFunction(ctrl.onSelect)) {
        ctrl.onSelect(user)
      } else {
        Route.open('users')(user.serviceProviderId, user.groupId, user.userId)
      }
    }

    $rootScope.$on('userSearch:load', function(event, data) {
      ctrl.onSelect = data.onSelect
      ctrl.serviceProviderId = data.serviceProviderId
      ctrl.groupId = data.groupId
      ctrl.filter = null
      ctrl.users = null
      ctrl.type = 'dn'
      Alert.modal.open(ctrl.modalId)
    })
  }
})()
