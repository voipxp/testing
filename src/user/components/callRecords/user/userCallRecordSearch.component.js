;(function() {
  angular.module('odin.user').component('userCallRecordSearch', {
    templateUrl:
      'user/components/callRecords/user/userCallRecordSearch.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, $scope, UserCallRecordsService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.edit = edit
    ctrl.back = back

    function onInit() {
      var startTime = Sugar.Date.create($routeParams.startTime)
      var endTime = Sugar.Date.create($routeParams.endTime)
      if (!Sugar.Date.isValid(startTime) || !Sugar.Date.isValid(endTime)) {
        Alert.notify.success('Start or End Time is Invalid')
        edit()
      } else {
        ctrl.search = {
          start: Sugar.Date.create($routeParams.startTime),
          end: Sugar.Date.create($routeParams.endTime)
        }
        ctrl.search.label = label(ctrl.search.start, ctrl.search.end)
      }
    }

    function label(start, end) {
      if (!start || !end) return
      return (
        Sugar.Date.format(start, '{long}') +
        ' - ' +
        Sugar.Date.format(end, '{long}')
      )
    }

    function edit() {
      $scope.$broadcast('userCallRecordSearchModal:load')
    }

    function back() {
      UserCallRecordsService.open(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.userId
      )
    }
  }
})()
