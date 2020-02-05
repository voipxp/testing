import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkImport', {
  template,
  controller
})

controller.$inject = [
  'Alert',
  'Route',
  '$q',
  'ACL',
  'TaskService',
  'UtilityService',
  'BulkImportService',
  'BulkTaskService',
  'BulkParseService',
  'CsvService',
  'DownloadService',
  '$scope',
  'ServiceProviderPolicyService'
]
function controller(
  Alert,
  Route,
  $q,
  ACL,
  TaskService,
  UtilityService,
  BulkImportService,
  BulkTaskService,
  BulkParseService,
  CsvService,
  DownloadService,
  $scope,
  ServiceProviderPolicyService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.download = download
  ctrl.submit = submit
  ctrl.highlight = highlight
  ctrl.canCreateUser = ServiceProviderPolicyService.userCreate()

  function onInit() {
    ctrl.loading = true
    loadData()
      .then(function() {
        return clean(ctrl.users)
      })
      .then(function() {
        return validate(ctrl.users)
      })
      .then(function() {
        return setWatcher()
      })
      .finally(function() {
        ctrl.loading = false
      })
      .catch(function(error) {
        console.log(error)
        Alert.notify.warning(error || 'Data Error')
      })
  }

  function clean(users) {
    return $q.when(
      users.map(user => {
        if (user.password === '__CHANGEME__') {
          user.password = null
        }
        return user
      })
    )
  }

  function loadData() {
    return BulkImportService.get()
      .then(function(data) {
        ctrl.users = data
        ctrl.keys = loadKeys(data)
        ctrl.task = data[0]['task']
        return data
      })
      .then(function(data) {
        ctrl.action = BulkTaskService.get(ctrl.task)
        if (!ctrl.action) return $q.reject('Task missing or invalid')
        return data
      })
  }

  function loadKeys(data) {
    var hidden = ['index']
    var keys = _.pullAll(UtilityService.allKeys(data), hidden)
    keys.sort(function(a, b) {
      if (a === 'userId') return -1
      if (b === 'userId') return 1
      if (a === 'task') return -1
      if (b === 'task') return 1
      return a < b ? -1 : 1
    })
    return keys
  }

  function download() {
    var now = new Date()
    var filename = ctrl.task + '.' + now.toJSON() + '.csv'
    CsvService.export(ctrl.users)
      .then(function(data) {
        DownloadService.download(data, filename)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
  }

  function submit() {
      validate(ctrl.users)
      .then(function() {
        return stringToBoolean(ctrl.users)
      })
      .then(function() {
        return queue(ctrl.users)
      })
      .catch(function(error) {
        console.log(error)
        Alert.notify.danger(error)
      })
  }

  function validate(users) {
    return BulkParseService.parse(users)
      .then(function() {
        return BulkParseService.validate(users, ctrl.action.required || [])
      })
      .catch(function(error) {
        console.log(error)
        return $q.reject('Data Error: ' + error)
      })
  }

  function isPermittedTask(task) {
    if(
        task === 'user.create' && !ctrl.canCreateUser ||
        task === 'user.delete' && !ctrl.canCreateUser ||
        task === 'service.provider.bulk.clone' && !ACL.has('Reseller') ||
        task === 'trunk.group.call.capacity' && !ACL.has('Service Provider') ||
        (task === 'group.dns.assign' || task === 'group.dns.unassign' ) && !ACL.has('Reseller')
      )
      {
        Alert.notify.danger(task + ' is not a permitted Task')
        return false
      }
    return true
  }

  function queue(users) {
    if(!isPermittedTask(ctrl.task)) return false  /* Check admin has policy for user create/delete */
    var task = {
      type: ctrl.task,
      data: UtilityService.unflatten(users)
    }
    Alert.spinner.open()
    return TaskService.create(task)
      .then(function(data) {
        Alert.notify.success('Import Queued: ' + data.id)
        Route.open('bulk')
      })
      .catch(function(error) {
        return $q.reject(error.data)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function highlight(user, key) {
    return {
      'has-text-danger': /{{.*}}/.test(user[key])
    }
  }

  function setWatcher() {
    $scope.$watch(
      function() {
        return ctrl.users
      },
      function(newValue) {
        if (newValue) validate(ctrl.users)
      },
      true
    )
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
