/*
answerIndicator
answerTime
authorizationCode
callCategory
calledNumber
callingNumber
dayOfWeek
department
direction
groupId
otherPartyName
placedTime
recordId
releaseTime
releaseTimeUtc
route
serviceProviderId
startTime
systemId
terminationCause
totalTime
userId
userIdSub
userNumber
userTimeZone
waitTime
*/

;(function() {
  angular.module('odin.group').component('groupCallRecordData', {
    templateUrl:
      'group/components/callRecords/group/groupCallRecordData.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      startTime: '<',
      endTime: '<',
      label: '<'
    }
  })

  function Controller(Alert, GroupCallRecordsService, DownloadService, Papa) {
    var ctrl = this
    var viewableFields = [
      'groupId',
      'department',
      'userId',
      'startTime',
      'answerTime',
      'releaseTime',
      'totalTime',
      'calledNumber',
      'otherPartyName',
      'accountCode',
      'callingNumber',
      'direction',
      'authorizationCode'
    ]

    ctrl.$onInit = onInit
    ctrl.download = download
    ctrl.filter = 'All'
    ctrl.filters = [
      'All',
      'Placed',
      'PlacedMissed',
      'Received',
      'ReceivedMissed',
      'Redirect'
    ]
    ctrl.setFilter = setFilter
    ctrl.onPagination = onPagination

    function onInit() {
      ctrl.details = []
      ctrl.loading = true
      loadDetails()
        .catch(function(error) {
          console.log(error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    // Set the data based on the filter
    function setFilter(filter) {
      if (!filter || filter === 'All') {
        ctrl.details = angular.copy(ctrl.records.data)
      } else {
        ctrl.details = _.filter(ctrl.records.data, { direction: filter })
      }
    }

    function loadDetails() {
      return GroupCallRecordsService.get(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.startTime,
        ctrl.endTime,
        'detail'
      )
        .then(function(data) {
          ctrl.records = data
          ctrl.details = angular.copy(data.data)
        })
        .then(warnLimit)
    }

    function warnLimit() {
      if (ctrl.records.count < ctrl.records.total) {
        Alert.notify.danger(
          'Results are limited to ' +
            ctrl.records.count +
            ' records. ' +
            'Please decrease the date range to see all the results.'
        )
      }
    }

    function download() {
      var filename = ['odin', ctrl.groupId, ctrl.label].join('_')
      filename = filename + '.csv'
      var options = { delimiter: ',', newline: '\r\n', quotes: true }
      var filtered = _.map(ctrl.details, function(callRecord) {
        return _.pick(callRecord, viewableFields)
      })
      var csv = Papa.unparse(filtered, options)
      DownloadService.download(csv, filename)
    }
  }
})()
