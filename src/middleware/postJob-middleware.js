/**
 * Validates the request body for posting a job.
 * // Call the postJob function
 * postJob(req, res, next);
 * 
 * // If all validation passes, the next middleware function will be called
 * // Otherwise, an error message will be rendered
 */
const postJob = (req, res, next) => {
    const { jobCategory, jobDesignation, jobLocation, salary, opening, skills, calender } = req.body;
  
    if (!jobCategory) {
      return res.render('postjob', { errorMessage: "Please select Job Category" });
    }
    if (!jobDesignation) {
      return res.render('postjob', { errorMessage: "Please select Job Designation" });
    }
    if (!jobLocation) {
      return res.render('postjob', { errorMessage: "Please Enter Job Location" });
    }
    if (!salary || salary < 0) {
      return res.render('postjob', { errorMessage: "Please Enter Proper Salary" });
    }
    if (!opening || opening <= 0) {
      return res.render('postjob', { errorMessage: "Please Enter Proper openings" });
    }
    if (skills.length == 0) {
      return res.render('postjob', { errorMessage: "Please select Some Skills" });
    }
    const today = new Date().toISOString().split('T')[0];
    if (!calender || calender <= today) {
      return res.render('postjob', { errorMessage: "Please select the correct date" });
    }
    next();
  }
  
  export default postJob;