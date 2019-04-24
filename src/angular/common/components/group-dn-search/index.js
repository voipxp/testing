import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('groupDnSearch', {
  template,
  controller
})

controller.$inject = [
  'Alert',
  'SystemDnSearchService',
  'HashService',
  'Route',
  '$rootScope',
  'ACL',
  'NumberService',
  '$scope'
]
function controller(
  Alert,
  SystemDnSearchService,
  HashService,
  Route,
  $rootScope,
  ACL,
  NumberService,
  $scope
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$doCheck = doCheck
  ctrl.search = search
  ctrl.onPagination = onPagination
  ctrl.select = select
  ctrl.selectServiceProvider = selectServiceProvider
  ctrl.onSelectServiceProvider = onSelectServiceProvider

  ctrl.types = [{ key: 'dn', name: 'Phone Number' }]

  ctrl.userTypes = {
    'Normal': 'users',
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
    var params = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    params[ctrl.type] =
      ctrl.type === 'dn' ? ctrl.filter : '*' + ctrl.filter + '*'
    if (!ctrl.serviceProviderId && !params.dn) {
      Alert.notify.warning(
        'You must select a Service Provider for non Phone Number searches'
      )
      return
    }
    ctrl.users = null
    ctrl.isLoading = true
    SystemDnSearchService.index(params)
      .then(function(data) {
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
    var path = ctrl.userTypes[user.userType]
    if (!path) return
    if (path === 'users') {
      Route.open('users', user.serviceProviderId, user.groupId, user.userId)
    } else if (path === 'autoAttendants') {
      Route.open(
        'groups',
        user.serviceProviderId,
        user.groupId,
        path,
        'autoAttendant'
      ).search({ serviceUserId: user.userId })
    } else {
      Route.open(
        'groups',
        user.serviceProviderId,
        user.groupId,
        path,
        user.userId
      )
    }
  }

  $rootScope.$on('groupDnSearch:load', function(event, data) {
    ctrl.onSelect = data.onSelect
    ctrl.serviceProviderId = data.serviceProviderId
    ctrl.groupId = data.groupId
    ctrl.filter = null
    ctrl.users = null
    ctrl.type = 'dn'
    Alert.modal.open(ctrl.modalId)
  })
}
