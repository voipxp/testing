import React from 'react'
import {
  UiLoadingCard,
  UiMenu,
  UiCard,
  UiButton,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiSection,
  UiListItem,
  UiFormField
} from '@/components/ui'
import { Menu, Column } from 'rbx'
import styled from 'styled-components'
import { Field, Control, Button, Input, Select, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const NewServiceProviderName = () => {
	return <>
    <UiSection>
      <Column.Group>
        <Column>
          <UiFormField label="New Service Provider Name">
            <Input
              type="text"
              name="newPhoneNumber"
            />
          </UiFormField>
          </Column>
        </Column.Group>
      </UiSection>
  </>
}

export default NewServiceProviderName