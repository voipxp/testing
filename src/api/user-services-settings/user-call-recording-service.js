import { api } from '..'

export const options = {
  recordingCallOptions: [
    { key: 'Always', name: 'Always' },
    { key: 'Never', name: 'Never' },
    { key: 'On Demand', name: 'On Demand' },
    { key: 'Always with Pause/Resume', name: 'Always with Pause/Resume' },
    { key: 'On Demand with User Initiated Start', name: 'On Demand with User Initiated Start' }
  ],
  pauseResumeNotification: [
    { key: 'None', name: 'None' },
    { key: 'Beep', name: 'Beep' },
    { key: 'Play Announcement', name: 'Play Announcement' }
  ],
  recordCallRepeatWarningToneTimerSeconds: {
    minimum: 10,
    maximum: 1800
  }
}
export function index( serviceProviderId, groupId ) {
  return api.get('bulk', { params: { serviceProviderId, groupId } })
}

export function show( userId ) {
  return api.get('/users/call-recording', { params: { userId } })
}

export function update( params ) {
  return api.put('/users/call-recording', params)
}

export function bulk( params ) {
  return api.put('bulk', params)
}

export default { index, show, update, bulk, options }



