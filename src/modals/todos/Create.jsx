import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import FormsTodosChange from '@/forms/todos/Change'

const initialValues = {
  title: ''
}

const ModalsTodosCreate = ({ close, onSubmit, title }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Create Todo</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsTodosChange
        initialValues={!!title ? { title } : initialValues}
        onSubmit={onSubmit}
      />
    </Modal.Body>
  </Modal>
);
ModalsTodosCreate.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default ModalsTodosCreate
