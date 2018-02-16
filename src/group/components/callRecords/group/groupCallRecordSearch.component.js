;(function() {
  angular.module('odin.group').component('groupCallRecordSearch', {
    templateUrl:
      'group/components/callRecords/group/groupCallRecordSearch.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, $scope, GroupCallRecordsService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.edit = edit
    ctrl.back = back
    ctrl.newSearch = search

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
      $scope.$broadcast('groupCallRecordSearchModal:load')
    }

    function search() {
      $scope.$broadcast('groupCallRecordSearchModal:load')
    }

    function back() {
      GroupCallRecordsService.open(ctrl.serviceProviderId, ctrl.groupId)
    }
  }
})()
