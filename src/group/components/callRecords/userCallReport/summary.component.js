;(function() {
  angular.module('odin.group').component('groupUserCallReportSummaryChart', {
    templateUrl:
      'group/components/callRecords/userCallReport/summary.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      label: '<',
      startTime: '<',
      endTime: '<',
      onClick: '&',
      users: '<'
    }
  })

  function Controller(Alert, UserCallRecordsService, EventEmitter) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open

    function onInit() {
      ctrl.loading = true
      return loadStats()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadStats() {
      return UserCallRecordsService.summary(
        _.map(ctrl.users, 'userId'),
        ctrl.startTime,
        ctrl.endTime
      ).then(function(data) {
        var placed = data.reduce(function(sum, user) {
          return sum + parseInt(user.inboundCalls, 10) || 0
        }, 0)
        var received = data.reduce(function(sum, user) {
          return sum + parseInt(user.outboundCalls, 10) || 0
        }, 0)
        var total = placed + received
        ctrl.labels = ['Placed', 'Received']
        ctrl.data = [placed, received]
        ctrl.stats = { placed: placed, received: received, total: total }
      })
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
})()
