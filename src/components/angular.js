import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import angular from 'angular'
import kebabCase from 'lodash/kebabCase'
import { injector } from '/angular'

export default function Angular({ component, location = {}, match = {} }) {
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
      const params = match.params || {}
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

Angular.propTypes = {
  component: PropTypes.string,
  location: PropTypes.object,
  match: PropTypes.object
}
