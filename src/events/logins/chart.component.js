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
      if (changes.loading || !ctrl.data) return
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
      ctrl.total = ctrl.data.length || 0
      var logins = {
        System: 0,
        Provisioning: 0,
        'Service Provider': 0,
        Group: 0,
        User: 0,
        Other: 0
      }
      ctrl.data.forEach(item => {
        var loginType = Object.keys(logins).includes(item.loginType)
          ? item.loginType
          : 'Other'
        logins[loginType]++
      })
      ctrl.labels = Object.keys(logins).map(label =>
        generateLabel(label, logins[label], ctrl.total)
      )
      ctrl.options = { legend: { display: true, position: 'right' } }
      ctrl.loginData = Object.values(logins)
    }

    function generateLabel(label, value = 0, total) {
      var percent = value ? Math.round((value / total) * 100) : 0
      return `${label} (${percent}%)`
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
