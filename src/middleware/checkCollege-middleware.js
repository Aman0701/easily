/**
 * Middleware function to validate if college or company is provided in the request body.
 * If neither college nor company is provided, it renders an error page with a message.
 * If either college or company is provided, it calls the next middleware function.
 */
const validCollege = (req, res, next) => {
    const college = req.body.college;
    const company = req.body.company;
    const url = req.originalUrl;
    if (!company && !college) {
      if (url === '/register') {
        res.render('register', { errorMessage: "College or Company required" });
      } else {
        res.render('error', { errorMessage: "College or Company required" });
      }
    } else {
      next();
    }
  };
  
  export default validCollege;