;(function() {
  angular.module('odin.user').component('userAutoAttendantCallRecords', {
    templateUrl:
      'user/components/callRecords/autoAttendant/autoAttendantCallRecords.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserCallRecordsService, DateService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserCallRecordsService.options

    ctrl.default = {
      label: 'Today',
      startTime: DateService.dayBegin('today'),
      endTime: DateService.dayEnd('today'),
      reportType: 'Hourly'
    }

    function onInit() {
      ctrl.search = angular.copy(ctrl.default)
      loadCallRecords(ctrl.search)
    }

    function edit() {
      ctrl.editSearch = angular.copy(ctrl.search)
      Alert.modal.open('autoAttendantCallRecordsSearch', function(close) {
        ctrl.editSearch.label = [
          Sugar.Date.format(ctrl.editSearch.startTime, '{long}'),
          Sugar.Date.format(ctrl.editSearch.endTime, '{long}')
        ].join(' - ')
        loadCallRecords(ctrl.editSearch, close)
      })
    }

    function loadCallRecords(search, callback) {
      ctrl.loading = true
      return UserCallRecordsService.get(
        ctrl.userId,
        search.startTime,
        search.endTime,
        search.reportType
      )
        .then(function(data) {
          // reset parameters to pass through to components
          ctrl.search = angular.copy(search)
          ctrl.callRecords = data
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }
  }
})()
