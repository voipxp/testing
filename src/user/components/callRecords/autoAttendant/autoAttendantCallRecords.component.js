;(function() {
  angular.module('odin.group').component('userAutoAttendantCallRecords', {
    templateUrl:
      'user/components/callRecords/autoAttendant/autoAttendantCallRecords.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    Alert,
    GroupAutoAttendantService,
    UserCallRecordsService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.parseDate = parseDate
    ctrl.search = {}
    ctrl.editSearch = {}
    ctrl.input = {}
    ctrl.openSearch = openSearch
    ctrl.options = UserCallRecordsService.options

    function onInit() {
      ctrl.callRecords = []
    }

}

    function openSearch() {
      ctrl.editSearch = angular.copy(ctrl.search)
      Alert.modal.open('autoAttendantCallRecordsSearch', function(close) {
        loadCallRecords(ctrl.editSearch, close)
      })
    }

    function parseDate(dateType) {
      if (dateType !== 'startTime' && dateType !== 'endTime') return
      if (!ctrl.input[dateType]) {
        ctrl.editSearch[dateType] = null
      } else {
        var params = {}
        var parsedDate = Sugar.Date.create(ctrl.input[dateType], {
          past: true,
          params: params
        })
        if (Sugar.Date.isValid(parsedDate)) {
          if (dateType === 'endTime' && !params.hour) {
            parsedDate = Sugar.Date.endOfDay(parsedDate)
          }
          ctrl.editSearch[dateType] = parsedDate
          // console.log('parsed', ctrl.editSearch[dateType]);
        } else {
          ctrl.editSearch[dateType] = null
        }
      }
    }

    function loadCallRecords(search, callback) {
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
          console.log('callRecords', data)
            callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
