;(function() {
  angular.module('odin.group').component('autoAttendant', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/index.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Alert,
    GroupAutoAttendantService,
    UserPermissionService,
    Module,
    Route,
    ACL,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.back = back
    ctrl.update = update
    ctrl.destroy = destroy
    ctrl.onUpdateProfile = onUpdateProfile
    ctrl.isStandard = isStandard

    function onInit() {
      ctrl.loading = true
      ctrl.hasAnnouncements = ACL.hasVersion('20')
      return $q
        .all([
          loadAutoAttendant(),
          UserPermissionService.load(ctrl.serviceUserId)
        ])
        .then(function(data) {
          return loadPermissions(data[1])
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function isStandard() {
      return _.get(ctrl, 'autoAttendant.type') === 'Standard'
    }

    function loadPermissions(permission) {
      if (permission.read('Basic Call Logs')) {
        ctrl.showBasic = true
      }
      if (permission.read('Premium Call Records')) {
        ctrl.showPremium = true
      }
      ctrl.showCalls = ctrl.showBasic || ctrl.showPremium
    }

    function loadAutoAttendant() {
      return GroupAutoAttendantService.show(ctrl.serviceUserId).then(function(
        data
      ) {
        ctrl.autoAttendant = data
        console.log('attendant', data)
      })
    }

    function update(autoAttendant, callback) {
      if (
        autoAttendant.password &&
        autoAttendant.password !== autoAttendant.password2
      ) {
        Alert.notify.danger('Passwords do not match')
        return
      }
      console.log('update', autoAttendant)
      Alert.spinner.open()
      return GroupAutoAttendantService.update(autoAttendant)
        .then(loadAutoAttendant)
        .then(function() {
          Alert.notify.success('Auto Attendant Saved')
          callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function destroy(callback) {
      Alert.spinner.open()
      GroupAutoAttendantService.destroy(ctrl.serviceUserId)
        .then(function() {
          Alert.notify.success('Auto Attendant Removed')
          if (_.isFunction(callback)) {
            callback()
          }
          back()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function onUpdateProfile(event) {
      var autoAttendant = angular.copy(ctrl.autoAttendant)
      autoAttendant.serviceInstanceProfile = event.profile
      update(autoAttendant, event.callback)
    }

    function back() {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId)(
        'autoAttendants'
      )
    }
  }
})()
