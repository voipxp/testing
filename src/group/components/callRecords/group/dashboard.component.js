;(function() {
  angular.module('odin.group').component('groupCallRecordDashboard', {
    templateUrl: 'group/components/callRecords/group/dashboard.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

  function Controller(Alert, $timeout) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.select = select
    ctrl.search = {}

    ctrl.today = {
      label: 'Today',
      startTime: dayBegin('today'),
      endTime: dayEnd('today')
    }

    ctrl.yesterday = {
      label: 'Yesterday',
      startTime: dayBegin('1 days ago'),
      endTime: dayEnd('1 days ago')
    }

    ctrl.week = {
      label: 'Last 7',
      startTime: dayBegin('6 days ago'),
      endTime: dayEnd('today')
    }

    ctrl.month = {
      label: 'Last 30',
      startTime: dayBegin('29 days ago'),
      endTime: dayEnd('today')
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

    function dayBegin(when) {
      return Sugar.Date.beginningOfDay(Sugar.Date.create(when))
    }

    function dayEnd(when) {
      return Sugar.Date.endOfDay(Sugar.Date.create(when))
    }
  }
})()