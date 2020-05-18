import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { UiLoading, UiDataTable, UiCheckbox, UiCard, UiButton } from '@/components/ui'
import { useAlerts } from '@/store/alerts'
import scaReportApi from '@/api/groups/shared-call-appearances-report'
import _ from 'lodash'
import { CSVLink } from "react-csv"

/* eslint-disable react/display-name */
const columns = [
  {
    key: "userId",
    label: 'User Id'
  },
  {
    key: "lastName",
    label: 'Last Name'
  },
  {
    key: "firstName",
    label: 'First Name'
  },
  {
    key: "phoneNumber",
    label: 'Phone Number'
  },
  {
    key: "maxAppearances",
    label: 'Max Appearances'
  },
  {
    key: "deviceLevel",
    label: 'Device Level'
  },
  {
    key: "deviceName",
    label: 'Device Name'
  },
  {
    key: "deviceType",
    label: 'Device Type'
  },
  {
    key: "linePort",
    label: 'Line Port'
  },
  {
    key: "isActive",
    label: 'Activated',
    render: row => <UiCheckbox isChecked={row.isActive} />
  },
  {
    key: "macAddress",
    label: 'MAC Address'
  }
]

export const GroupSharedCallAppearancesReport = ({ match }) => {
  const { alertDanger } = useAlerts()
  const { serviceProviderId, groupId } = match.params
  const [scaReports, setScaReports] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const prepareSCAReport = (scaData) => {
    const tempScaData = []
    scaData.forEach((user, i) => {
      const mergedUser = {...user.profile, ...user.data}
      if(!_.isEmpty(user.data.endpoints)) {
          user.data.endpoints.forEach((endpoint, j) => {
          mergedUser['uniqKey'] = user.profile.userId + j
          tempScaData.push({...mergedUser, ...endpoint})
        })
      } else {
        mergedUser['uniqKey'] = user.profile.userId + i
        tempScaData.push({...mergedUser})
      }
    })
    return tempScaData
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scaData = await scaReportApi.load(serviceProviderId, groupId)
        setScaReports(prepareSCAReport(scaData.users))
      } catch (error) {
        setScaReports([])
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [serviceProviderId, groupId, alertDanger])

  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item>User Shared Call Appearances</Breadcrumb.Item>
      </AppBreadcrumb>
      {loading ? (
        <UiLoading />
      ) : (
        <UiCard
          title="User Shared Call Appearances"
          buttons={
          <>
          <CSVLink
            data={scaReports}
            headers={columns}
            filename={"user-shared-call-appearances.csv"}>
          <UiButton
              color="link"
              icon="download"
              size="small"
            />
            </CSVLink>
          </>
        }
        >
          <UiDataTable
            columns={columns}
            rows={scaReports}
            rowKey="uniqKey" />
        </UiCard>
      )}
    </>
  )
}

GroupSharedCallAppearancesReport.propTypes = {
  match: PropTypes.object.isRequired
}
