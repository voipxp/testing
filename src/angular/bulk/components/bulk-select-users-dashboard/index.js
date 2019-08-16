import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectUsersDashboard', {
  template,
  controller,
  bindings: { onSelect: '&' }
})

controller.$inject = ['Alert', 'Route', '$location', 'TaskService', 'CsvService', 'EventEmitter']
function controller(Alert, Route, $location, TaskService, CsvService, EventEmitter) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.selectTask = selectTask
  ctrl.uploadUsers = uploadUsers

  ctrl.wizardReady = wizardReady
  ctrl.wizardComplete = wizardComplete

  ctrl.onUpdateServiceProviderId = onUpdateServiceProviderId
  ctrl.onUpdateGroupId = onUpdateGroupId
  ctrl.onUpdateUsers = onUpdateUsers

  var limit = 5

  function onInit() {
    ctrl.tasks = []
    loadTasks()
  }

  function loadTasks() {
    ctrl.loadingTasks = true
    return TaskService.index(limit, 'completed')
      .then(data => {
        ctrl.tasks = data.filter(task => task.type !== 'user.delete')
        return data
      })
      .then(data => {
        data.forEach(task => {
          task.userList = _.map(task.data, 'userId').join(', ')
        })
      })
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loadingTasks = false))
  }

  function sendUsers(data) {
    ctrl.onSelect(EventEmitter(data))
  }

  function selectTask(task) {
    sendUsers(transformData(task.data))
  }

  function uploadUsers(file) {
    CsvService.import(file.content)
      .then(transformData)
      .then(sendUsers)
  }

  function transformData(data) {
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
    ctrl.wizard = event.wizard
    if (ctrl.serviceProviderId) {
      next()
    }
    if (ctrl.groupId) {
      next()
    }
  }

  function onUpdateServiceProviderId(event) {
    ctrl.serviceProviderId = event.serviceProviderId
    ctrl.groupId = null
    ctrl.users = []
    next()
  }

  function onUpdateGroupId(event) {
    ctrl.groupId = event.groupId
    ctrl.users = []
    next()
  }

  function onUpdateUsers(event) {
    ctrl.users = event.users
    next()
  }

  function wizardComplete() {
    sendUsers({
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      users: ctrl.users
    })
  }

  function next() {
    ctrl.wizard.next()
  }
}
