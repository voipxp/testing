;(function() {
  angular.module('odin.app').component('pbsLogin', {
    templateUrl: 'app/components/login/login.component.html',
    controller: Controller
  })

  function Controller(Auth, Session, Module, Route, Alert) {
    var ctrl = this
    ctrl.login = login
    ctrl.canSubmit = canSubmit
    ctrl.submit = submit

    function canSubmit() {
      if (ctrl.needsChange) {
        return (
          ctrl.username &&
          ctrl.password &&
          ctrl.newPassword1 &&
          ctrl.newPassword2
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
      Auth.password(ctrl.password, ctrl.newPassword1, ctrl.username)
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
      return Auth.token(username, password)
        .then(Session.set)
        .then(Auth.session)
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
      var generic = 'Login Failed'
      var msg = _.get(error, 'data.error', generic)
      return msg.match(/^Empty userId/) ? generic : msg
    }
  }
})()
