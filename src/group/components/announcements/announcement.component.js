;(function() {
  angular.module('odin.group').component('groupAnnouncement', {
    templateUrl: 'group/components/announcements/announcement.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    GroupAnnouncementService,
    Route,
    $scope,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.edit = edit
    ctrl.onUpdate = onUpdate
    ctrl.onDelete = onDelete
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.name = $routeParams.name
    ctrl.mediaType = $routeParams.mediaType

    function onInit() {
      ctrl.loading = true
      return loadAnnouncement()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadAnnouncement() {
      return GroupAnnouncementService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.name,
        ctrl.mediaType
      ).then(function(data) {
        console.log('announcement', data)
        ctrl.announcement = data
      })
    }

    function open(announcement) {
      var name = _.get(announcement, 'newName')
      var mediaType = _.get(announcement, 'mediaType')
      return Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'announcements'
      )(name, mediaType)
    }

    function onUpdate(event) {
      if (event.announcement.newName === ctrl.announcement.name) {
        onInit()
      } else {
        open(event.announcement)
      }
    }

    function onDelete() {
      open()
    }

    function edit() {
      $scope.$broadcast('announcementUpdate:load')
    }
  }
})()
