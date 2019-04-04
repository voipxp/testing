/**
  answeredTotal
  busyTotal
  missedTotal
  placedAnswered
  placedMissed
  placedTotal
  receivedAnswered
  receivedMissed
  receivedTotal
  redirectTotal
  total
  totalAnsweredAndMissed
**/

import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallRecordChart', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    label: '<',
    startTime: '<',
    endTime: '<',
    onClick: '&'
  }
})

controller.$inject = ['Alert', 'GroupCallRecordsService', 'EventEmitter']
function controller(Alert, GroupCallRecordsService, EventEmitter) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open

  function onInit() {
    ctrl.loading = true
    return loadStats()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadStats() {
    return GroupCallRecordsService.stats(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.startTime,
      ctrl.endTime
    ).then(function(data) {
      ctrl.options = { legend: { display: true, position: 'right' } }
      ctrl.stats = _.get(data, 'total')
        ? data
        : {
            placedAnswered: 0,
            placedMissed: 0,
            placedTotal: 0,
            receivedAnswered: 0,
            receivedMissed: 0,
            receivedTotal: 0,
            total: 0
          }
      ctrl.colors = ['#97BBCD', '#DCDCDC', '#46BFBD', '#949FB1']
      ctrl.labels = [
        generateLabel(
          'Placed Answered',
          ctrl.stats.placedAnswered,
          ctrl.stats.placedTotal
        ),
        generateLabel(
          'Placed Missed',
          ctrl.stats.placedMissed,
          ctrl.stats.placedTotal
        ),
        generateLabel(
          'Received Answered',
          ctrl.stats.receivedAnswered,
          ctrl.stats.receivedTotal
        ),
        generateLabel(
          'Received Missed',
          ctrl.stats.receivedMissed,
          ctrl.stats.receivedTotal
        )
      ]
      ctrl.data = [
        ctrl.stats.placedAnswered,
        ctrl.stats.placedMissed,
        ctrl.stats.receivedAnswered,
        ctrl.stats.receivedMissed
      ]
    })
  }

  function generateLabel(label, value, total) {
    var percent = value ? Math.round((value / total) * 100) : 0
    return label + ' (' + percent + '%' + ')'
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
