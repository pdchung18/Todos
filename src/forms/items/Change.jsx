import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

const RenderForm = ({ errors, touched, isSubmitting }) => (
  <Form>
    <div className="form-group">
      <Field
        id="name"
        className={`form-control ${
          errors.name && touched.name ? ' is-invalid' : ''
        }`}
        name="name"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="name" />
      <div className="form-group custom-control custom-checkbox">
        <Field
          id="checked"
          className="custom-control-input"
          name="checked"
          type="checkbox"
        />
        <label
          className="custom-control-label"
          htmlFor="checked"
        >
          Completed
        </label>
        <ErrorMessage
          component="div"
          className="invalid-feedback"
          name="checked"
        />
      </div>
    </div>

    <button className="btn btn-success" type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </Form>
)
RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

const todoChangeSchema = yup.object().shape({
  name: yup.string().required('Required'),
  checked: yup.boolean().required('Required')
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
