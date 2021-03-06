import angular from 'angular'
import Papa from 'papaparse'
import template from './index.html'

angular.module('odin.events').component('odinUserLoginData', {
  template,
  controller,
  bindings: {
    startTime: '<',
    endTime: '<',
    label: '<'
  }
})

controller.$inject = ['Alert', 'EventService', 'DownloadService']
function controller(Alert, EventService, DownloadService) {
  var ctrl = this

  ctrl.$onInit = loadData
  ctrl.$onChanges = onChanges
  ctrl.download = download

  ctrl.columns = [
    {
      key: 'userId',
      label: 'User ID'
    },
    {
      key: 'loginType',
      label: 'Login Type'
    },
    {
      key: 'serviceProviderId',
      label: 'Service Provider ID'
    },
    {
      key: 'groupId',
      label: 'Group ID'
    },
    {
      key: 'isEnterprise',
      label: 'Enterprise',
      type: 'boolean',
      align: 'centered'
    }
  ]

  function onChanges(changes) {
    if (changes.loading || !ctrl.data) return
    if (changes.startTime || changes.endTime) loadData()
  }

  function loadData() {
    ctrl.loading = true
    return EventService.logins(ctrl.startTime, ctrl.endTime)
      .then(data => (ctrl.data = data))
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loading = false))
  }

  function download() {
    return sendFile(ctrl.data)
  }

  function sendFile(data) {
    var filename = ['odin', 'logins', ctrl.label].join('_')
    filename = filename + '.csv'
    var options = { delimiter: ',', newline: '\r\n', quotes: true }
    var csv = Papa.unparse(data, options)
    DownloadService.download(csv, filename)
  }
}
