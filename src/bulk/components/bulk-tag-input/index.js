/*
  summary:
    Creates an input field that will parse tags as part of validation
    Appends a <small> element under the form with the parsed results

  bindings:
    isRequired:  (boolean)  is the field required?
    tagRequired: (boolean)  is the field required to have a tag?
    tagView:     (object)   override properites of the view
    onChange:    (function) function run on change of input
    hideTags:    (array)    list of tags to hide

  examples:
    // generate an input field where a valid resolved tag is required
    <bulk-tag-input ng-model="$ctrl.myField" tag-required="true"></bulk-tag-input>

    // generate an input field where a non-tag is OK, but something required
    <bulk-tag-input ng-model="$ctrl.myField" required></bulk-tag-input>

    // generate an input field sending a custom field for the view
    <bulk-tag-input ng-model="$ctrl.myField" tag-view="{domain: 'mydomain.com'}"
*/
import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkTagInput', {
  template,
  controller,
  bindings: {
    ngModel: '=',
    onChange: '=',
    isRequired: '<',
    tagRequired: '<',
    tagView: '<',
    hideTags: '<'
  },
  transclude: true
})

controller.$inject = ['HashService', 'BulkTagService', 'Alert']
function controller(HashService, BulkTagService, Alert) {
  this.$onInit = function() {
    this.modalId = HashService.guid()
    this.tags = BulkTagService.index()
  }
  this.onUpdate = function(event) {
    this.parsed = event.parsed
  }
  this.open = function() {
    Alert.modal.open(this.modalId)
  }
  this.select = function(tag) {
    this.ngModel = this.ngModel ? this.ngModel + tag.tag : tag.tag
    Alert.modal.close(this.modalId)
  }
  this.show = function(tag) {
    return !_.includes(_.castArray(this.hideTags), tag.property)
  }
}
