;(function() {
  angular.module('odin.user').component('userAnnouncements', {
    templateUrl:
      'user/components/announcements/userAnnouncements.component.html',
    controller: Controller,
    bindings: {
      userId: '<'
    }
  })

  function Controller(
    Alert,
    UserAnnouncementService,
    $scope,
    Route,
    $location
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.open = open
    ctrl.onUpdate = onUpdate

    function onInit() {
      ctrl.repository = { announcements: [] }
      ctrl.loading = true
      return loadAnnouncements()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadAnnouncements() {
      return UserAnnouncementService.index(ctrl.userId).then(function(data) {
        console.log('repository', data)
        ctrl.repository = data
      })
    }

    function onUpdate() {
      onInit()
    }

    function open(announcement) {
      var search = {}
      if (!$location.path().match(/^\/announcements/)) {
        search.returnTo = $location.absUrl()
      }
      Route.open('users', ctrl.serviceProviderId, ctrl.groupId, ctrl.userId)(
        'announcements',
        announcement.name,
        announcement.mediaType
      ).search(search)
    }

    function add() {
      $scope.$broadcast('announcementCreate:load')
    }
  }
})()
