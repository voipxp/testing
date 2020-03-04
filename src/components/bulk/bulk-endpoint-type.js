import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiLoading, UiDataTable } from '@/components/ui'
import { Button } from 'rbx'

const columns = [
  {
    key: 'groupId',
    label: 'Group Id'
  },
  {
    key: 'groupName',
    label: 'Group Name'
  },
  {
    key: 'userLimit',
    label: 'User Limit'
  },
  {
    key: 'serviceProviderId',
    label: 'Service Provider'
  }
]

export const BulkEndpointType = (props) => {
  const endpointType = 'trunkAddressing'
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)

  useEffect( () => {
    const tempData = {...props.initialData, 'endpointType': endpointType}
    props.handleWizData(tempData)
    setDisableNextButton(false)
  }, [])

  return (
    <>
     <UiCard title="Endpoint Type">
     <b>Endpoint Type</b> : {endpointType}
     </UiCard>

      <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
              color="link"
              onClick={ props.setToNext}
              disabled = { isNextBtnDisabled }
            >
              Next
        </Button>
      </div>
    </>
	)
}

BulkEndpointType.propTypes = {
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
