import angular from 'angular'
import template from './index.html'

angular.module('odin.app').component('pbsNavbar', { template, controller })

controller.$inject = [
  'Session',
  'Application',
  '$rootScope',
  '$q',
  '$window',
  'ACL',
  'Alert',
  'SsoService'
]
function controller(
  Session,
  Application,
  $rootScope,
  $q,
  $window,
  ACL,
  Alert,
  SsoService
) {
  const ctrl = this
  ctrl.$onInit = onInit
  ctrl.logout = logout
  ctrl.burger = burger
  ctrl.open = open
  ctrl.search = search

  const tokens = {}

  function onInit() {
    loadSession()
    loadApplications()
  }

  function loadApplications() {
    return Application.index().then(function(data) {
      ctrl.applications = data
    })
  }

  function open(application) {
    Alert.spinner.open()
    getToken(application.partner)
      .then(function(token) {
        const url = appendToken(application.url, token)
        if (application.window) {
          $window.open(url, '_blank', 'noopener')
        } else {
          $window.open(url, '_self')
        }
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function appendToken(url, token) {
    if (!token) return url
    const split = url.split('?')
    return url + (split[1] ? '&' : '?') + 'token=' + token
  }

  function getToken(partner) {
    if (!partner) return $q.resolve()
    if (tokens[partner]) return $q.when(tokens[partner])
    return SsoService.show(partner)
      .then(function(data) {
        tokens[partner] = data.token
        return data.token
      })
      .catch(function(error) {
        console.log('ssoError', error)
        tokens[partner] = null
      })
  }

  function loadSession() {
    ctrl.session = Session.data()
    ctrl.isGroup = ACL.has('Group')
    ctrl.isServiceProvider = ACL.has('Service Provider')
  }

  function logout() {
    Session.clear()
  }

  function burger() {
    ctrl.showMenu = !ctrl.showMenu
  }

  function search(type) {
    if (type === 'users') {
      $rootScope.$emit('userSearch:load', {
        serviceProviderId: ctrl.session.serviceProviderId,
        groupId: ctrl.session.groupId
      })
    } else if (type === 'services') {
      $rootScope.$emit('serviceSearch:load', {
        serviceProviderId: ctrl.session.serviceProviderId,
        groupId: ctrl.session.groupId
      })
    } else if (type === 'dn') {
      $rootScope.$emit('groupDnSearch:load', {
        serviceProviderId: ctrl.session.serviceProviderId,
        groupId: ctrl.session.groupId
      })
    } else if (type === 'groups') {
      $rootScope.$emit('groupSearch:load', {
        serviceProviderId: ctrl.session.serviceProviderId
      })
    }
  }

  $rootScope.$on('Session:loaded', loadSession)
  $rootScope.$on('BrandingApplicationService:updated', loadApplications)
}
