;(function() {
  angular.module('odin.group').component('groupCallRecordDashboard', {
    templateUrl:
      'group/components/callRecords/group/groupCallRecordDashboard.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, $scope) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.search = search

    ctrl.today = {
      label: 'Today',
      start: dayBegin('today'),
      end: dayEnd('today')
    }

    ctrl.yesterday = {
      label: 'Yesterday',
      start: dayBegin('1 days ago'),
      end: dayEnd('1 days ago')
    }

    ctrl.week = {
      label: 'Last 7',
      start: dayBegin('6 days ago'),
      end: dayEnd('today')
    }

    ctrl.month = {
      label: 'Last 30',
      start: dayBegin('29 days ago'),
      end: dayEnd('today')
    }

    function search() {
      $scope.$broadcast('groupCallRecordSearchModal:load')
    }

    function dayBegin(when) {
      return Sugar.Date.beginningOfDay(Sugar.Date.create(when))
    }

    function dayEnd(when) {
      return Sugar.Date.endOfDay(Sugar.Date.create(when))
    }
  }
})()
