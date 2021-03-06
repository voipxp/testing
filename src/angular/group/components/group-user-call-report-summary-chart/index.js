import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupUserCallReportSummaryChart', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    label: '<',
    startTime: '<',
    endTime: '<',
    onClick: '&',
    selectedUsers: '<'
  }
})

controller.$inject = ['Alert', 'UserCallRecordsService', 'EventEmitter']
function controller(Alert, UserCallRecordsService, EventEmitter) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.open = open

  function onInit() {}

  function onChanges(changes) {
    if (changes.loading) return
    if (!ctrl.startTime || !ctrl.endTime || ctrl.selectedUsers.length === 0) {
      return
    }
    if (changes.selectedUsers || changes.startTime || changes.endTime) {
      ctrl.loading = true
      return loadData()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }
  }

  function loadData() {
    return UserCallRecordsService.summary(
      _.map(ctrl.selectedUsers, 'userId'),
      ctrl.startTime,
      ctrl.endTime
    ).then(function(data) {
      ctrl.allData = data
      filterData()
    })
  }

  function filterData() {
    ctrl.data = _.filter(ctrl.allData, function(item) {
      return _.find(ctrl.selectedUsers, { userId: item.userId })
    })
    var placed = ctrl.data.reduce(function(sum, user) {
      return sum + parseInt(user.outboundCalls, 10) || 0
    }, 0)
    var received = ctrl.data.reduce(function(sum, user) {
      return sum + parseInt(user.inboundCalls, 10) || 0
    }, 0)
    var total = placed + received
    ctrl.labels = ['Placed', 'Received']
    ctrl.data = [placed, received]
    ctrl.stats = { placed: placed, received: received, total: total }
  }

  function open() {
    ctrl.onClick(
      EventEmitter({
        startTime: ctrl.startTime,
        endTime: ctrl.endTime
      })
    )
  }
}
