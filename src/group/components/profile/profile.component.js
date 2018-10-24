;(function() {
  angular.module('odin.group').component('groupProfile', {
    templateUrl: 'group/components/profile/profile.component.html',
    controller: Controller
  })

  function Controller(
    GroupService,
    GroupDomainService,
    SystemTimeZoneService,
    Alert,
    GroupNumberService,
    $q,
    ACL,
    $routeParams,
    Route
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.edit = edit
    ctrl.selectPhoneNumber = selectPhoneNumber
    ctrl.contactSummary = contactSummary
    ctrl.addressSummary = addressSummary
    ctrl.toggleOptional = toggleOptional

    function onInit() {
      ctrl.loading = true
      return loadGroup()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadGroup() {
      return GroupService.show(ctrl.serviceProviderId, ctrl.groupId).then(
        function(data) {
          ctrl.group = data
        }
      )
    }

    function loadHelpers() {
      Alert.spinner.open()
      return $q.all([loadGroup(), loadNumbers()]).finally(function() {
        Alert.spinner.close()
      })
    }

    function loadNumbers() {
      return GroupNumberService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.numbers = data
        return data
      })
    }

    function edit() {
      var onDelete
      if (ACL.has('Service Provider')) {
        onDelete = function(close) {
          remove(close)
        }
      }
      loadHelpers()
        .then(function() {
          ctrl.editGroup = angular.copy(ctrl.group)
          ctrl.editGroup.groupId = ctrl.groupId

          Alert.modal.open(
            'editGroupDetailsModal',
            function onSave(close) {
              update(ctrl.editGroup, close)
            },
            onDelete
          )
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
    }

    function contactSummary() {
      var contact = ctrl.group.contact || {}
      return _.compact([
        contact.contactName,
        contact.contactEmail,
        contact.contactPhone
      ]).join(', ')
    }

    function addressSummary() {
      var address = ctrl.group.address
      if (!address) {
        return
      }
      var street = _.compact([address.addressLine1, address.addressLine2]).join(
        ' '
      )
      var stateZip = _.compact([
        address.stateOrProvince,
        address.zipOrPostalCode
      ]).join(' ')
      return _.compact([street, address.city, stateZip, address.country]).join(
        ', '
      )
    }

    function update(group, callback) {
      Alert.spinner.open()
      GroupService.update(ctrl.serviceProviderId, group)
        .then(loadGroup)
        .then(function() {
          Alert.notify.success('Group Updated')
          callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function remove(callback) {
      Alert.confirm
        .open('Are you sure you want to delete this group?')
        .then(function() {
          Alert.spinner.open()
          GroupService.destroy(ctrl.serviceProviderId, ctrl.groupId)
            .then(function() {
              Alert.notify.success('Group Removed')
              callback()
              Route.open('serviceProviders', ctrl.serviceProviderId, 'groups')
            })
            .catch(function(error) {
              Alert.notify.danger(error)
            })
            .finally(function() {
              Alert.spinner.close()
            })
        })
    }

    function selectPhoneNumber(event) {
      ctrl.editGroup.callingLineIdPhoneNumber = event.phoneNumber
    }

    function toggleOptional() {
      ctrl.showOptional = !ctrl.showOptional
    }
  }
})()
