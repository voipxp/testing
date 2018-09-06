;(function() {
  angular.module('odin.group').component('groupUserCallReportData', {
    templateUrl:
      'group/components/callRecords/userCallReport/data.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      startTime: '<',
      endTime: '<',
      label: '<',
      users: '<'
    }
  })

  function Controller(Alert, UserCallRecordsService, DownloadService, Papa) {
    var ctrl = this

    ctrl.$onInit = onInit
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

    function onInit() {
      ctrl.details = []
      ctrl.loading = true
      loadDetails()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDetails() {
      return UserCallRecordsService.summary(
        _.map(ctrl.users, 'userId'),
        ctrl.startTime,
        ctrl.endTime
      ).then(function(data) {
        ctrl.records = data.map(function(item) {
          var user = _.find(ctrl.users, { userId: item.userId })
          if (!user) {
            item.lastName = item.userId
          } else {
            item.lastName = user.lastName
            item.firstName = user.firstName
          }
          return item
        })
      })
    }

    function download() {
      return sendFile(ctrl.records)
    }

    function sendFile(data) {
      var filtered = data.map(function(item) {
        delete item['$$hashKey']
        return item
      })
      var filename = ['odin', ctrl.groupId, ctrl.label].join('_')
      filename = filename + '.csv'
      var options = { delimiter: ',', newline: '\r\n', quotes: true }
      var csv = Papa.unparse(filtered, options)
      DownloadService.download(csv, filename)
    }

    function onSelectUser(user) {
      console.log('onSelectUser', user)
    }
  }
})()
