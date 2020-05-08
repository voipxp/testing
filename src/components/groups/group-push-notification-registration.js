import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { UiLoading, UiDataTable, UiCheckbox, UiCard, UiButton } from '@/components/ui'
import { useAlerts } from '@/store/alerts'
import pushNotfnApi from '@/api/groups/group-push-notification-registration'
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
    key: "inTrunkGroup",
    label: 'In Trunk Group',
    render: row => <UiCheckbox isChecked={row.inTrunkGroup} />
  },
  {
    key: "phoneNumberActivated",
    label: 'Phone Number Activated',
    render: row => <UiCheckbox isChecked={row.phoneNumberActivated} />
  },
  {
    key: "applicationId",
    label: 'Application Id'
  },
  {
    key: "applicationVersion",
    label: 'Application Version'
  },
  {
    key: "deviceOsType",
    label: 'Device Os Type'
  },
  {
    key: "registrationDate",
    label: 'Registration Date'
  }
]

const csvColumns = [
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
    key: "extension",
    label: 'Extension'
  },
  {
    key: "department",
    label: 'Department'
  },
  {
    key: "emailAddress",
    label: 'Email Address'
  },
  {
    key: "inTrunkGroup",
    label: 'In Trunk Group'
  },
  {
    key: "phoneNumberActivated",
    label: 'Phone Number Activated'
  },
  {
    key: "registrationId",
    label: 'Registration Id'
  },
  {
    key: "applicationId",
    label: 'Application Id'
  },
  {
    key: "applicationVersion",
    label: 'Application Version'
  },
  {
    key: "deviceOsType",
    label: 'Device Os Type'
  },
  {
    key: "registrationDate",
    label: 'Registration Date'
  },
  {
    key: "events",
    label: 'Events'
  },
  {
    key: "token",
    label: 'Token'
  }
]

export const GroupPushNotificationRegistration = ({ match , isBreadcrumb = true }) => {
  const { alertDanger } = useAlerts()
  const { serviceProviderId, groupId } = match.params
  const [pushNReports, setPushNReports] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const preparePushNReport = (data) => {
    const tempData = []
    data.forEach((user, i) => {
      const mergedUser = {...user.profile, ...user.data}
      if(!_.isEmpty(user.data.registrations)) {
        user.data.registrations.forEach((registration, j) => {
          mergedUser['uniqKey'] = user.profile.userId + j
          tempData.push({...mergedUser, ...registration})
        })
      } else {
        mergedUser['uniqKey'] = user.profile.userId + i
        tempData.push({...mergedUser})
      }
    })
    return tempData
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pushNotfnApi.load(serviceProviderId, groupId)
        setPushNReports(preparePushNReport(data.users))
      } catch (error) {
        setPushNReports([])
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [serviceProviderId, groupId, alertDanger])

  return (
    <>
	{(isBreadcrumb && 
      <AppBreadcrumb>
        <Breadcrumb.Item>User Push Notification Registration</Breadcrumb.Item>
      </AppBreadcrumb>
	 )}
      {loading ? (
        <UiLoading />
      ) : (
        <UiCard
          title="User Push Notification Registration"
          buttons={
          <>
          <CSVLink
            data={pushNReports}
            headers={csvColumns}
            filename={"pushNotificationRegistration.csv"}>
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
            rows={pushNReports}
            rowKey="uniqKey" />
        </UiCard>
      )}
    </>
  )
}

GroupPushNotificationRegistration.propTypes = {
  match: PropTypes.object.isRequired,
  isBreadcrumb : PropTypes.bool 
}
