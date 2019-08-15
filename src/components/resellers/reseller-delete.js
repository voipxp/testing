// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import { useAlerts } from '@/store/alerts'
// import { useUi } from '@/store/ui'
// import apiResellers from '@/api/resellers'
// import { UiCard, UiCardModal, UiButton } from '@/components/ui'

// export const ResellerDelete = ({ match, history }) => {
//   const { resellerId } = match.params
//   const { alertWarning, alertDanger } = useAlerts()
//   const { showLoadingModal, hideLoadingModal } = useUi()
//   const [showConfirm, setShowConfirm] = useState(false)

//   const remove = () => {
//     setShowConfirm(false)
//     destroy(resellerId)
//   }

//   async function destroy(resellerId) {
//     showLoadingModal()
//     try {
//       await apiResellers.destroy(resellerId)
//       alertWarning('Reseller Deleted')
//       history.push('/system/resellers')
//     } catch (error) {
//       alertDanger(error)
//     } finally {
//       hideLoadingModal()
//     }
//   }

//   return (
//     <>
//       <UiCard title="Delete Reseller">
//         <UiButton
//           style={{ float: 'right' }}
//           icon="delete"
//           color="danger"
//           onClick={() => setShowConfirm(true)}
//         >
//           Delete
//         </UiButton>
//         <p className="subtitle">Click the delete button to permanently remove this Reseller.</p>
//       </UiCard>

//       <UiCardModal
//         title="Please Confirm"
//         isOpen={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onDelete={remove}
//       >
//         <blockquote>Are you sure you want to Remove this Reseller?</blockquote>
//       </UiCardModal>
//     </>
//   )
// }

// ResellerDelete.propTypes = {
//   match: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired
// }
