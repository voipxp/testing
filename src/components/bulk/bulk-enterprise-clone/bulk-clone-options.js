import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiInputCheckbox, UiListItem, UiLoading, UiDataTable } from '@/components/ui'
import { Button, Select, Input } from 'rbx'
import groupDomainAPI from '@/api/groups/domains'
import { useAlerts } from '@/store/alerts'
import _ from 'lodash'


export const BulkCloneOptions = (props) => {
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
      name: 'EnterpriseVoiceVPN',
      label: 'enterpriseVoiceVPN',
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

  const [options, setOptions] = React.useState([...cloneOptions])

  useEffect( () => {
    props.handleOptions(options)
  }, [])

  const handleInput = (event, index) => {
    const value = (event.target.type === "checkbox") ? event.target.checked : event.target.value
    const name = event.target.name
    const newOptions = [...options]
    if(name !== "services" && name !== "servicePacks") {
      newOptions[index]['value'] = value
      setOptions(newOptions)
      props.handleOptions(options)
    }
  }

  const prepareOptions = (
    options.map( (el, index) => {
        return (
          <li key={el.name} style={{padding: '10px'}}>
            <UiInputCheckbox
            key={el.name}
					  name={el.name}
					  label={el.label}
					  checked={el.value}
            onChange={(event) => handleInput(event, index)}
					/>
          </li>
        )
    } )
  )

  return (
    <>
     <UiCard title="Clone Options">
        <div className="field has-addons">
          <ul>{ prepareOptions }</ul>
        </div>
     </UiCard>

      {/* <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
              color="success"
              onClick={ props.complete}
              disabled = { isNextBtnDisabled }
            >
              Save
        </Button>
      </div> */}
    </>
	)
}

BulkCloneOptions.propTypes = {
  handleOptions: PropTypes.func
}