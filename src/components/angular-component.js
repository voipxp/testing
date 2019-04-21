import React, { useRef } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import angular from 'angular'
import kebabCase from 'lodash/kebabCase'
import { injector } from '@/angular'

const AngularComponent = ({
  component,
  location = {},
  match = {},
  ...props
}) => {
  const scopeRef = useRef()
  const ref = useRef()

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
      const template = `<${element} ${attrs.join('')}></${element}>`
      const el = angular.element(ref.current)
      injector().invoke([
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

AngularComponent.propTypes = {
  component: PropTypes.string,
  location: PropTypes.object,
  match: PropTypes.object
}

export default withRouter(AngularComponent)
