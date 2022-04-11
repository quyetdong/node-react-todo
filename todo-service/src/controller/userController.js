import passport from 'passport';

import * as UserService from "../service/userService.js";

export const login = async (req, res) => {
  // our login logic goes here
  try {
    // get user
    const result = await UserService.getUser(req.body);

    if (result.data) {
      res.status(result.status).json(result.data);
    } else {
      res.status(result.status).send(result.message);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export const register = async (req, res) => {
  try {
    const result = await UserService.createUser(req.body);

    if (result.data) {
      res.status(result.status).json(result.data);
    } else {
      res.status(result.status).send(result.message);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAuthenticatedUser = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(400).send('User is not authenticated');
  }
};

export const welcome = (req, res) => {
  res.status(200).send('Welcome 🙌');
};
