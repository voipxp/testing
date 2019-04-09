import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkUsers', {
  template,
  controller
})

controller.$inject = [
  'Alert',
  'Route',
  '$location',
  'BulkUsersService',
  'TaskService',
  'CsvService'
]
function controller(
  Alert,
  Route,
  $location,
  BulkUsersService,
  TaskService,
  CsvService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.Route = Route
  ctrl.selectCurrentUsers = selectCurrentUsers
  ctrl.select = select
  ctrl.upload = upload

  ctrl.wizardReady = wizardReady
  ctrl.wizardComplete = wizardComplete

  ctrl.onUpdateServiceProviderId = onUpdateServiceProviderId
  ctrl.onUpdateGroupId = onUpdateGroupId
  ctrl.onUpdateUsers = onUpdateUsers

  var limit = 5

  function onInit() {
    ctrl.tasks = []
    ctrl.loading = true
    ctrl.next = $location.search().next
    loadTasks()
  }

  function loadTasks() {
    ctrl.loadingTasks = true
    return TaskService.index(limit, 'completed')
      .then(function(data) {
        ctrl.tasks = data
        return data
      })
      .then(function(data) {
        data.forEach(function(task) {
          task.userList = _.map(task.data, 'userId').join(', ')
        })
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loadingTasks = false
      })
  }

  function selectCurrentUsers() {
    loadUsers(ctrl.data)
  }

  function select(task) {
    loadUsers(importUsers(task.data))
  }

  function upload(file) {
    CsvService.import(file.content)
      .then(importUsers)
      .then(loadUsers)
  }

  function importUsers(data) {
    return {
      serviceProviderId: data[0].serviceProviderId,
      groupId: data[0].groupId,
      users: data.map(function(user) {
        return {
          serviceProviderId: user.serviceProviderId,
          groupId: user.groupId,
          userId: user.userId
        }
      })
    }
  }

  function wizardReady(event) {
    BulkUsersService.get()
      .then(function(data) {
        ctrl.data = data
        ctrl.wizard = event.wizard
        if (ctrl.data.serviceProviderId) {
          next()
        }
        if (ctrl.data.groupId) {
          next()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onUpdateServiceProviderId(event) {
    if (!ctrl.data) return
    ctrl.data.serviceProviderId = event.serviceProviderId
    ctrl.data.groupId = null
    ctrl.data.users = []
    next()
  }

  function onUpdateGroupId(event) {
    if (!ctrl.data) return
    ctrl.data.groupId = event.groupId
    ctrl.data.users = []
    next()
  }

  function onUpdateUsers(event) {
    ctrl.data.users = event.users
    next()
  }

  function wizardComplete() {
    loadUsers(ctrl.data)
  }

  function next() {
    // console.log(JSON.stringify(ctrl.data, null, 2))
    ctrl.wizard.next()
  }

  function loadUsers(data) {
    BulkUsersService.load(data, ctrl.next).catch(function(error) {
      Alert.notify.danger(error)
    })
  }
}
