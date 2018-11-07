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
    $routeParams,
    $route
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.edit = edit
    ctrl.onUpdate = onUpdate
    ctrl.onDelete = onDelete

    function onInit() {
      ctrl.serviceProviderId = $routeParams.serviceProviderId
      ctrl.groupId = $routeParams.groupId
      ctrl.name = $routeParams.name
      ctrl.mediaType = $routeParams.mediaType
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
        ctrl.announcement = data
      })
    }

    function open(announcement) {
      var name = _.get(announcement, 'newName')
      var mediaType = _.get(announcement, 'mediaType')
      if (name && mediaType) {
        return Route.open(
          'groups',
          ctrl.serviceProviderId,
          ctrl.groupId,
          'announcements',
          'announcement'
        ).search({ name: name, mediaType: mediaType })
      } else {
        return Route.open(
          'groups',
          ctrl.serviceProviderId,
          ctrl.groupId,
          'announcements'
        )
      }
    }

    function onUpdate(event) {
      return event.announcement.newName === ctrl.announcement.name
        ? onInit()
        : open(event.announcement) && $route.reload()
    }

    function onDelete() {
      open()
    }

    function edit() {
      $scope.$broadcast('announcementUpdate:load')
    }
  }
})()
