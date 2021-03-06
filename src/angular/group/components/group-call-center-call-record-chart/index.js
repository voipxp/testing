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

angular.module('odin.group').component('groupCallCenterCallRecordChart', {
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
    return GroupCallRecordsService.related(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.startTime,
      ctrl.endTime,
      'Call Center'
    ).then(function(data) {
      ctrl.options = { legend: { display: true, position: 'right' } }
      ctrl.stats = {
        total: data.length,
        answered: _.filter(data, { answerIndicator: 'Yes' }).length,
        missed: _.filter(data, { answerIndicator: 'No' }).length
      }
      ctrl.colors = ['#97BBCD', '#DCDCDC']
      ctrl.labels = [
        generateLabel('Answered', ctrl.stats.answered, ctrl.stats.total),
        generateLabel('Missed', ctrl.stats.missed, ctrl.stats.total)
      ]
      ctrl.data = [ctrl.stats.answered, ctrl.stats.missed]
    })
  }

  function generateLabel(label, value, total) {
    var percent = value ? Math.round((value / total) * 100) : 0
    return `${label} (${percent}%)`
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
