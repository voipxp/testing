;(function() {
  angular.module('odin.app').factory('ACL', ACL)

  function ACL($q, $location, Session) {
    return {
      check: check,
      allow: allow,
      has: has,
      is: is,
      allowVersion: allowVersion,
      hasVersion: hasVersion
    }
    function check(results) {
      return $q(function(resolve, reject) {
        if (results) return resolve()
        console.log('FAILED ACL CHECK', results)
        $location.path('/notfound')
        reject()
      })
    }
    function allowVersion(version) {
      return Session.required().then(function() {
        return check(hasVersion(version))
      })
    }
    function allow(allowed) {
      return Session.required().then(function() {
        return check(has(allowed))
      })
    }
    function has(type) {
      var types = {
        User: 1,
        Group: 2,
        'Service Provider': 3,
        Provisioning: 4,
        System: 5
      }
      var required = types[type] || 10
      var user = types[Session.data('loginType')] || 0
      return user >= required
    }
    function is(type) {
      return Session.data('loginType') === type
    }
    function hasVersion(required) {
      try {
        var currentVersion = parseFloat(
          Session.data('softwareVersion').replace('sp', '.')
        )
        var requiredVersion = parseFloat(required.replace('sp', '.'))
        return currentVersion >= requiredVersion
      } catch (err) {
        console.log(err)
        return false
      }
    }
  }
})()
