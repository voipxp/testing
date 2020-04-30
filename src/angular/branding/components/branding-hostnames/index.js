import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingHostnames', {
  template,
  controller
})

controller.$inject = ['ACL', 'BrandingHostnameService', 'Route', 'Alert', 'Session']
function controller(ACL, BrandingHostnameService, Route, Alert, Session) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.add = add
  ctrl.copy = copy
  ctrl.onSave = create
  ctrl.selectedHostname = null

  ctrl.cancelHostname = () => {
    ctrl.selectedHostname = null
    loadHostnames()
  }

  function onInit() {
    ctrl.loading = true
    ctrl.hideNav = Session.data('resellerId') || ACL.is('Service Provider') || ACL.is('System')
    loadHostnames()
      .catch(function(error) {
        Alert.notify.danger(error.data)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadHostnames() {
    return BrandingHostnameService.index().then(function(data) {
      ctrl.hostnames = data
    })
  }

  function add() {
    ctrl.newHostname = {}
    Alert.modal.open('newHostnameModal', function(close) {
      return create(ctrl.newHostname, close)
    })
  }

  function copy() {
    ctrl.clone = {}
    Alert.modal.open('cloneHostnameModal', function(close) {
      return clone(ctrl.clone.from, ctrl.clone.to, close)
    })
  }

  async function clone(from, to, callback) {
    Alert.spinner.open()
    try {
      const data = await BrandingHostnameService.clone(from, to)
      await loadHostnames()
      Alert.notify.success('Hostname Cloned')
      callback()
      open(data)
    } catch (error) {
      Alert.notify.danger(error)
    } finally {
      Alert.spinner.close()
    }
  }

  function create(hostname, callback) {
    Alert.spinner.open()
    BrandingHostnameService.store(hostname)
      .then(function(hostname) {
        Alert.notify.success('Hostname Created')
        callback()
        open(hostname)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function open(hostname) {
    if (ctrl.hideNav) {
      ctrl.selectedHostname = hostname.id
    } else {
      Route.open('branding', hostname.id)
    }
  }
}
