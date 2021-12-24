import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import FormsTodosChange from '@/forms/items/Change'

const initialValues = {
  title: '',
  TodoItems: [
    {
      name: '',
      checked: false
    }
  ]
}

const ModalsItemsCreate = ({ close, onSubmit, title = '', TodoItems = [] }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Create Items</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsTodosChange
        initialValues={title ? { title, TodoItems } : initialValues}
        onSubmit={onSubmit}
      />
    </Modal.Body>
  </Modal>
)
ModalsItemsCreate.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default ModalsItemsCreate
