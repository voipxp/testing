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
      allUsers: '<',
      selectedUsers: '<'
    }
  })

  function Controller(Alert, UserCallRecordsService, EventEmitter) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.open = open

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
        console.log('filterData')
        filterData()
      }
      if (changes.startTime || changes.endTime) {
        console.log('loadData')
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
})()
