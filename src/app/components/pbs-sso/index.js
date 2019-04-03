import angular from 'angular'

angular.module('odin.app').component('pbsSso', { template: '', controller })

controller.$inject = [
  'AuthService',
  'Session',
  'Module',
  'Route',
  'Alert',
  '$location'
]
function controller(AuthService, Session, Module, Route, Alert, $location) {
  const ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    const token = $location.search().token
    $location.search({})
    login(token)
  }

  function login(token) {
    Alert.spinner.open()
    return Session.set({ token: token })
      .then(AuthService.session)
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
