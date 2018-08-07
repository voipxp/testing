;(function() {
  angular.module('odin.user').component('userCallCenterCallRecordDashboard', {
    templateUrl:
      'user/components/callRecords/callCenter/dashboard.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, $timeout) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.select = select
    ctrl.search = {}

    ctrl.today = {
      label: 'Today',
      startTime: Sugar.Date.create('beginning of today'),
      endTime: Sugar.Date.create('end of today')
    }

    ctrl.yesterday = {
      label: 'Yesterday',
      startTime: Sugar.Date.create('beginning of yesterday'),
      endTime: Sugar.Date.create('end of yesterday')
    }

    ctrl.thisWeek = {
      label: 'This Week',
      startTime: Sugar.Date.beginningOfISOWeek(Sugar.Date.create('this week')),
      endTime: Sugar.Date.endOfISOWeek(Sugar.Date.create('this week'))
    }

    ctrl.lastWeek = {
      label: 'Last Week',
      startTime: Sugar.Date.beginningOfISOWeek(Sugar.Date.create('last week')),
      endTime: Sugar.Date.endOfISOWeek(Sugar.Date.create('last week'))
    }

    function edit() {
      ctrl.editSearch = angular.copy(ctrl.search)
      Alert.modal.open('callRecordSearchModal', function(close) {
        select(ctrl.editSearch) && close()
      })
    }

    function select(search) {
      if (
        !Sugar.Date.isValid(search.startTime) ||
        !Sugar.Date.isValid(search.endTime)
      ) {
        Alert.notify.warning('Start or End Time is Invalid')
        return false
      }
      ctrl.search = {}
      $timeout(function() {
        ctrl.search = {
          startTime: Sugar.Date.create(search.startTime),
          endTime: Sugar.Date.create(search.endTime),
          label: [
            Sugar.Date.format(search.startTime, '{long}'),
            Sugar.Date.format(search.endTime, '{long}')
          ].join(' - ')
        }
      }, 1)
      return true
    }
  }
})()
