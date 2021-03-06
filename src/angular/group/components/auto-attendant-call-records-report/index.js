import angular from 'angular'
import Papa from 'papaparse'
import _ from 'lodash'
import Sugar from 'sugar-date'
import template from './index.html'

angular.module('odin.group').component('autoAttendantCallRecordsReport', {
  template,
  controller,
  bindings: {
    callRecords: '<',
    parameters: '<',
    reportTitle: '@',
    reportProperty: '@',
    reportFormat: '@'
  }
})

controller.$inject = ['$filter', 'DownloadService']
function controller($filter, DownloadService) {
  var ctrl = this
  ctrl.$onChanges = onChanges
  ctrl.totalForCallTimeAndResults = totalForCallTimeAndResults
  ctrl.totalForCallTimeAndOtherParty = totalForCallTimeAndOtherParty
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
    ctrl.callTimes = _.uniq(_.map(ctrl.callRecords, 'callTime')).sort()
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
    var labels = ctrl.callTimes.map(function(callTime) {
      var date = Sugar.Date.create(callTime)
      return Sugar.Date.format(date, ctrl.dateFormat)
    })
    var data = ctrl.callTimes.map(function(callTime) {
      var matches = _.filter(ctrl.callRecords, { callTime: callTime })
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
    rows.push(['otherPartyName'].concat(ctrl.callTimes))
    ctrl.otherPartyNames.forEach(function(otherPartyName) {
      var row = [otherPartyName].concat(
        ctrl.callTimes.map(function(callTime) {
          return totalForCallTimeAndOtherParty(callTime, otherPartyName)
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

  function totalForCallTimeAndOtherParty(callTime, otherPartyName) {
    var record = _.find(ctrl.callRecords, {
      callTime: callTime,
      otherPartyName: otherPartyName
    })
    var results = (record && record[ctrl.reportProperty]) || 0
    return tableFormat(results)
  }

  function totalForCallTimeAndResults(callTime, results) {
    var callRecords = _.filter(ctrl.callRecords, function(callRecord) {
      return _.includes(results, callRecord.otherPartyName)
    })
    var matches = _.filter(callRecords, { callTime: callTime })
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
