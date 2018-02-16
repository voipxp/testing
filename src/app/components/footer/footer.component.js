;(function() {
  angular.module('odin.app').component('pbsFooter', {
    templateUrl: 'app/components/footer/footer.component.html',
    controller: Controller
  })

  function Controller(Template, Session, $rootScope) {
    var ctrl = this

    function loadTemplate() {
      ctrl.template = Template.data()
    }

    function loadSession() {
      ctrl.session = Session.data()
    }

    $rootScope.$on('Session:updated', loadSession)
    $rootScope.$on('Template:updated', loadTemplate)
  }
})()
