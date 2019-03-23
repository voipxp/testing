import angular from 'angular'
import { Wrap, Directive } from './input-helper'

angular.module('odin.UI').directive('pbsInputRadio', Wrap('radio'))
angular.module('odin.UI').directive('pbsInputRadio', Directive)
