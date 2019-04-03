import angular from 'angular'
import _ from 'lodash'
import template from './index.html'
import './index.css'

angular.module('odin.app').component('pbsLogin', { template, controller })

controller.$inject = [
  'AuthService',
  'Session',
  'Module',
  'Route',
  'Alert',
  'UiTemplateService',
  '$rootScope'
]
function controller(
  AuthService,
  Session,
  Module,
  Route,
  Alert,
  UiTemplateService
) {
  const ctrl = this
  ctrl.$onInit = onInit
  ctrl.login = login
  ctrl.canSubmit = canSubmit
  ctrl.submit = submit

  function onInit() {
    if (!Session.expired()) {
      return Route.dashboard()
    }
    UiTemplateService.load().then(function() {
      ctrl.loginMessage = UiTemplateService.data('pageLoginMessage')
    })
  }

  function canSubmit() {
    if (ctrl.needsChange) {
      return (
        ctrl.username && ctrl.password && ctrl.newPassword1 && ctrl.newPassword2
      )
    } else {
      return ctrl.username && ctrl.password
    }
  }

  function submit() {
    ctrl.needsChange ? password() : login(ctrl.username, ctrl.password)
  }

  function password() {
    if (ctrl.newPassword1 !== ctrl.newPassword2) {
      Alert.notify.warning('New Passwords Do Not Match')
      return
    }
    if (ctrl.newPassword1 === ctrl.password) {
      Alert.notify.warning('New Password must be different than Old Password')
      return
    }
    Alert.spinner.open()
    AuthService.password(ctrl.password, ctrl.newPassword1, ctrl.username)
      .then(function() {
        return login(ctrl.username, ctrl.newPassword1)
      })
      .catch(function(error) {
        Alert.notify.danger(parseError(error))
        ctrl.needsChange = true
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function login(username, password) {
    Alert.spinner.open()
    return AuthService.token(username, password)
      .then(Session.set)
      .then(AuthService.session)
      .then(Session.update)
      .then(Module.load)
      .then(Route.dashboard)
      .catch(function(error) {
        Alert.notify.danger(parseError(error))
        ctrl.needsChange = error.status === 402
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function parseError(error) {
    console.log('loginError', error)
    const generic = 'Login Failed'
    const message = _.get(error, 'data.error', generic)
    return message.startsWith('Empty userId') ? generic : message
  }
}
