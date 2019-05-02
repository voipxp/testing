import React from 'react'
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import PropTypes from 'prop-types'
import { UiMenu } from '@/components/ui'
import { useAcl } from '@/utils/acl'

export const AppMenu = ({ routes }) => {
  const { hasVersion, hasLevel } = useAcl()

  const menu = React.useMemo(() => {
    const filtered = routes.filter(route => {
      if (route.version && !hasVersion(route.version)) return false
      if (route.acl && !hasLevel(route.acl)) return false
      return true
    })
    if (!filtered) return []
    const sections = uniq(filtered.map(i => i.section)).sort()
    const schema = []
    sections.forEach(section => {
      const items = filtered.filter(route => route.section === section)
      if (items.length === 0) return
      schema.push({ section, items: sortBy(items, 'name') })
    })
    return schema
  }, [hasLevel, hasVersion, routes])

  return <UiMenu menu={menu} />
}

AppMenu.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      section: PropTypes.string.isRequired,
      component: PropTypes.string,
      angularComponent: PropTypes.string,
      acl: PropTypes.string,
      version: PropTypes.string,
      bindings: PropTypes.object
    })
  ).isRequired
}

export default AppMenu
