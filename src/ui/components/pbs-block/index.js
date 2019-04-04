import angular from 'angular'
import _ from 'lodash'
import template from './index.html'
import './index.css'

/*
  <pbs-block title="My Block">
    <pbs-block-buttons>
      <pbs-button-compact-info></pbs-button-compact-info>
    </pbs-block-buttons>
    <p>The Content Goes Here</p>
  </pbs-block>
*/
angular.module('odin.ui').component('pbsBlock', {
  template,
  transclude: { buttons: '?pbsBlockButtons' },
  bindings: { title: '@', module: '<' },
  controller: function() {
    this.$onChanges = function() {
      this.name = _.get(this.module, 'alias', this.title)
    }
  }
})
