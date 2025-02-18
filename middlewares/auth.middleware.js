import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

import { JWT_SECRET } from '../config/env.js';

//someone is making a request get users details -> authorize middle -> verify token -> if valid -> next -> get user details

const authorize = async (req, res, next) => {
  try {
		let token;
		//Check if token exists
		if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
			token = req.headers.authorization.split(' ')[1];
		}
		//
		if(!token) return res.status(401).json({message: 'Unauthorized'});
		//Verify token
		const decoded = jwt.verify(token, JWT_SECRET);
		//Check if user exists
		const user = await User.findById(decoded.userId);
		
		if(!user) return res.status(401).json({message: 'Unauthorized'});

		//Set user in req object
		req.user = user;
		//Continue to the next middleware
		next();

  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
      error: error.message,
    });
  }
}

export default authorize;