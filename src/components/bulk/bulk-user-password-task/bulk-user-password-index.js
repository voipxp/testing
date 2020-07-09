import React, { useState, useEffect, useCallback } from 'react'
import { menu } from './bulk-user-password-menu'
import { BulkWizMenu } from '@/components/bulk'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

const initial = {
  serviceProviderId: '',
  groupId: '',
  users: []
}

export const BulkUserPasswordIndexBase = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search)
  const [userPasswordShareableData, setUserPasswordShareableData] = useState({ ...initial })
  const [menuTemp, setMenuTemp] = useState([...menu])

  const handleWizData = useCallback(data => {
    setUserPasswordShareableData(data)
  }, [])

  const handleSetMenu = menuData => {
    setMenuTemp(menuData)
  }

  const wizardComplete = () => {
    history.push({
      pathname: '/bulk/import',
      search: '?returnTo=' + searchParams.get('returnTo')
    })
  }

  useEffect(() => {
    const tempMenu = menuTemp.map(menu => {
      return { ...menu, completed: false }
    })
    setMenuTemp([...tempMenu])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const whenTaskIsCompleted = (task, isCompleted=false) => {
    const tempMenu = [...menuTemp].map(menu => {
      if (task === menu.name) menu.completed = isCompleted
      return menu
    })
    setMenuTemp([...tempMenu])
  }

  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item onClick={() => history.goBack()}>Bulk</Breadcrumb.Item>
        <Breadcrumb.Item>User Password</Breadcrumb.Item>
      </AppBreadcrumb>

      <BulkWizMenu
        menu={menuTemp}
        initialData={userPasswordShareableData}
        handleWizData={handleWizData}
        setMenu={menuData => handleSetMenu(menuData)}
        wizardComplete={wizardComplete}
        whenTaskIsCompleted={whenTaskIsCompleted}
        disableNextItem={true}
      />
    </>
  )
}

BulkUserPasswordIndexBase.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
}

export const BulkUserPasswordIndex = withRouter(BulkUserPasswordIndexBase)
