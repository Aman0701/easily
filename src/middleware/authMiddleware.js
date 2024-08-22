/**
 * Middleware function to authenticate user sessions.
 *
 * Checks if the user's email is present in the session.
 * If it is, calls the next middleware function in the stack.
 * If not, renders the index page with null user data.
 */
export const auth = (req, res, next) => {
    if (req.session.userEmail) {
      next();
    } else {
      res.render('index', { userEmail: null, name: null, designation: null });
    }
  }