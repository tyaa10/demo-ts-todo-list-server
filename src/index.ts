import express from 'express'
import cors from 'cors'
import repository from './InMemoryRepository'
import TodoItemModel from './TodoItemModel'

const app = express()

app.use((req, res, next) => { next(); }, cors({maxAge: 84600}))
app.use('/api', express.json({'limit':'10mb'}))

app.route('/api/items')
  .get(function (req, res) {
    res.send(`{"data": ${JSON.stringify(repository.todoList)}}`)
  })
  .post(function (req, res) {
    const newItem = req.body
    const newServerTodoItemModel =
      new TodoItemModel(newItem.title, newItem.description, newItem.date)
    repository.todoList.push(newServerTodoItemModel)
    res.status(201).json(
      {
        "message": "a new todo item was created",
        "data": {"id": newServerTodoItemModel.id}
      }
    )
  })

app.route('/api/items/:id')
  .put(function (req, res) {
    const currentTodo =
      repository.todoList.find(todo => todo.id === Number(req.params.id)) ?? null
    if (currentTodo) {
      const updatedItem = req.body
      currentTodo.title = updatedItem.title
      currentTodo.description = updatedItem.description
      currentTodo.date = updatedItem.date
      currentTodo.done = updatedItem.done
    }
    res.status(200).send()
  })
  .delete(function (req, res) {
    repository.todoList.splice(
      repository.todoList.findIndex(a => a.id === Number(req.params.id)),
      1
    )
    res.status(204).send()
  })

  app.listen(4000, 'localhost', function () {
    console.log(`running on http://localhost:4000`);
  })