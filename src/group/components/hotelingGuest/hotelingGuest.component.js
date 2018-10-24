;(function() {
  angular.module('odin.group').component('groupHotelingGuest', {
    templateUrl: 'group/components/hotelingGuest/hotelingGuest.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, UserHotelingGuestService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.onClick = onClick
    ctrl.onSelect = onSelect
    ctrl.options = UserHotelingGuestService.options

    ctrl.columns = [
      {
        key: 'user.userId',
        label: 'User ID'
      },
      {
        key: 'user.firstName',
        label: 'First Name'
      },
      {
        key: 'user.lastName',
        label: 'Last Name'
      },
      {
        key: 'user.phoneNumber',
        label: 'Phone Number'
      },
      {
        key: 'data.isActive',
        label: 'Active',
        type: 'boolean',
        align: 'centered'
      },
      {
        key: 'data.enableAssociationLimit',
        label: 'Enable Limit',
        type: 'boolean',
        align: 'centered'
      },
      {
        key: 'data.associationLimitHours',
        label: 'Limit Hours'
      }
    ]

    function onInit() {
      ctrl.loading = true
      return load()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function load() {
      return UserHotelingGuestService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.users = _.filter(data, function(item) {
          return _.get(item, 'service.assigned')
        })
      })
    }

    function onClick(event) {
      ctrl.editSettings = angular.copy(event.data)
      ctrl.editTitle = event.user.userId
      Alert.modal.open('editUserHotelingGuest', function(close) {
        update(event.user.userId, ctrl.editSettings, close)
      })
    }

    function onSelect(event) {
      var users = _.map(event, 'user')
      ctrl.editSettings = {}
      ctrl.editTitle = users.length + ' Users'
      Alert.modal.open('editUserHotelingGuest', function(close) {
        bulk({ data: ctrl.editSettings, users: users }, close)
      })
    }

    function update(userId, settings, callback) {
      Alert.spinner.open()
      UserHotelingGuestService.update(userId, settings)
        .then(load)
        .then(function() {
          Alert.notify.success('User Settings Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function bulk(data, callback) {
      Alert.spinner.open()
      UserHotelingGuestService.bulk(data)
        .then(load)
        .then(function() {
          Alert.notify.success('Bulk Settings Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
