;(function() {
  angular
    .module('odin.group')
    .component('groupCommunicationBarringAuthorizationCodes', {
      templateUrl:
        'group/components/groupCommunicationBarring/groupCommunicationBarringAuthorizationCodes.component.html',
      controller: Controller
    })

  function Controller(
    Alert,
    GroupCommunicationBarringAuthorizationCodeService,
    $routeParams
  ) {
    var ctrl = this

    ctrl.$onInit = activate
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    ctrl.add = add
    ctrl.remove = remove

    function activate() {
      ctrl.codes = []
      ctrl.loading = true
      loadCodes()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadCodes() {
      return GroupCommunicationBarringAuthorizationCodeService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        console.log('codes', data)
        ctrl.codes = data
        return data
      })
    }

    function addCode(code, callback) {
      Alert.spinner.open()
      GroupCommunicationBarringAuthorizationCodeService.create(
        ctrl.serviceProviderId,
        ctrl.groupId,
        code
      )
        .then(loadCodes)
        .then(function() {
          Alert.notify.success('Authorization Code Added')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function add() {
      ctrl.newCode = {}
      Alert.modal.open(
        'addGroupCommunicationBarringAuthorizationCode',
        function onSave(close) {
          addCode(ctrl.newCode, close)
        }
      )
    }

    function remove(code) {
      if (ctrl.readOnly) return
      Alert.confirm
        .open('Are you sure you want to remove this code?')
        .then(function() {
          Alert.spinner.open()
          GroupCommunicationBarringAuthorizationCodeService.destroy(
            ctrl.serviceProviderId,
            ctrl.groupId,
            code.code
          )
            .then(loadCodes)
            .then(function() {
              Alert.notify.success('Authorization Code Removed')
            })
            .catch(function(error) {
              Alert.notify.danger(error)
            })
            .finally(function() {
              Alert.spinner.close()
            })
        })
    }
  }
})()
