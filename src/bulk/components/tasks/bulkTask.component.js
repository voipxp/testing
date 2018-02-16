;(function() {
  angular.module('odin.bulk').component('bulkTask', {
    templateUrl: 'bulk/components/tasks/bulkTask.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    TaskService,
    $routeParams,
    CsvService,
    DownloadService,
    Route,
    $location,
    $timeout,
    BulkImportService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onDestroy = stopReload
    ctrl.refresh = onInit
    ctrl.download = download
    ctrl.canOpen = canOpen
    ctrl.open = open
    ctrl.filterStatus = filterStatus
    ctrl.searchStatus = ''
    ctrl.id = $routeParams.id
    ctrl.retryTask = retryTask
    ctrl.retryJobs = retryJobs
    ctrl.status = status

    var reload

    function onInit() {
      ctrl.loading = true
      loadTask()
        .then(startReload)
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function stopReload() {
      if (reload) $timeout.cancel(reload)
    }

    function startReload() {
      if (ctrl.task.status === 'pending') {
        reload = $timeout(loadTask, 5000)
      }
    }

    function loadTask() {
      return TaskService.show(ctrl.id)
        .then(function(data) {
          ctrl.task = data
          console.log('task', data)
          return data
        })
        .then(function() {
          return setSummary()
        })
        .then(startReload)
    }

    function setSummary() {
      ctrl.summary = { pending: 0, completed: 0, failed: 0 }
      var jobs = _.get(ctrl, 'task.data')
      if (!_.isArray(jobs)) return
      jobs.forEach(function(job) {
        var status = job.status || 'pending'
        ctrl.summary[status] += 1
      })
    }

    function download() {
      var filename =
        'odin-' +
        ctrl.task.status +
        '-' +
        ctrl.id +
        '-' +
        ctrl.task.type +
        '.csv'
      CsvService.export(ctrl.task.data).then(function(csv) {
        DownloadService.download(csv, filename)
      })
    }

    function filterStatus(job) {
      if (!ctrl.searchStatus) return true
      var status = job.status || 'pending'
      return ctrl.searchStatus === status
    }

    function canOpen(job) {
      if (!job.serviceProviderId || !job.groupId || !job.userId) {
        return false
      }
      if (job.task === 'user.create') {
        return job.status === 'completed'
      } else if (job.task === 'user.delete') {
        return job.status !== 'failed'
      } else {
        return true
      }
    }

    function open(job) {
      if (!canOpen(job)) return
      var thisUrl = '/app/#!/bulk/tasks/' + ctrl.id
      var provUrl = Route.path('users')(
        job.serviceProviderId,
        job.groupId,
        job.newUserId || job.userId
      )
      $location.path(provUrl).search({ returnTo: thisUrl })
    }

    function status(job) {
      if (job.status === 'completed' && job._error) {
        return 'completed with errors'
      } else {
        return job.status
      }
    }

    function retry(data) {
      console.log('retry', data)
      BulkImportService.open(angular.copy(data))
    }

    function retryTask() {
      retry(ctrl.task.data)
    }

    function retryJobs() {
      var notCompleted = _.filter(ctrl.task.data, function(job) {
        return job.status !== 'completed'
      })
      retry(notCompleted)
    }
  }
})()
