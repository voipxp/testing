import angular from 'angular'
import { Wrap, Directive } from './input-helper'

angular.module('odin.UI').directive('pbsInputSwitch', Wrap('switch'))
angular.module('odin.UI').directive('pbsInputSwitch', Directive)
