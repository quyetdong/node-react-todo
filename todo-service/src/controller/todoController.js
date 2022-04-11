import * as TodoService from "../service/todoService.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await TodoService.getAllTodos();
    res.status(200).json({
      todos,
    });
  } catch (error) {
    res.status(400);
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = await TodoService.createTodo(req.body);
    res.status(200).json({
      todo,
    });
  } catch (error) {
    res.status(400);
  }
}
