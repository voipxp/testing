;(function() {
  angular.module('odin.app').component('pbsNavbar', {
    templateUrl: 'app/components/navbar/navbar.component.html',
    controller: Controller
  })

  function Controller(
    Session,
    Route,
    Application,
    $rootScope,
    $q,
    $window,
    ACL
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.logout = logout
    ctrl.burger = burger
    ctrl.open = open
    ctrl.search = search

    function onInit() {
      return $q.all([loadSession(), loadApplications()])
    }

    function loadApplications() {
      Application.index().then(function(data) {
        ctrl.applications = data
      })
    }

    function open(application) {
      if (application.window) {
        $window.open(application.url, '_blank', 'noopener')
      } else {
        $window.open(application.url, '_self')
      }
    }

    function loadSession() {
      ctrl.session = Session.data()
      ctrl.showSearch = ACL.has('Service Provider')
    }

    function logout() {
      Session.clear().then(Route.login)
    }

    function burger() {
      ctrl.showMenu = !ctrl.showMenu
    }

    function search(type) {
      if (type === 'users') {
        $rootScope.$emit('userSearch:load', {
          serviceProviderId: ctrl.session.serviceProviderId
        })
      } else if (type === 'groups') {
        $rootScope.$emit('groupSearch:load')
      }
    }

    $rootScope.$on('Session:updated', loadSession)
    $rootScope.$on('BrandingApplicationService:updated', loadApplications)
  }
})()
