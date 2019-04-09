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

import angular from 'angular'
import Papa from 'papaparse'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterCallRecordData', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    startTime: '<',
    endTime: '<',
    label: '<'
  }
})

controller.$inject = ['Alert', 'GroupCallRecordsService', 'DownloadService']
function controller(Alert, GroupCallRecordsService, DownloadService) {
  var ctrl = this

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
    return GroupCallRecordsService.related(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.startTime,
      ctrl.endTime,
      'Call Center'
    ).then(function(data) {
      ctrl.details = data
    })
  }

  function download() {
    return sendFile(ctrl.details)
  }

  function sendFile(data) {
    var filename = ['odin', ctrl.groupId, ctrl.label].join('_')
    filename = filename + '.csv'
    var options = { delimiter: ',', newline: '\r\n', quotes: true }
    var csv = Papa.unparse(data, options)
    DownloadService.download(csv, filename)
  }
}
