/**
 * Middleware function to validate password
 *
 * @description
 * This middleware function checks if the password meets the following criteria:
 * - Length must be between 8 and 15 characters
 * - Must contain at least 1 number
 * - Must contain at least 1 uppercase character
 *
 * If the password is invalid, it renders an error page with a specific error message.
 * If the password is valid, it calls the next middleware function in the stack.

 */
const validPassword = (req, res, next) => {
    const password = req.body.password;
    const originalUrl = req.originalUrl;
    if (password.length < 8 || password.length > 15) {
      if (originalUrl == '/register') {
        return res.render('register', { errorMessage: "Password length must be between 8 to 15 character" });
      } else {
        return res.render('error', { errorMessage: "Password length must be between 8 to 15 character" });
      }
    }
    let num = 0, upperCaseChar = 0;
  
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= '0' && password[i] <= '9') {
        num++;
      }
      if (password[i] >= 'A' && password[i] <= 'Z') {
        upperCaseChar++;
      }
    }
    if (num == 0) {
      if (originalUrl == '/register') {
        return res.render('register', { errorMessage: "Password must contain atleast 1 number" });
      } else {
        return res.render('error', { errorMessage: "Password must contain atleast 1 number" });
      }
    }
    if (upperCaseChar == 0) {
      if (originalUrl == '/register') {
        return res.render('register', { errorMessage: "Password must contain atleast 1 UpperCase character" });
      } else {
        return res.render('error', { errorMessage: "Password must contain atleast 1 UpperCase character" });
      }
    }
    next();
  }
  
  export default validPassword;