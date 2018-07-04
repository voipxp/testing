;(function() {
  angular.module('odin.app').factory('Session', Session)

  function Session($location, APP, StorageService, $rootScope, $q) {
    var _data = null
    var service = {
      load: load,
      data: data,
      set: set,
      update: update,
      clear: clear,
      required: required
    }

    return service

    // load the saved data into memory
    function load() {
      return StorageService.get(APP.sessionKey).then(function(data) {
        _data = data
        $rootScope.$emit('Session:updated')
        return _data
      })
    }

    // return the data or a specific property
    function data(property) {
      if (!property) return _data
      return _.get(_data, property)
    }

    // replace session data and cache in memory
    function set(data) {
      return StorageService.set(APP.sessionKey, data).then(load)
    }

    // update session data and cache in memory
    function update(data) {
      return set(_.assign({}, _data, data))
    }

    // remove the session data
    function clear() {
      return StorageService.clear(APP.sessionKey).then(load)
    }

    function required() {
      var promise = _data ? $q.when(_data) : load()
      return promise
        .then(function(data) {
          if (data) return data
          console.log('Session.required no data', data)
          $location.path(APP.loginURL)
          return $q.reject()
        })
        .catch(function(error) {
          console.log('Session.required failed', error)
          return $q.reject(error)
        })
    }
  }
})()
