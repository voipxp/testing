import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBullseye,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faClone,
  faCog,
  faCogs,
  faDownload,
  faExternalLinkAlt,
  faInfo,
  faLink,
  faList,
  faLock,
  faPlus,
  faSearch,
  faSitemap,
  faSync,
  faTag,
  faTimes,
  faTrash,
  faUpload,
  faUserPlus,
  faUsers,
  faWrench
} from '@fortawesome/free-solid-svg-icons'

const icons = {
  add: faPlus,
  bulk: faSitemap,
  cancel: faTimes,
  check: faCheck,
  clone: faClone,
  cogs: faCogs,
  delete: faTrash,
  device: faWrench,
  download: faDownload,
  edit: faCog,
  info: faInfo,
  left: faChevronLeft,
  link: faLink,
  list: faList,
  lock: faLock,
  open: faExternalLinkAlt,
  right: faChevronRight,
  search: faSearch,
  select: faUserPlus,
  sync: faSync,
  tag: faTag,
  target: faBullseye,
  upload: faUpload,
  users: faUsers
}

/**
 * Wrapper around the [rbx](https://dfee.github.io/rbx/) **Button** element.
 *
 * - Provides a standard set of icon names to choose from.
 * - Automatically builds the FontAwesome icon if included
 * - Adds the children to a span.
 * - All other props are passed through to **Button**.
 */
export const UiButton = ({ icon, children, ...rest }) => {
  const theIcon = icon && icons[icon]
  return (
    <Button {...rest}>
      {icon && (
        <Icon>
          <FontAwesomeIcon icon={theIcon} />
        </Icon>
      )}
      {children && <span>{children}</span>}
    </Button>
  )
}

UiButton.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)),
  children: PropTypes.any
}
