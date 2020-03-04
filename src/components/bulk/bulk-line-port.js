import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiListItem, UiLoading, UiDataTable } from '@/components/ui'
import { Button, Select, Input } from 'rbx'
import groupDomainAPI from '@/api/groups/domains'
import { useAlerts } from '@/store/alerts'

export const BulkLinePort = (props) => {
  const { serviceProviderId, groupId } = props.initialData
  const [domains, setDomains] = React.useState([])
  const [domain, setDomain] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const [isNextBtnDisabled, setDisableNextButton] = React.useState(true)
  const { alertDanger } = useAlerts()

  useEffect(() => {
    const fetchDomains = async() => {
      try {
          const domains = await groupDomainAPI.domains(groupId, serviceProviderId)
          setDomain(domains.default)
          setDomains(domains)
      } catch(error) {
          //alertDanger(error)
      }
    }
    fetchDomains()
  }, [alertDanger, serviceProviderId, groupId])

  const handleDomainSelection = (event) => {
    setDomain(event.target.value)
  }

  const handleUserName = (event) => {
    setUserName(event.target.value)
  }

  useEffect( () => {
    setDisableNextButton(userName.length <= 0)
    const linePort = userName + '@' + domain
    props.handleWizData({...props.initialData, 'linePort': linePort})
  }, [userName, domain])

  // const prepareLinePort = () => {
  //   const linePort = userName + '@' + domain
  //   const tempData = {...props.initialData, 'linePort': linePort}
  //   props.handleWizData(tempData)
  // }

  return (
    <>
     <UiCard title="Line Port">
        <div className="field has-addons">
            <p style={{width: '100%'}}>
              <Input value={userName} type="text" placeholder="Username" onChange={handleUserName}/>
            </p>
            <p className="control">
              <a className="button is-static">@</a>
            </p>
            <p className="select is-fullwidth">
              {
                <Select
                  value={domain}
                  onChange={handleDomainSelection}
                >
              {
                (domains.domains)
                ?
                domains.domains.map(domain =>
                  <Select.Option key={domain} value={domain}>
                    {domain}
                  </Select.Option>
                )
                :
                ""
              }
                </Select>
              }
            </p>
          </div>
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

BulkLinePort.propTypes = {
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func,
  complete: PropTypes.func
}
