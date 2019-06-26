import React from 'react'
import styled from 'styled-components'
import { UiLoadingCard } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import { CreateAutoAttendantProfile } from './create-auto-attendant-profile'
import { CreateAutoAttendantMain } from './create-auto-attendant-main'
import { CreateAutoAttendantLast } from './create-auto-attendant-last'

const StyledDiv = styled.div`
  overflow: inherit;
`

export const CreateAutoAttendant = () => {
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
      {!lastSlide ? <AppBreadcrumb /> : null}
      {loading ? (
        <UiLoadingCard />
      ) : profileSlide ? (
        <CreateAutoAttendantProfile onSubmit={next} />
      ) : hoursSlide ? (
        <CreateAutoAttendantMain completeNextFlow={completeNextFlow} />
      ) : lastSlide ? (
        <CreateAutoAttendantLast />
      ) : null}
    </StyledDiv>
  )
}
