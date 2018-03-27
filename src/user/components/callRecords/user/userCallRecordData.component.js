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
  angular.module('odin.user').component('userCallRecordData', {
    templateUrl:
      'user/components/callRecords/user/userCallRecordData.component.html',
    controller: Controller,
    bindings: {
      userId: '<',
      startTime: '<',
      endTime: '<',
      label: '<'
    }
  })

  function Controller(
    Alert,
    UserCallRecordsService,
    DownloadService,
    Papa,
    $rootScope
  ) {
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
      return UserCallRecordsService.details(
        ctrl.userId,
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
      var filename = ['odin', ctrl.userId, ctrl.label].join('_')
      filename = filename + '.csv'
      var options = { delimiter: ',', newline: '\r\n', quotes: true }
      var filtered = _.map(ctrl.details, function(callRecord) {
        return _.pick(callRecord, viewableFields)
      })
      var csv = Papa.unparse(filtered, options)
      DownloadService.download(csv, filename)
    }

    function searchUser() {
      $rootScope.$emit('userSearch:load', {
        userId: ctrl.userId,
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
