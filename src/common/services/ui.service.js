;(function() {
  angular.module('odin.common').factory('UIService', UIService)

  function UIService($timeout) {
    var service = { hidePanel: hidePanel, showPanel: showPanel }

    return service

    function hidePanel() {
      return $timeout(function() {
        var isHidden = $('body').hasClass('menu-hidden')
        var isFull = $('#menu').hasClass('custom-scroll')
        if (isFull && !isHidden) clickButton()
      }, 10)
    }

    function showPanel() {
      return $timeout(function() {
        var isHidden = $('body').hasClass('menu-hidden')
        var isFull = $('#menu').hasClass('custom-scroll')
        if (!isFull && isHidden) clickButton()
      }, 10)
    }

    function clickButton() {
      var button = $('#open-menu')
      console.log('button', button)
      if (button) {
        button.click()
      }
    }
  }
})()
