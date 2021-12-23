import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import TodosContext, { api } from '@/contexts/Todos'
import Loading from '@/components/Loading'
import ModalsTodosCreate from '@/modals/todos/Create'

class PagesTodosShow extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showModalsTodosCreate: false
    }

    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.deleteTodos = this.deleteTodos.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { getTodo } = api(this.context.dispatch)
    getTodo(id)
  }

  componentWillUnmount() {
    const { resetTodo } = api(this.context.dispatch)
    resetTodo()
  }

  renderShow() {
    const { show } = this.context.todos

    if (show === undefined) return <Loading />
    if (show === null) return <h2>Not Found</h2>
    return (
      <>
        <h2 className="my-3">{ show.todo.id } | { show.todo.title }</h2>
        <div className="list-group">
          {
            show.todo.TodoItems.map((item) => (
              <div
                key={item.id}
                className={`list-group-item list-group-item-action ${item.checked ? 'text-decoration-through' : ''}`}
              >
                {item.name}
              </div>
            ))
          }
        </div>
      </>
    )
  }

  handleEditSubmit(values) {
    const { id } = this.props.match.params
    const { updateTodo } = api(this.context.dispatch)

    updateTodo({ id, title: values.title }).then((resp) => {
      this.closeModal();
    })
  }

  openModal() {
    this.setState({ showModalsTodosCreate: true })
  }

  closeModal() {
    this.setState({ showModalsTodosCreate: false })
  }

  deleteTodos() {
    const { id } = this.props.match.params
    const { deleteTodo } = api(this.context.dispatch)
    deleteTodo({ id }).then((resp) => {
      const { history: { replace } } = this.props
      replace(`/todos`)
    })
  }

  render() {
    const { showModalsTodosCreate } = this.state
    const { show } = this.context.todos

    return (
      <div id="pages-todos-show" className="container">
        <header className="text-center border-bottom">
          <h1>Todo Show Page</h1>
          <div>
            <Link to="/">Home Page</Link>
            <span> | </span>
            <Link to="/todos">Todos Page</Link>
          </div>
        </header>
        <main className="text-center mt-3">
          <button className="btn btn-primary mb-3 mr-2" type="button" onClick={this.openModal}>Edit</button>
          <button className="btn btn-danger mb-3" type="button" onClick={this.deleteTodos} >Delete</button>
          { this.renderShow() }
        </main>
        { showModalsTodosCreate && <ModalsTodosCreate close={this.closeModal} onSubmit={this.handleEditSubmit} title={show.todo.title} />}
      </div>
    )
  }
}

PagesTodosShow.contextType = TodosContext
PagesTodosShow.propTypes = {
  match: PropTypes.shape().isRequired
}

export default PagesTodosShow
