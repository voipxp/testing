import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { UiLoadingCard } from '@/components/ui'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { CreateAutoAttendantProfile } from './create-auto-attendant-profile'
import { CreateAutoAttendantMain } from './create-auto-attendant-main'
import { CreateAutoAttendantLast } from './create-auto-attendant-last'

const StyledDiv = styled.div`
  overflow: inherit;
`

export const CreateAutoAttendant = ({ match }) => {
  const { groupId, serviceProviderId } = match.params
  const [loading, setLoading] = React.useState(true)
  const [profileSlide, setProfileSlide] = React.useState(true)
  const [hoursSlide, setHoursSlide] = React.useState(false)
  const [lastSlide, setLastSlide] = React.useState(false)

  const next = () => {
    setProfileSlide(false)
    setHoursSlide(true)
  }

  const completeNextFlow = () => {
    setProfileSlide(false)
    setHoursSlide(false)
    setLastSlide(true)
  }

  React.useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <StyledDiv>
      <AppBreadcrumb>
        <Breadcrumb.Item
          href={`#!/groups/${serviceProviderId}/${groupId}/autoAttendants/`}
        >
          Auto Attendant
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Auto Attendant</Breadcrumb.Item>
      </AppBreadcrumb>
      {loading ? (
        <UiLoadingCard />
      ) : profileSlide ? (
        <CreateAutoAttendantProfile
          onSubmit={next}
          groupId={groupId}
          serviceProviderId={serviceProviderId}
        />
      ) : hoursSlide ? (
        <CreateAutoAttendantMain
          completeNextFlow={completeNextFlow}
          groupId={groupId}
          serviceProviderId={serviceProviderId}
        />
      ) : lastSlide ? (
        <CreateAutoAttendantLast
          groupId={groupId}
          serviceProviderId={serviceProviderId}
        />
      ) : null}
    </StyledDiv>
  )
}

CreateAutoAttendant.propTypes = { match: PropTypes.object.isRequired }
