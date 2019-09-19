import React from 'react'
import PropTypes from 'prop-types'
import angular from 'angular'
import kebabCase from 'lodash/kebabCase'
import camelCase from 'lodash/camelCase'
import { withRouter } from 'react-router-dom'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { getInjector } from '@/angular/injector'
import { useSession, useModulePermissions } from '@/utils'

export const AngularComponentBase = ({ component, location = {}, match = {}, ...props }) => {
  const scopeRef = React.useRef()
  const ref = React.useRef()

  const Module = useModulePermissions()
  const { loginType } = useSession()

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

      // add a permissions attr to match what angular is used to
      if (props.module) {
        if (typeof props.module === String) {
          props.module = Module.show(props.module)
        }
        const permissions =
          loginType === 'System'
            ? { create: true, read: true, update: true, delete: true }
            : {
                create: module[camelCase(`${loginType}Create`)],
                read: module[camelCase(`${loginType}Read`)],
                update: module[camelCase(`${loginType}Update`)],
                delete: module[camelCase(`${loginType}Delete`)]
              }
        props.module = { ...props.module, permissions }
      }

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
  match: PropTypes.object,
  module: PropTypes.any
}

export const AngularComponent = withRouter(AngularComponentBase)
