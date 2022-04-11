import Todo from '../model/todo.js';

export const getAllTodos = async () => {
  const todos = await Todo.where('deletedAt').equals(null);
  return todos;
};

export const createTodo = async (todo) => {
  const createdTodo = await Todo.create(todo);
  return createdTodo;
};
