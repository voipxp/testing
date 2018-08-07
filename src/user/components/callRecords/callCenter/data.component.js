;(function() {
  angular.module('odin.user').component('userCallCenterCallRecordData', {
    templateUrl: 'user/components/callRecords/callCenter/data.component.html',
    controller: Controller,
    bindings: {
      userId: '<',
      startTime: '<',
      endTime: '<',
      label: '<'
    }
  })

  function Controller(Alert, UserCallRecordsService, DownloadService, Papa) {
    var ctrl = this

    var viewableFields = [
      'groupId',
      'userId',
      'department',
      'otherPartyName',
      'calledNumber',
      'callingNumber',
      'startTime',
      'answerTime',
      'releaseTime',
      'waitTime',
      'placedTime',
      'totalTime'
    ]

    ctrl.$onInit = onInit
    ctrl.download = download
    ctrl.onPagination = onPagination

    function onInit() {
      ctrl.details = []
      ctrl.loading = true
      loadDetails()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function loadDetails() {
      return UserCallRecordsService.related(
        ctrl.userId,
        ctrl.startTime,
        ctrl.endTime,
        'Call Center'
      ).then(function(data) {
        ctrl.details = data
      })
    }

    function download() {
      return sendFile(ctrl.records.data)
    }

    function sendFile(data) {
      var filename = ['odin', ctrl.userId, ctrl.label].join('_')
      filename = filename + '.csv'
      var options = { delimiter: ',', newline: '\r\n', quotes: true }
      var filtered = _.map(data, function(callRecord) {
        return _.pick(callRecord, viewableFields)
      })
      var csv = Papa.unparse(filtered, options)
      DownloadService.download(csv, filename)
    }
  }
})()
