import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import FormsTodosChange from '@/forms/items/Change'

const initialValues = {
  name: '',
  checked: false
}

const ModalsItemsCreate = ({ close, onSubmit, create, name = '', checked = false }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Create Items</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsTodosChange
        initialValues={create ? initialValues : { name, checked }}
        onSubmit={onSubmit}
      />
    </Modal.Body>
  </Modal>
)
ModalsItemsCreate.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  create: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired
}

export default ModalsItemsCreate
