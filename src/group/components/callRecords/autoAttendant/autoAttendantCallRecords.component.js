;(function() {
  angular.module('odin.group').component('autoAttendantCallRecords', {
    templateUrl:
      'group/components/callRecords/autoAttendant/autoAttendantCallRecords.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Route,
    Alert,
    GroupAutoAttendantService,
    UserCallRecordsService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.parseDate = parseDate
    ctrl.search = {}
    ctrl.editSearch = {}
    ctrl.input = {}
    ctrl.openSearch = openSearch
    ctrl.options = UserCallRecordsService.options

    function onInit() {
      ctrl.callRecords = []
      Alert.spinner.open()
      loadAutoAttendants()
        .then(function() {
          openSearch()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadAutoAttendants() {
      return GroupAutoAttendantService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.autoAttendants = data
        ctrl.search.serviceUserId = data[0] && data[0].serviceUserId
        console.log('attendants', data)
        return data
      })
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
      Alert.spinner.open()
      return UserCallRecordsService.get(
        search.serviceUserId,
        search.startTime,
        search.endTime,
        search.reportType
      )
        .then(function(data) {
          // reset parameters to pass through to components
          ctrl.search = angular.copy(search)
          ctrl.callRecords = data
          console.log('callRecords', data)
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
