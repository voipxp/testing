import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('userSearch', {
  template,
  controller
})

controller.$inject = ['Alert', 'UserSearchService', 'HashService', 'Route', '$rootScope']
function controller(Alert, UserSearchService, HashService, Route, $rootScope) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$doCheck = doCheck
  ctrl.search = search
  ctrl.onPagination = onPagination
  ctrl.select = select

  ctrl.types = [
    { key: 'dn', name: 'Phone Number' },
    { key: 'extension', name: 'Extension' },
    { key: 'lastName', name: 'Last Name' },
    { key: 'firstName', name: 'First Name' },
    { key: 'emailAddress', name: 'Email Address' },
    { key: 'userId', name: 'User ID' },
    { key: 'macAddress', name: 'MAC Address' }
  ]

  function onPagination(event) {
    ctrl.pager = event.pager
  }

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function doCheck() {
    if (!ctrl.filter) {
      ctrl.users = null
    }
  }

  function search() {
    if (ctrl.type === 'macAddress' && /\*/.test(ctrl.filter)) {
      ctrl.filter = ctrl.filter.replace(/\*/g, '')
    }
    ctrl.isLoading = true
    var params = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    params[ctrl.type] = ctrl.type === 'macAddress' ? ctrl.filter : '*' + ctrl.filter + '*'
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
      Route.open('users', user.serviceProviderId, user.groupId, user.userId)
    }
  }

  $rootScope.$on('userSearch:load', function(event, data) {
    ctrl.onSelect = data.onSelect
    ctrl.serviceProviderId = data.serviceProviderId
    ctrl.groupId = data.groupId
    ctrl.filter = null
    ctrl.users = null
    ctrl.type = 'lastName'
    Alert.modal.open(ctrl.modalId)
  })
}
