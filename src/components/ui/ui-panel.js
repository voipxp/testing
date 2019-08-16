import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'rbx'

export const UiPanel = ({ title, children, itemKey, items }) => {
  return (
    <>
      <Panel>
        <Panel.Heading>{title}</Panel.Heading>
        <Panel.Block>
          <p className="panel-block" />
        </Panel.Block>
      </Panel>
    </>
  )
}

UiPanel.propTypes = {
  title: PropTypes.string,
  itemKey: PropTypes.string,
  items: PropTypes.array,
  children: PropTypes.any,
  onSelect: PropTypes.func
}
