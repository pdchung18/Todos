import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import FormsTodosChange from '@/forms/todos/Change'

const initialValues = {
  title: '',
}

const ModalsTodosCreate = ({ close, onSubmit, title = '', TodoItems = [] }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Create Todo</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsTodosChange
        initialValues={title ? { title, TodoItems } : initialValues}
        onSubmit={onSubmit}
      />
    </Modal.Body>
  </Modal>
)

ModalsTodosCreate.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  TodoItems: PropTypes.shape([])
}

export default ModalsTodosCreate
