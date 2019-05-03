import React from 'react'
import PropTypes from 'prop-types'
import angular from 'angular'
import kebabCase from 'lodash/kebabCase'
import { withRouter } from 'react-router-dom'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { getInjector } from '@/angular/injector'

export const AngularComponentBase = ({
  component,
  location = {},
  match = {},
  ...props
}) => {
  const scopeRef = React.useRef()
  const ref = React.useRef()

  useDeepCompareEffectNoCheck(() => {
    renderAngular()
    return () => destroyScope()
  }, [component, location.search, match.params])

  function destroyScope() {
    if (scopeRef.current) scopeRef.current.$destroy()
  }

  function renderAngular() {
    setTimeout(() => {
      destroyScope()
      const element = kebabCase(component)
      const matchParams = match.params || {}
      const params = { ...props, ...matchParams }
      const attrs = Object.keys(params).map(key => `${kebabCase(key)}="${key}"`)
      const template = `<${element} ${attrs.join(' ')}></${element}>`

      const el = angular.element(ref.current)
      getInjector().invoke([
        '$compile',
        '$rootScope',
        ($compile, $rootScope) => {
          el.empty()
          scopeRef.current = angular.extend($rootScope.$new(), params)
          const element = $compile(template)(scopeRef.current)
          el.append(element)
          scopeRef.current.$digest()
        }
      ])
    }, 0)
  }
  return <div ref={ref} />
}

AngularComponentBase.propTypes = {
  component: PropTypes.string,
  location: PropTypes.object,
  match: PropTypes.object
}

export const AngularComponent = withRouter(AngularComponentBase)
