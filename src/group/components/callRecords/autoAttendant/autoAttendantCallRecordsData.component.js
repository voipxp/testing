;(function() {
  angular.module('odin.group').component('autoAttendantCallRecordsData', {
    templateUrl:
      'group/components/callRecords/autoAttendant/autoAttendantCallRecordsData.component.html',
    bindings: {
      callRecords: '<',
      parameters: '<'
    },
    controller: Controller
  })

  function Controller(Alert, Papa, DownloadService) {
    var ctrl = this
    ctrl.$onChanges = onChanges
    ctrl.downloadCsv = downloadCsv
    ctrl.onPagination = onPagination

    var viewableFields = [
      'userId',
      'department',
      'callTime',
      'calledNumber',
      'otherPartyName',
      'placedSeconds',
      'waitSeconds',
      'totalSeconds'
    ]

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onChanges(changes) {
      if (changes.callRecords) {
        ctrl.callRecords = changes.callRecords.currentValue
      }
      if (changes.parameters) {
        ctrl.parameters = changes.parameters.currentValue
      }
    }

    function downloadCsv() {
      var timeformat = '{yyyy}{MM}{dd}-{HH}{mm}{ss}'
      var startTime = Sugar.Date.format(
        Sugar.Date.create(ctrl.parameters.startTime),
        timeformat
      )
      var endTime = Sugar.Date.format(
        Sugar.Date.create(ctrl.parameters.endTime),
        timeformat
      )
      // generate filename
      var filename = [
        'odin',
        ctrl.parameters.serviceUserId,
        'call-records',
        ctrl.parameters.reportType.toLowerCase(),
        startTime,
        endTime
      ].join('_')

      filename = filename + '.csv'

      // download csv
      var options = {
        delimiter: ',',
        newline: '\r\n',
        quotes: true
      }

      var filtered = _.map(ctrl.callRecords, function(callRecord) {
        return _.pick(callRecord, viewableFields)
      })
      var csv = Papa.unparse(filtered, options)
      DownloadService.download(csv, filename)
    }
  }
})()
