// $window.ga('create', 'UA-XXXXXXXX-X', 'auto');
;(function() {
  angular.module('odin.app').component('pbsApp', {
    templateUrl: 'app/components/app/app.component.html',
    controller: Controller
  })

  function Controller(Template, $rootScope, $location, $window) {
    var ctrl = this

    function loadTemplate() {
      ctrl.template = Template.data()
      setGoogleUA()
    }

    function setGoogleUA() {
      var id = _.get(ctrl.template, 'pageGoogeUA')
      if (_.isEmpty(id)) return
      $window.ga('create', id, 'auto')
      $window.ga(function(tracker) {
        console.log('Google UA Initialized', tracker.get('clientId'))
      })
    }

    function sendGoolgeUA() {
      $window.ga(function(tracker) {
        if (tracker) $window.ga('send', 'pageview', $location.path())
      })
    }

    $rootScope.$on('$routeChangeSuccess', sendGoolgeUA)

    $rootScope.$on('Template:updated', loadTemplate)
  }
})()
