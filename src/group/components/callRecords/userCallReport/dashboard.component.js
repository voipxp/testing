;(function() {
  angular.module('odin.group').component('groupUserCallReportDashboard', {
    templateUrl:
      'group/components/callRecords/userCallReport/dashboard.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

  function Controller(Alert, $timeout, UserService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.searchUsers = searchUsers
    ctrl.searchDate = searchDate
    ctrl.resetDate = resetDate
    ctrl.selectDate = selectDate

    ctrl.search = {}

    ctrl.today = {
      label: 'Today',
      startTime: Sugar.Date.create('beginning of today'),
      endTime: Sugar.Date.create('end of today')
    }

    ctrl.yesterday = {
      label: 'Yesterday',
      startTime: Sugar.Date.create('beginning of yesterday'),
      endTime: Sugar.Date.create('end of yesterday')
    }

    ctrl.thisWeek = {
      label: 'This Week',
      startTime: Sugar.Date.beginningOfISOWeek(Sugar.Date.create('this week')),
      endTime: Sugar.Date.endOfISOWeek(Sugar.Date.create('this week'))
    }

    ctrl.lastWeek = {
      label: 'Last Week',
      startTime: Sugar.Date.beginningOfISOWeek(Sugar.Date.create('last week')),
      endTime: Sugar.Date.endOfISOWeek(Sugar.Date.create('last week'))
    }

    function onInit() {
      ctrl.loading = true
      ctrl.users = []
      UserService.index(ctrl.serviceProviderId, ctrl.groupId)
        .then(function(data) {
          ctrl.allUsers = data || []
          if (ctrl.allUsers.length > 15) {
            selectUsers([])
            searchUsers()
          } else {
            selectUsers(ctrl.allUsers)
          }
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function searchDate() {
      ctrl.editSearch = angular.copy(ctrl.search)
      Alert.modal.open('userCallReportSearchModal', function(close) {
        selectDate(ctrl.editSearch) && close()
      })
    }

    function resetDate() {
      ctrl.search = {}
    }

    function selectDate(search) {
      if (
        !Sugar.Date.isValid(search.startTime) ||
        !Sugar.Date.isValid(search.endTime)
      ) {
        Alert.notify.warning('Start or End Time is Invalid')
        return false
      }
      ctrl.search = {}
      $timeout(function() {
        ctrl.search = {
          startTime: Sugar.Date.create(search.startTime),
          endTime: Sugar.Date.create(search.endTime),
          label: [
            Sugar.Date.format(search.startTime, '{short} {time}'),
            Sugar.Date.format(search.endTime, '{short} {time}')
          ].join(' - ')
        }
      }, 1)
      return true
    }

    function searchUsers() {
      ctrl.selectedUsers = angular.copy(ctrl.users)
      ctrl.availableUsers = _.differenceBy(
        ctrl.allUsers,
        ctrl.selectedUsers,
        'userId'
      )
      Alert.modal.open('userCallReportUsersModal', function(close) {
        selectUsers(ctrl.selectedUsers)
        close()
      })
    }

    function selectUsers(users) {
      ctrl.users = angular.copy(users)
      ctrl.userList = _.map(ctrl.users, function(user) {
        return _.compact([user.firstName, user.lastName]).join(' ')
      }).join(', ')
    }
  }
})()
