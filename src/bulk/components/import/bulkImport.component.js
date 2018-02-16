;(function() {
  angular.module('odin.bulk').component('bulkImport', {
    templateUrl: 'bulk/components/import/bulkImport.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    Route,
    $q,
    TaskService,
    UtilityService,
    BulkImportService,
    BulkTaskService,
    BulkParseService,
    CsvService,
    DownloadService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.download = download
    ctrl.submit = submit
    ctrl.highlight = highlight

    function onInit() {
      ctrl.loading = true
      loadData()
        .then(function() {
          return validate(ctrl.users)
        })
        .finally(function() {
          ctrl.loading = false
        })
        .catch(function(error) {
          console.log(error)
          Alert.notify.danger(error || 'Data Error')
        })
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
      var filename = ctrl.task + '.' + now.toISOString() + '.csv'
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
          console.log('error', error)
          return $q.reject('Data Error: ' + error)
        })
    }

    function queue(users) {
      var task = {
        type: ctrl.task,
        data: UtilityService.unflatten(users)
      }
      Alert.spinner.open()
      return TaskService.create(task)
        .then(function(data) {
          Alert.notify.success('Import Queued: ' + data.id)
          Route.open('bulk')()
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
  }
})()
