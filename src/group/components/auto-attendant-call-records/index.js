import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('autoAttendantCallRecords', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  '$routeParams',
  'Alert',
  'GroupAutoAttendantService',
  'UserCallRecordsService'
]
function controller(
  $routeParams,
  Alert,
  GroupAutoAttendantService,
  UserCallRecordsService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.search = {}
  ctrl.editSearch = {}
  ctrl.input = {}
  ctrl.openSearch = openSearch
  ctrl.options = UserCallRecordsService.options

  ctrl.search = {
    startTime: null,
    endTime: null,
    reportType: 'Hourly'
  }

  function onInit() {
    ctrl.callRecords = []
    Alert.spinner.open()
    loadAutoAttendants()
      .then(function() {
        openSearch()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function loadAutoAttendants() {
    return GroupAutoAttendantService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.autoAttendants = data
      ctrl.search.serviceUserId = data[0] && data[0].serviceUserId
      return data
    })
  }

  function openSearch() {
    ctrl.editSearch = angular.copy(ctrl.search)
    Alert.modal.open('autoAttendantCallRecordsSearch', function(close) {
      loadCallRecords(ctrl.editSearch, close)
    })
  }

  function loadCallRecords(search, callback) {
    Alert.spinner.open()
    return UserCallRecordsService.get(
      search.serviceUserId,
      search.startTime,
      search.endTime,
      search.reportType
    )
      .then(function(data) {
        // reset parameters to pass through to components
        ctrl.search = angular.copy(search)
        ctrl.callRecords = data
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}