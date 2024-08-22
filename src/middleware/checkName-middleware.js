/**
 * Validates the 'name' field in the request body.
 * If the field is empty, it returns an error message to the user.
 */
import { body,validationResult } from "express-validator";
const validName = async (req, res, next) => {
    const url = req.originalUrl;
    const rules = [
      body('name').notEmpty().withMessage("Name is Required"),
    ];
  
    await Promise.all(rules.map(rule => rule.run(req)));
  
    var errors = await validationResult(req);
  
    if (!errors.isEmpty()) {
      if (url == '/register') {
        return res.render('register', { errorMessage: errors.array()[0].msg });
      } else {
        return res.render('error', { errorMessage: errors.array()[0].msg });
      }
    }
    next();
  };
  
  export default validName;