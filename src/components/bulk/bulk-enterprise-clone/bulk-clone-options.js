import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiInputCheckbox } from '@/components/ui'
import { useAcl } from '@/utils'

export const BulkCloneOptions = props => {
  const cloneOptions = [
    {
      name: 'services',
      label: 'Services',
      value: true
    },
    {
      name: 'servicePacks',
      label: 'Service Packs',
      value: true
    },
    {
      name: 'networkClassOfService',
      label: 'Network Class of Service',
      value: true
    },
    {
      name: 'EnterpriseVoiceVPN',
      label: 'Enterprise Voice VPN',
      value: true
    },
    {
      name: 'callProcessingPolicy',
      label: 'Call Processing Policy',
      value: true
    },
    {
      name: 'domains',
      label: 'Domains',
      value: true
    }
  ]

  const acl = useAcl()
  const isSystem = acl.hasSystem()

  const newCloneOptions = cloneOptions.filter(option => {
    if (option.name === 'networkClassOfService' && !isSystem) return false
    return true
  })

  const [options, setOptions] = useState([...newCloneOptions])

  useEffect(() => {
    props.handleOptions(options)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInput = (event, index) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    const name = event.target.name
    const newOptions = [...options]
    if (name !== 'services' && name !== 'servicePacks') {
      newOptions[index]['value'] = value
      setOptions(newOptions)
      props.handleOptions(options)
    }
  }

  const prepareOptions = options.map((el, index) => {
    const disabled = el.name === 'services' || el.name === 'servicePacks'
    return (
      <li key={el.name} style={{ padding: '10px' }}>
        <UiInputCheckbox
          disabled = {disabled}
          key={el.name}
          name={el.name}
          label={el.label}
          checked={el.value}
          onChange={event => handleInput(event, index)}
        />
      </li>
    )
  })

  return (
    <>
      <UiCard title="Clone Options">
        <div className="field has-addons">
          <ul>{prepareOptions}</ul>
        </div>
      </UiCard>
    </>
  )
}

BulkCloneOptions.propTypes = {
  handleOptions: PropTypes.func
}
