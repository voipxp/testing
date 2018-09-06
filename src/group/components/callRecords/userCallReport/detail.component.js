;(function() {
  angular.module('odin.group').component('groupUserCallReportDetailChart', {
    templateUrl:
      'group/components/callRecords/userCallReport/detail.component.html',
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

  function Controller(Alert, UserCallRecordsService) {
    var ctrl = this
    ctrl.$onInit = onInit

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
        ctrl.data = data.map(function(item) {
          var user = _.find(ctrl.users, { userId: item.userId })
          if (!user) {
            item.lastName = item.userId
          } else {
            item.lastName = user.lastName
            item.firstName = user.firstName
          }
          return item
        })
        ctrl.options = { legend: { display: true, position: 'bottom' } }
        ctrl.labels = ctrl.data.map(function(user) {
          return [user.firstName, user.lastName].join(' ')
        })
        ctrl.series = ['Placed', 'Received']
        ctrl.data = [
          _.map(ctrl.data, 'outboundCalls'),
          _.map(ctrl.data, 'inboundCalls')
        ]
      })
    }
  }
})()
