/*
  <pbs-block title="My Block">
    <pbs-block-buttons>
      <pbs-button-compact-info></pbs-button-compact-info>
    </pbs-block-buttons>
    <p>The Content Goes Here</p>
  </pbs-block>
*/
;(function() {
  angular.module('odin.common').component('pbsBlock', {
    templateUrl: 'common/UI/block/block.component.html',
    transclude: {
      buttons: '?pbsBlockButtons'
    },
    bindings: { title: '@', module: '<' },
    controller: function() {
      this.$onChanges = function() {
        this.name = _.get(this.module, 'alias', this.title)
      }
    }
  })
})()
