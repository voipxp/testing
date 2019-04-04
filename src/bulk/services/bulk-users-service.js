import angular from 'angular'
import _ from 'lodash'

angular.module('odin.bulk').factory('BulkUsersService', BulkUsersService)

BulkUsersService.$inject = ['$location', '$q', 'StorageService', 'Session']
function BulkUsersService($location, $q, StorageService, Session) {
  var service = {
    open: open,
    get: get,
    load: load
  }
  var localStorageKey = 'BulkUsersService'
  return service

  function open(data, next) {
    return StorageService.set(localStorageKey, data).then(function() {
      var path = 'bulk'
      if (next) {
        path += '/' + next
      }
      return $location.path(path).search({})
    })
  }

  function get() {
    return StorageService.get(localStorageKey).then(function(data) {
      return validateCache(data)
    })
  }

  function validateCache(data) {
    if (!_.isObject(data)) {
      return {
        serviceProviderId: Session.data('serviceProviderId'),
        groupId: Session.data('groupId'),
        users: []
      }
    }
    if (Session.data('serviceProviderId')) {
      if (data.serviceProviderId !== Session.data('serviceProviderId')) {
        data.serviceProviderId = Session.data('serviceProviderId')
        data.users = []
      }
    }
    if (Session.data('groupId')) {
      if (data.groupId !== Session.data('groupId')) {
        data.groupId = Session.data('groupId')
        data.users = []
      }
    }
    return data
  }

  function load(data, next) {
    if (!data.users || data.users.length === 0) {
      return $q.reject('No Users provided')
    }
    if (!data.serviceProviderId || !data.groupId) {
      return $q.reject('Service Provider or Group not provided')
    }
    data.users.forEach(function(user) {
      user.serviceProviderId = data.serviceProviderId
      user.groupId = data.groupId
    })
    return open(data, next)
  }
}
