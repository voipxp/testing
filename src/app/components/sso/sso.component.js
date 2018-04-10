;(function() {
  angular.module('odin.app').component('pbsSso', {
    templateUrl: 'app/components/sso/sso.component.html',
    controller: Controller
  })

  function Controller(Auth, Session, Module, Route, Alert, $location) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      var token = $location.search().token
      $location.search({})
      console.log('token', token)
      login(token)
    }

    function login(token) {
      Alert.spinner.open()
      return Session.set({ token: token })
        .then(Auth.session)
        .then(Session.update)
        .then(Module.load)
        .then(Route.dashboard)
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
          Route.login()
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
