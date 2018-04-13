;(function() {
  angular.module('odin.user').component('userCallRecordDashboard', {
    templateUrl:
      'user/components/callRecords/user/userCallRecordDashboard.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller($scope, Module) {
    var ctrl = this
    ctrl.$onInit = onInit
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

    function onInit() {
      return Module.show('Premium Call Records').then(function(data) {
        ctrl.module = data
        console.log('module', data)
      })
    }

    function search() {
      $scope.$broadcast('userCallRecordSearchModal:load')
    }

    function dayBegin(when) {
      return Sugar.Date.beginningOfDay(Sugar.Date.create(when))
    }

    function dayEnd(when) {
      return Sugar.Date.endOfDay(Sugar.Date.create(when))
    }
  }
})()
