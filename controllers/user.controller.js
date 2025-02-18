import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    //Get all users
    const users = await User.find();

    //Send response
    res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {
    next(error);
  }  
};

export const getUser = async (req, res, next) => {
  try {
      //Get a single user by id
      const user = await User.findById(req.params.id).select('-password');
  
      //if user is not found
      if(!user){
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

    //Send response
    res.status(200).json({
        success: true,
        data: user,
    });
  
  } catch (error) {
      next(error);
  }  
};