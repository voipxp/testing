import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('serviceSearch', {
  template,
  controller
})

controller.$inject = [
  'Alert',
  'UserServiceSearchService',
  'HashService',
  'Route',
  '$rootScope'
]
function controller(
  Alert,
  UserServiceSearchService,
  HashService,
  Route,
  $rootScope
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$doCheck = doCheck
  ctrl.search = search
  ctrl.onPagination = onPagination
  ctrl.select = select

  ctrl.types = [
    { key: 'dn', name: 'Phone Number' },
    { key: 'extension', name: 'Extension' },
    { key: 'lastName', name: 'Name' },
    { key: 'userId', name: 'User ID' }
  ]

  ctrl.serviceTypes = {
    'Auto Attendant': ['autoAttendants', 'autoAttendant'],
    'Auto Attendant - Standard': ['autoAttendants', 'autoAttendant'],
    'Auto Attendant - Video': ['autoAttendants', 'autoAttendant'],
    'BroadWorks Anywhere Portal': null,
    'Call Center': ['callCenters', 'callCenter'],
    'Call Center - Basic': ['callCenters', 'callCenter'],
    'Call Center - Standard': ['callCenters', 'callCenter'],
    'Call Center - Premium': ['callCenters', 'callCenter'],
    'Collaborate Bridge': ['collaborate', 'bridge'],
    'Find-me/Follow-me': null,
    'Flexible Seating Host': null,
    'Group Paging': ['paging', 'group'],
    'Hunt Group': ['huntGroups', 'huntGroup'],
    'Instant Group Call': null,
    'Instant Conference Bridge': null,
    'Meet-Me Conference Bridge': ['meetMe', 'bridge'],
    'Route Point': null,
    'VoiceXML': null
  }

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
    if (!ctrl.filter) return
    ctrl.isLoading = true
    var params = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    params[ctrl.type] = '*' + ctrl.filter + '*'
    UserServiceSearchService.index(params)
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
    return _.isFunction(ctrl.onSelect) ? ctrl.onSelect(user) : route(user)
  }

  function route(user) {
    var path = ctrl.serviceTypes[user.serviceType]
    if (!path) return
    Route.open(
      'groups',
      user.serviceProviderId,
      user.groupId,
      path[0],
      path[1]
    ).search({ serviceUserId: user.userId })
  }

  $rootScope.$on('serviceSearch:load', function(event, data) {
    ctrl.onSelect = data.onSelect
    ctrl.serviceProviderId = data.serviceProviderId
    ctrl.groupId = data.groupId
    ctrl.filter = null
    ctrl.users = null
    ctrl.type = 'dn'
    Alert.modal.open(ctrl.modalId)
  })
}
