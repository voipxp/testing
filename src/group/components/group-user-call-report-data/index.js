import angular from 'angular'
import _ from 'lodash'
import Papa from 'papaparse'
import template from './index.html'

angular.module('odin.group').component('groupUserCallReportData', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    startTime: '<',
    endTime: '<',
    label: '<',
    selectedUsers: '<'
  }
})

controller.$inject = ['Alert', 'UserCallRecordsService', 'DownloadService']
function controller(Alert, UserCallRecordsService, DownloadService) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.download = download
  ctrl.onSelectUser = onSelectUser

  ctrl.columns = [
    {
      key: 'lastName',
      label: 'Last Name'
    },
    {
      key: 'firstName',
      label: 'First Name'
    },
    {
      key: 'inboundCalls',
      label: 'Inbound Calls'
    },
    {
      key: 'inboundTime',
      label: 'Inbound Time'
    },
    {
      key: 'outboundCalls',
      label: 'Outbound Calls'
    },
    {
      key: 'outboundTime',
      label: 'Outbound Time'
    },
    {
      key: 'totalCalls',
      label: 'Total Calls'
    },
    {
      key: 'totalTime',
      label: 'Total Time'
    }
  ]

  function onInit() {}

  function onChanges(changes) {
    if (changes.loading) return
    if (!ctrl.startTime || !ctrl.endTime || ctrl.selectedUsers.length === 0) {
      return
    }
    if (changes.selectedUsers || changes.startTime || changes.endTime) {
      ctrl.loading = true
      loadData()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }
  }

  function loadData() {
    return UserCallRecordsService.summary(
      _.map(ctrl.selectedUsers, 'userId'),
      ctrl.startTime,
      ctrl.endTime
    ).then(function(data) {
      ctrl.allData = data
      filterData()
    })
  }

  function filterData() {
    var data = _.filter(ctrl.allData, function(item) {
      return _.find(ctrl.selectedUsers, { userId: item.userId })
    })
    ctrl.records = data.map(function(item) {
      var user = _.find(ctrl.selectedUsers, { userId: item.userId })
      if (!user) {
        item.lastName = item.userId
      } else {
        item.lastName = user.lastName
        item.firstName = user.firstName
      }
      return item
    })
  }

  function download() {
    return sendFile(ctrl.records)
  }

  function sendFile(data) {
    var filename = ['odin', ctrl.groupId, ctrl.label].join('_')
    filename = filename + '.csv'
    var options = { delimiter: ',', newline: '\r\n', quotes: true }
    var csv = Papa.unparse(data, options)
    DownloadService.download(csv, filename)
  }

  function onSelectUser() {
    // console.log('onSelectUser', user)
  }
}
