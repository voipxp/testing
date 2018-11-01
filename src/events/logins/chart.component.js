;(function() {
  angular.module('odin.events').component('odinUserLoginChart', {
    templateUrl: 'events/logins/chart.component.html',
    controller: Controller,
    bindings: {
      startTime: '<',
      endTime: '<',
      label: '<',
      onClick: '&'
    }
  })

  function Controller(Alert, EventService, EventEmitter) {
    var ctrl = this
    ctrl.$onInit = loadData
    ctrl.$onChanges = onChanges
    ctrl.open = open

    function onChanges(changes) {
      if (changes.startTime || changes.endTime) loadData()
    }

    function loadData() {
      ctrl.loading = true
      return EventService.logins(ctrl.startTime, ctrl.endTime)
        .then(data => (ctrl.data = data))
        .then(() => filterData())
        .catch(Alert.notify.danger)
        .finally(() => (ctrl.loading = false))
    }

    function filterData() {
      var logins = {
        System: 0,
        Provisioning: 0,
        'Service Provider': 0,
        Group: 0,
        User: 0
      }
      ctrl.data.forEach(item => {
        logins[item.loginType]++
      })
      ctrl.labels = Object.keys(logins)
      ctrl.loginData = Object.values(logins)
    }

    function open() {
      ctrl.onClick(
        EventEmitter({
          startTime: ctrl.startTime,
          endTime: ctrl.endTime
        })
      )
    }
  }
})()
