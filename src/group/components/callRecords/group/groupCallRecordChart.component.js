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

;(function() {
  angular.module('odin.group').component('groupCallRecordChart', {
    templateUrl:
      'group/components/callRecords/group/groupCallRecordChart.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      label: '<',
      startTime: '<',
      endTime: '<'
    }
  })

  function Controller(Alert, GroupCallRecordsService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open

    function onInit() {
      ctrl.loading = true
      return loadStats()
        .catch(function(error) {
          console.log(error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadStats() {
      return GroupCallRecordsService.get(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.startTime,
        ctrl.endTime,
        'stats'
      ).then(function(data) {
        ctrl.options = { legend: { display: true, position: 'right' } }
        ctrl.stats = data || {
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
      var percent = value ? Math.round(value / total * 100) : 0
      return label + ' (' + percent + '%' + ')'
    }

    function open() {
      GroupCallRecordsService.open(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.startTime.toISOString(),
        ctrl.endTime.toISOString()
      )
    }
  }
})()
