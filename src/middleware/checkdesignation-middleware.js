/**
 * Middleware function to check if the 'designation' field is present in the request body.
 * If the field is missing, it renders an error page with a custom error message.
 * If the field is present, it calls the next middleware function in the stack.
 */
const checkDesignation = (req, res, next) => {
    const designation = req.body.designation;
    const url = req.originalUrl;
    if (!designation) {
      if (url === '/register') {
        res.render('register', { errorMessage: "Designation Required" });
      } else {
        res.render('error', { errorMessage: "Designation Required" });
      }
    } else {
      next();
    }
  };
  
  export default checkDesignation;