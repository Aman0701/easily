
import userModel from "../models/user-model.js";

/**
 * Middleware function to validate if an email is already registered.
 * 
 * @description
 * This middleware function checks if an email is already registered in the database.
 * If the email is found, it renders an error page with a message indicating that the email is already registered.
 * If the email is not found, it calls the next middleware function in the stack.
 */
const validateEmail = async (req, res, next) => {
  const email = req.body.email; 
  const url = req.originalUrl;
  const isFound = await userModel.getUser(email);
  if (isFound) {
    if (url === '/register') {
      res.render('register', { errorMessage: "Email Already Registered. Please login or try with different email Id" });
    } else {
      res.render('error', { errorMessage: "Email Already Registered. Please login or try with different email Id" });
    }
  } else {
    next();
  }
};

export default validateEmail;