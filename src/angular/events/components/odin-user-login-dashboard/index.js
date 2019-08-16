import angular from 'angular'
import Sugar from 'sugar-date'
import template from './index.html'

angular.module('odin.events').component('odinUserLoginDashboard', {
  template,
  controller
})

controller.$inject = ['Alert', '$timeout']
function controller(Alert, $timeout) {
  var ctrl = this
  ctrl.searchDate = searchDate
  ctrl.resetDate = resetDate
  ctrl.selectDate = selectDate

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

  function searchDate() {
    ctrl.editSearch = angular.copy(ctrl.search)
    Alert.modal.open('odinUserLoginSearchModal', function(close) {
      selectDate(ctrl.editSearch) && close()
    })
  }

  function resetDate() {
    ctrl.search = {}
  }

  function selectDate(search) {
    if (!Sugar.Date.isValid(search.startTime) || !Sugar.Date.isValid(search.endTime)) {
      Alert.notify.warning('Start or End Time is Invalid')
      return false
    }
    ctrl.search = {}
    $timeout(function() {
      ctrl.search = {
        startTime: Sugar.Date.create(search.startTime),
        endTime: Sugar.Date.create(search.endTime),
        label: [
          Sugar.Date.format(search.startTime, '{short} {time}'),
          Sugar.Date.format(search.endTime, '{short} {time}')
        ].join(' - ')
      }
    }, 1)
    return true
  }
}
