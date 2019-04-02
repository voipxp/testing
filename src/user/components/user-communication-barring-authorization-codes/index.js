import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular
  .module('odin.user')
  .component('userCommunicationBarringAuthorizationCodes', {
    template,
    controller,
    bindings: { userId: '=', readOnly: '<' }
  })

controller.$inject = [
  'Alert',
  'UserCommunicationBarringAuthorizationCodeService'
]
function controller(Alert, UserCommunicationBarringAuthorizationCodeService) {
  var ctrl = this

  ctrl.$onInit = activate

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
    return UserCommunicationBarringAuthorizationCodeService.index(
      ctrl.userId
    ).then(function(data) {
      ctrl.codes = data
      return data
    })
  }

  function addCode(code, callback) {
    Alert.spinner.open()
    UserCommunicationBarringAuthorizationCodeService.create(ctrl.userId, code)
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
    ctrl.newCode = { userId: ctrl.userId }
    Alert.modal.open(
      'addUserCommunicationBarringAuthorizationCode',
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
        UserCommunicationBarringAuthorizationCodeService.destroy(
          ctrl.userId,
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
