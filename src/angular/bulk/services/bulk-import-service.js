import angular from 'angular'
import _ from 'lodash'

angular.module('odin.bulk').factory('BulkImportService', BulkImportService)

BulkImportService.$inject = [
  '$location',
  '$q',
  'StorageService',
  'CsvService',
  'UtilityService',
  'BulkTaskService',
  'Alert',
  'UserService'
]
function BulkImportService(
  $location,
  $q,
  StorageService,
  CsvService,
  UtilityService,
  BulkTaskService,
  Alert,
  UserService
) {
  var service = {
    open: open,
    get: get
  }
  var localStorageKey = 'BulkImportService'
  var required = ['task']
  return service

  function open(data) {
    return transform(data)
      .then(function(users) {
        return addIndex(users)
      })
      .then(function(users) {
        return clean(users)
      })
      .then(function(users) {
        return stringToBoolean(users)
      })
      .then(function(users) {
        return addServiceProvidersGroups(users)
      })
      .then(function(users) {
        return validate(users)
      })
      .then(function(users) {
        return StorageService.set(localStorageKey, users)
      })
      .then(function() {
        return $location.path('bulk/import').search({})
      })
      .catch(function(error) {
        Alert.notify.danger(error || 'Data Import Error')
      })
  }

  function get() {
    return StorageService.get(localStorageKey).then(validate)
  }

  function transform(data) {
    return $q(function(resolve) {
      var response = _.isString(data)
        ? CsvService.import(data)
        : UtilityService.flatten(data)
      resolve(response)
    })
  }

  function addIndex(data) {
    return $q(function(resolve) {
      /* eslint-disable-next-line unicorn/no-for-loop */
      for (var i = 0; i < data.length; i++) {
        data[i]['index'] = i + 1
      }
      resolve(data)
    })
  }

  // could be some leftover status messages from
  // an earlier task
  function clean(data) {
    return $q(function(resolve) {
      data.forEach(function(user) {
        delete user.status
        delete user.error
      })
      resolve(data)
    })
  }

  function addServiceProvidersGroups(data) {
    return $q.all(data.map(addServiceProviderGroup)).then(function() {
      return data
    })
  }

  function addServiceProviderGroup(user) {
    if( !user.task.startsWith('user.') ){     /* If task is not related to user (e.g: SP clone, group clone) */
      return $q.resolve(user)
    }

    if (user.serviceProviderId && user.groupId) {
      return $q.resolve(user)
    } else {
      return UserService.show(user.userId).then(function(data) {
        user.serviceProviderId = data.serviceProviderId
        user.groupId = data.groupId
        return user
      })
    }
  }

  // make sure its a proper task and all required fields are not empty
  function validate(data) {
    return $q(function(resolve, reject) {
      if (_.castArray(data).length === 0) return reject('No Data Provided')
      data.forEach(function(row) {
        var service = BulkTaskService.get(row['task'])
        if (!service) {
          throw new Error(`Invalid task type: ${row['task']}`)
        }
        _.uniq(required.concat(service.required)).forEach(function(key) {
          if (!row[key]) {
            throw new Error(`Missing required key: ${key}`)
          }
        })
      })
      resolve(data)
    })
  }

  function stringToBoolean(data) {
    return $q.all(data.map(stringToBooleanValue)).then(function() {
      return data
    })
  }

  function stringToBooleanValue(user) {
    Object.keys(user).map( key => {
        if( user[key] === "TRUE" || user[key] === "true" ) {
          user[key] = true
        }
        if( user[key] === "FALSE" || user[key] === "false" ) {
          user[key] = false
        }
    })

    return user
  }

}
