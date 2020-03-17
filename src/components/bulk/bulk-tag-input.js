import React from 'react'  
import  BulkTagService from '@/components/bulk/service/bulk-tag-service.js'
import PropTypes from 'prop-types'
import { 
  UiSection, 
  UiDataTable,
  UiLoading
} from '@/components/ui'

export const BulkTagInput =  ({ onSelect }) => {
  const bulkTags = BulkTagService.index() || {} 
  const columns = [
    { key: 'tag', label: 'Tag' },
    { key: 'example', label: 'Example' }
  ]
  return (
    <>
      <div className="box">
        <p>
          You may use <strong> tags </strong> to dynamically construct your user IDs.
        </p>
      </div>
      <UiSection>
        { bulkTags.length === 0 ? (
          <UiLoading />
          ) : (
            <UiDataTable
              columns={columns}
              rows={bulkTags}
              rowKey="tags"
              onClick={onSelect}
            /> 
          )
        } 
      </UiSection>
    </>
  )
}
BulkTagInput.propTypes = { 
 onSelect: PropTypes.func
}
