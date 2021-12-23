import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'

const RenderForm = ({ errors, touched, isSubmitting }) => (
  <Form>
    <div className="form-group">
      <label htmlFor="title">Title</label>
      <Field
        id="title"
        className={`form-control ${(errors.title && touched.title ? ' is-invalid' : '')}`}
        name="title"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="title" />
    </div>

    <button className="btn btn-success" type="submit" disabled={isSubmitting}>Submit</button>
  </Form>
)
RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

const todoChangeSchema = yup.object().shape({
  title: yup.string().required('Required'),
})

const FormsTodosChange = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={todoChangeSchema}
    onSubmit={onSubmit}
    component={RenderForm}
  />
)
FormsTodosChange.propTypes = {
  initialValues: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default FormsTodosChange
