;(function() {
  angular.module('odin.user').component('userCallRecordDashboard', {
    templateUrl: 'user/components/callRecords/user/dashboard.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
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
      startTime: DateService.dayBegin('1 days ago'),
      endTime: DateService.dayEnd('1 days ago')
    }

    ctrl.week = {
      label: 'Last 7',
      startTime: DateService.dayBegin('6 days ago'),
      endTime: DateService.dayEnd('today')
    }

    ctrl.month = {
      label: 'Last 30',
      startTime: DateService.dayBegin('29 days ago'),
      endTime: DateService.dayEnd('today')
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
