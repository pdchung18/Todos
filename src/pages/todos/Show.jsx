import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import TodosContext, { api } from '@/contexts/Todos'
import Loading from '@/components/Loading'
import ModalsTodosCreate from '@/modals/todos/Create'
import ModalsItemsCreate from '@/modals/items/Create'

class PagesTodosShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      itemModalMode: 'create',
      editItem: {
        index: null,
        name: '',
        checked: false
      },
      showModalsTodosCreate: false,
      showModalsItemsCreate: false
    }

    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.openTodoModal = this.openTodoModal.bind(this)
    this.closeTodoModal = this.closeTodoModal.bind(this)
    this.deleteTodos = this.deleteTodos.bind(this)
    this.openItemsModal = this.openItemsModal.bind(this)
    this.closeItemsModal = this.closeItemsModal.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.handleEditItems = this.handleEditItems.bind(this)
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

  handleEditSubmit(values) {
    const { id } = this.props.match.params
    const { updateTodo } = api(this.context.dispatch)

    updateTodo({ id, ...values }).then(() => {
      this.closeTodoModal()
    })
  }

  handleCheckboxChange(e, index) {
    const { title, TodoItems } = this.context.todos.show.todo
    const { id } = this.props.match.params
    const { updateTodo } = api(this.context.dispatch)
    const todoList = [...TodoItems]
    const item = { ...todoList[index] }
    item.checked = e.target.checked
    todoList[index] = item
    updateTodo({ id, title, TodoItems: todoList }).then(() => {})
  }

  openTodoModal() {
    this.setState({ showModalsTodosCreate: true })
  }

  closeTodoModal() {
    this.setState({ showModalsTodosCreate: false })
  }

  deleteTodos() {
    const { id } = this.props.match.params
    const { deleteTodo } = api(this.context.dispatch)
    deleteTodo({ id }).then(() => {
      const { history: { replace } } = this.props
      replace('/todos')
    })
  }

  openItemsModal(mode) {
    this.setState({ itemModalMode: mode })
    this.setState({ showModalsItemsCreate: true })
  }

  closeItemsModal() {
    this.setState({ showModalsItemsCreate: false })
  }

  deleteItem(index) {
    const { id } = this.props.match.params
    const { updateTodo } = api(this.context.dispatch)
    const { title, TodoItems } = this.context.todos.show.todo
    const todoList = [...TodoItems]
    todoList.splice(index, 1)
    updateTodo({ id, title, TodoItems: todoList }).then(() => {})
  }

  handleEditItems(values) {
    const { id } = this.props.match.params
    const { updateTodo } = api(this.context.dispatch)
    const { title, TodoItems } = this.context.todos.show.todo
    const todoList = [...TodoItems]
    if(this.state.editItem.index !== null){  
      todoList[this.state.editItem.index] = values
    }
    else{
      todoList.push(values)
    }
    updateTodo({ id, title, TodoItems: todoList }).then(() => {
      this.closeItemsModal()
    })
  }

  renderShow() {
    const { show } = this.context.todos

    if (show === undefined) return <Loading />
    if (show === null) return <h2>Not Found</h2>
    return (
      <>
        <h2 className="my-3">
          {show.todo.id} | {show.todo.title}
        </h2>
        <div className="list-group">
          {show.todo.TodoItems.map((item, index) => (
            <div
              key={item.id}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                item.checked ? "text-decoration-through" : ""
              }`}
            >
              <input
                type="checkbox"
                defaultChecked={item.checked}
                onChange={(e) => this.handleCheckboxChange(e, index)}
              />
              {item.name}
              <div>
                <button
                  className="btn btn-primary mr-2"
                  type="button"
                  onClick={() => {
                    this.setState({
                      editItem: {
                        index: index,
                        name: item.name,
                        checked: item.checked,
                      },
                    });
                    this.openItemsModal("edit");
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mr-2"
                  type="button"
                  onClick={() => this.deleteItem(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  render() {
    const { editItem, itemModalMode, showModalsTodosCreate, showModalsItemsCreate } = this.state
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
          <button
            className="btn btn-success mb-3 mr-2"
            type="button"
            onClick={() => this.openItemsModal('create')}
          >
            Add Item
          </button>
          <button
            className="btn btn-primary mb-3 mr-2"
            type="button"
            onClick={this.openTodoModal}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mb-3"
            type="button"
            onClick={this.deleteTodos}
          >
            Delete
          </button>
          {this.renderShow()}
        </main>
        {showModalsTodosCreate && (
          <ModalsTodosCreate
            close={this.closeTodoModal}
            onSubmit={this.handleEditSubmit}
            title={show.todo.title}
            TodoItems={show.todo.TodoItems}
          />
        )}
        {showModalsItemsCreate && (
          <ModalsItemsCreate
            close={this.closeItemsModal}
            onSubmit={this.handleEditItems}
            name={editItem.name}
            checked={editItem.checked}
            create={itemModalMode === 'create'}
          />
        )}
      </div>
    )
  }
}

PagesTodosShow.contextType = TodosContext
PagesTodosShow.propTypes = {
  match: PropTypes.shape().isRequired
}

export default PagesTodosShow
