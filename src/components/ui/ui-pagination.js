import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleDoubleRight,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'

/**
 *
 * Renders pagination buttons.
 *
 * Pass in the number of **pages** and the current **page** as props. Use the callback functions (**onFirst**, **onNext**, ...) to change the state of the parent component when a pagination button is clicked.
 *
 * You may set the **align** prop to control the positioning on the viewport.
 */
export const UiPagination = ({
  align = 'left',
  pages = 1,
  page = 1,
  onFirst,
  onPrevious,
  onNext,
  onLast
}) => {
  if (pages < 2) return null

  return (
    <Button.Group hasAddons align={align} style={{ marginTop: '1rem' }}>
      <Button size="small" onClick={onFirst} disabled={page === 1}>
        <Icon size="small">
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Icon>
      </Button>

      <Button size="small" onClick={onPrevious} disabled={page === 1}>
        <Icon size="small">
          <FontAwesomeIcon icon={faAngleLeft} />
        </Icon>
      </Button>

      <Button size="small" static>
        {page}/{pages}
      </Button>

      <Button size="small" onClick={onNext} disabled={page === pages}>
        <Icon size="small">
          <FontAwesomeIcon icon={faAngleRight} />
        </Icon>
      </Button>

      <Button size="small" onClick={onLast} disabled={page === pages}>
        <Icon size="small">
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Icon>
      </Button>
    </Button.Group>
  )
}

UiPagination.propTypes = {
  align: PropTypes.oneOf(['left', 'centered', 'right']),
  /** Number of pages */
  pages: PropTypes.number.isRequired,
  /** Current page to display */
  page: PropTypes.number.isRequired,
  /** Callback when first button is clicked */
  onFirst: PropTypes.func,
  /** Callback when next button is clicked */
  onNext: PropTypes.func,
  /** Callback when previous button is clicked */
  onPrevious: PropTypes.func,
  /** Callback when last button is clicked */
  onLast: PropTypes.func
}
