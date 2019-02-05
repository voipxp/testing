;(function() {
  angular.module('odin.group').component('groupUserCallReportDetailChart', {
    templateUrl:
      'group/components/callRecords/userCallReport/detail.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      startTime: '<',
      endTime: '<',
      onClick: '&',
      selectedUsers: '<'
    }
  })

  function Controller(Alert, UserCallRecordsService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges

    function onInit() {}

    function onChanges(changes) {
      if (changes.loading) return
      if (!ctrl.startTime || !ctrl.endTime || !ctrl.selectedUsers.length) return
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
      var data = _.filter(ctrl.allData, function(item) {
        return _.find(ctrl.selectedUsers, { userId: item.userId })
      }).map(function(item) {
        var user = _.find(ctrl.selectedUsers, { userId: item.userId })
        if (!user) {
          item.lastName = item.userId
        } else {
          item.lastName = user.lastName
          item.firstName = user.firstName
        }
        return item
      })
      ctrl.options = { legend: { display: true, position: 'bottom' } }
      ctrl.labels = data.map(function(user) {
        return [user.firstName, user.lastName].join(' ')
      })
      ctrl.series = ['Placed', 'Received']
      ctrl.data = [_.map(data, 'outboundCalls'), _.map(data, 'inboundCalls')]
    }
  }
})()
