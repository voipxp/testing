;(function() {
  angular.module('odin.group').component('groupCallCenterCallRecordDashboard', {
    templateUrl:
      'group/components/callRecords/callCenter/dashboard.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

  function Controller(Alert, $timeout, DateService) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.select = select
    ctrl.search = {}

    ctrl.today = {
      label: 'Today',
      startTime: DateService.dayBegin('today'),
      endTime: DateService.dayEnd('today')
    }

    ctrl.yesterday = {
      label: 'Yesterday',
      startTime: DateService.dayBegin('yesterday'),
      endTime: DateService.dayEnd('yesterday')
    }

    ctrl.week = {
      label: 'This Week',
      startTime: DateService.dayBegin('beginning of this week'),
      endTime: DateService.dayEnd('end of this week')
    }

    ctrl.month = {
      label: 'Last Week',
      startTime: DateService.dayBegin('beginning of last week'),
      endTime: DateService.dayEnd('end of last week')
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
