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
    templateUrl: 'group/components/callRecords/group/data.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      startTime: '<',
      endTime: '<',
      label: '<'
    }
  })

  function Controller(
    Alert,
    GroupCallRecordsService,
    DownloadService,
    Papa,
    $rootScope
  ) {
    var ctrl = this
    var viewableFields = [
      'userId',
      'groupId',
      'department',
      'direction',
      'calledNumber',
      'callingNumber',
      'otherPartyName',
      'startTime',
      'answerTime',
      'releaseTime',
      'placedTime',
      'totalTime',
      'answerIndicator',
      'relatedCallIdReason',
      'accountCode',
      'authorizationCode'
    ]

    ctrl.filters = [
      {
        name: 'Placed',
        value: 'Placed',
        show: true
      },
      {
        name: 'Placed Missed',
        value: 'PlacedMissed',
        show: true
      },
      {
        name: 'Received',
        value: 'Received',
        show: true
      },
      {
        name: 'Received Missed',
        value: 'ReceivedMissed',
        show: true
      },
      {
        name: 'Redirect',
        value: 'Redirect',
        show: true
      },
      {
        name: 'Other',
        value: '',
        show: true
      }
    ]

    ctrl.$onInit = onInit
    ctrl.download = download
    ctrl.toggleFilter = toggleFilter
    ctrl.onPagination = onPagination
    ctrl.searchUser = searchUser
    ctrl.onSelectUser = onSelectUser

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

    function toggleFilter(filter) {
      filter.show = !filter.show
      setFilters()
    }

    // Set the data based on the filter
    function setFilters() {
      var filters = _.map(_.filter(ctrl.filters, { show: true }), 'value')
      var details = _.filter(ctrl.records.data, function(item) {
        return _.includes(filters, item.direction) && isUser(item)
      })
      ctrl.details = details
    }

    function isUser(user) {
      return ctrl.searchUserId ? user.userId === ctrl.searchUserId : true
    }

    function loadDetails() {
      return GroupCallRecordsService.detail(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.startTime,
        ctrl.endTime
      )
        .then(function(data) {
          ctrl.records = data
          setFilters()
          console.log('records', data)
        })
        .then(warnLimit)
    }

    function incomplete() {
      return ctrl.records.count < ctrl.records.total
    }

    function warnLimit() {
      if (incomplete()) {
        Alert.notify.danger(
          'Results are limited to ' +
            ctrl.records.count +
            ' records. ' +
            'Please download the CSV file to see all the results.'
        )
      }
    }

    function download() {
      if (!incomplete()) return sendFile(ctrl.records.data)
      Alert.spinner.open()
      GroupCallRecordsService.detail(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.startTime,
        ctrl.endTime,
        true
      )
        .then(function(data) {
          sendFile(data.data)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function sendFile(data) {
      var filename = ['odin', ctrl.groupId, ctrl.label].join('_')
      filename = filename + '.csv'
      var options = { delimiter: ',', newline: '\r\n', quotes: true }
      var filtered = _.map(data, function(callRecord) {
        return _.pick(callRecord, viewableFields)
      })
      var csv = Papa.unparse(filtered, options)
      DownloadService.download(csv, filename)
    }

    function searchUser() {
      $rootScope.$emit('userSearch:load', {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId,
        onSelect: onSelectUser
      })
    }

    function onSelectUser(user) {
      console.log('onSelectUser', user)
      ctrl.searchUserId = user && user.userId
      setFilters()
    }
  }
})()
