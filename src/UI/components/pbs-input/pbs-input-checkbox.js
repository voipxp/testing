import angular from 'angular'
import { Wrap, Directive } from './input-helper'

angular.module('odin.UI').directive('pbsInputCheckbox', Wrap('checkbox'))
angular.module('odin.UI').directive('pbsInputCheckbox', Directive)
