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
      allUsers: '<',
      selectedUsers: '<'
    }
  })

  function Controller(Alert, UserCallRecordsService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges

    function onInit() {
      ctrl.loading = true
      return loadData()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onChanges(changes) {
      if (changes.loading || !ctrl.allData) return
      if (changes.allUsers || changes.selectedUsers) {
        filterData()
      }
      if (changes.startTime || changes.endTime) {
        loadData()
      }
    }

    function loadData() {
      return UserCallRecordsService.summary(
        _.map(ctrl.allUsers, 'userId'),
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
