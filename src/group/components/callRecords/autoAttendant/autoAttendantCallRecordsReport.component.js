;(function() {
  angular.module('odin.group').component('autoAttendantCallRecordsReport', {
    templateUrl:
      'group/components/callRecords/autoAttendant/autoAttendantCallRecordsReport.component.html',
    bindings: {
      callRecords: '<',
      parameters: '<',
      reportTitle: '@',
      reportProperty: '@',
      reportFormat: '@'
    },
    controller: Controller
  })

  function Controller(Alert, $filter, Papa, DownloadService) {
    var ctrl = this
    ctrl.$onChanges = onChanges
    ctrl.totalForReleaseTimeAndResults = totalForReleaseTimeAndResults
    ctrl.totalForReleaseTimeAndOtherParty = totalForReleaseTimeAndOtherParty
    ctrl.grandTotalForResults = grandTotalForResults
    ctrl.grandTotalForOtherPartyName = grandTotalForOtherPartyName
    ctrl.downloadCsv = downloadCsv

    function onChanges(changes) {
      if (changes.callRecords) {
        ctrl.callRecords = changes.callRecords.currentValue
      }
      if (changes.parameters) {
        ctrl.parameters = changes.parameters.currentValue
      }
      // Wait for everything to be present
      if (ctrl.callRecords && ctrl.parameters) {
        initiateDateFormat()
        initiateData()
        initiatePerTimeChart()
        initiatePerOptionChart()
      }
    }

    function initiateData() {
      ctrl.otherPartyNames = _.uniq(
        _.map(ctrl.callRecords, 'otherPartyName')
      ).sort()
      ctrl.releaseTimes = _.uniq(_.map(ctrl.callRecords, 'releaseTime')).sort()
    }

    function initiateDateFormat() {
      if (ctrl.parameters.reportType === 'Hourly') {
        ctrl.dateFormat = '{hours}{TT}'
      } else if (ctrl.parameters.reportType === 'Daily') {
        ctrl.dateFormat = '{Mon} {date}'
      } else if (ctrl.parameters.reportType === 'Detail') {
        ctrl.dateFormat = '{long}'
      } else {
        ctrl.dateFormat = '{long}'
      }
    }

    function initiatePerTimeChart() {
      var series = seriesFormat()
      var labels = ctrl.releaseTimes.map(function(releaseTime) {
        var date = Sugar.Date.create(releaseTime)
        return Sugar.Date.format(date, ctrl.dateFormat)
      })
      var data = ctrl.releaseTimes.map(function(releaseTime) {
        var matches = _.filter(ctrl.callRecords, { releaseTime: releaseTime })
        var results = _.sum(
          _.map(matches, function(match) {
            return parseInt(match[ctrl.reportProperty], 10) || 0
          })
        )
        return chartFormat(results)
      })
      ctrl.chartPerTime = { series: [series], labels: labels, data: [data] }
    }

    function initiatePerOptionChart() {
      var series = seriesFormat()
      var labels = ctrl.otherPartyNames
      var data = ctrl.otherPartyNames.map(function(otherPartyName) {
        var matches = _.filter(ctrl.callRecords, {
          otherPartyName: otherPartyName
        })
        var results = _.sum(
          _.map(matches, function(match) {
            return parseInt(match[ctrl.reportProperty], 10) || 0
          })
        )
        return chartFormat(results)
      })
      ctrl.chartPerOption = { series: [series], labels: labels, data: [data] }
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
        _.kebabCase(ctrl.reportTitle),
        ctrl.parameters.reportType.toLowerCase(),
        startTime,
        endTime
      ].join('_')

      filename = filename + '.csv'

      // generate CSV file
      var rows = []
      rows.push(['otherPartyName'].concat(ctrl.releaseTimes))
      ctrl.otherPartyNames.forEach(function(otherPartyName) {
        var row = [otherPartyName].concat(
          ctrl.releaseTimes.map(function(releaseTime) {
            return totalForReleaseTimeAndOtherParty(releaseTime, otherPartyName)
          })
        )
        rows.push(row)
      })

      // download csv
      var options = {
        delimiter: ',',
        newline: '\r\n',
        quotes: true,
        header: false
      }
      var csv = Papa.unparse(rows, options)
      DownloadService.download(csv, filename)
    }

    function totalForReleaseTimeAndOtherParty(releaseTime, otherPartyName) {
      var record = _.find(ctrl.callRecords, {
        releaseTime: releaseTime,
        otherPartyName: otherPartyName
      })
      var results = (record && record[ctrl.reportProperty]) || 0
      return tableFormat(results)
    }

    function totalForReleaseTimeAndResults(releaseTime, results) {
      var callRecords = _.filter(ctrl.callRecords, function(callRecord) {
        return _.includes(results, callRecord.otherPartyName)
      })
      var matches = _.filter(callRecords, { releaseTime: releaseTime })
      var newResults = _.sum(
        _.map(matches, function(match) {
          return parseInt(match[ctrl.reportProperty], 10) || 0
        })
      )
      return tableFormat(newResults)
    }

    function grandTotalForResults(results) {
      var callRecords = _.filter(ctrl.callRecords, function(callRecord) {
        return _.includes(results, callRecord.otherPartyName)
      })
      var newResults = _.sum(
        _.map(callRecords, function(record) {
          return parseInt(record[ctrl.reportProperty], 10) || 0
        })
      )
      return tableFormat(newResults)
    }

    function grandTotalForOtherPartyName(otherPartyName) {
      var callRecords = _.filter(ctrl.callRecords, {
        otherPartyName: otherPartyName
      })
      var results = _.sum(
        _.map(callRecords, function(record) {
          return parseInt(record[ctrl.reportProperty], 10) || 0
        })
      )
      return tableFormat(results)
    }

    function tableFormat(results) {
      if (ctrl.reportFormat === 'time') {
        return $filter('toTime')(results)
      } else {
        return results
      }
    }

    function chartFormat(results) {
      if (ctrl.reportFormat === 'time') {
        return Math.round(results / 60)
      } else {
        return results
      }
    }

    function seriesFormat() {
      if (ctrl.reportFormat === 'time') {
        return ctrl.reportTitle + ' Minutes'
      } else {
        return ctrl.reportTitle
      }
    }
  }
})()
