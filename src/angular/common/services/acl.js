import angular from 'angular'

angular.module('odin.common').factory('ACL', ACL)

ACL.$inject = ['$q', 'Session']
function ACL($q, Session) {
  return {
    allow: allow,
    has: has,
    is: is,
    allowVersion: allowVersion,
    hasVersion: hasVersion,
    isPaasAdmin: isPaasAdmin
  }

  function allowVersion(version) {
    return Session.required().then(function() {
      return hasVersion(version) ? $q.when() : $q.reject('aclVersion')
    })
  }

  function allow(allowed) {
    return Session.required().then(function() {
      return has(allowed) ? $q.when() : $q.reject('aclAllow')
    })
  }

  function has(type) {
    if (type === 'PaaS Admin' && isPaasAdmin()) {
      return true
    }
    const types = {
      'User': 1,
      'Group': 2,
      'Service Provider': 3,
      'Reseller': 4,
      'Provisioning': 5,
      'System': 6
    }
    const required = types[type] || 10
    const user = types[Session.data('loginType')] || 0
    return user >= required
  }

  function is(type) {
    return Session.data('loginType') === type
  }

  function hasVersion(required) {
    try {
      const currentVersion = parseFloat(Session.data('softwareVersion').replace('sp', '.'))
      const requiredVersion = parseFloat(required.replace('sp', '.'))
      return currentVersion >= requiredVersion
    } catch (error) {
      return false
    }
  }

  function isPaasAdmin() {
    return Session.data('isPaasAdmin')
  }
}
