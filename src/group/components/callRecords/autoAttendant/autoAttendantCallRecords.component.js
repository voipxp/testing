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
    UserCallRecordsService,
    DateService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.search = {}
    ctrl.editSearch = {}
    ctrl.input = {}
    ctrl.openSearch = openSearch
    ctrl.options = UserCallRecordsService.options

    ctrl.search = {
      startTime: DateService.dayBegin('today'),
      endTime: DateService.dayEnd('today'),
      reportType: 'Hourly'
    }

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
        return data
      })
    }

    function openSearch() {
      ctrl.editSearch = angular.copy(ctrl.search)
      Alert.modal.open('autoAttendantCallRecordsSearch', function(close) {
        loadCallRecords(ctrl.editSearch, close)
      })
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
