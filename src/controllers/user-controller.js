import path from "path";
import userModel from "../models/user-model.js";
import JobModel from "../models/job-model.js";
import getPagination from "./pagenation-controller.js";
import VerifyEmail from "./verifyEmail-controller.js";
import OtpModel from "../models/otpModel.js";

export default class userController {
  /**
   * Get all jobs
   */
  getJobs(req, res) {
    const allJobs = JobModel.getAllJob();
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    const allPage = getPagination(page, allJobs);
    return res.render('jobs', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, jobs: allJobs, totalPage: allPage, query: null, page: page });
  }

  /**
   * Get job details
   */
  getViewDetail(req, res) {
    const jobId = req.params.id;
    const job = JobModel.getJob(jobId);
    console.log(req.session.userEmail);
    console.log(req.session.name);
    console.log (req.session.designation);
    if (job) {
      res.render('jobsDetail', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, jobs: job });
    } else {
      res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: "NO job found" });
    }
  }

  /**
   * Get login page
   */
  getLogin(req, res) {
    res.render('login', { userEmail: req.session.userEmail, name: req.session.name });
  }

  /**
   * Get register page
   */
  getRegister(req, res) {
    res.render('register', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: null });
  }

  /**
   * Verify OTP
   */
  VerifyOtp(req, res) {
    const { email, otp } = req.body;
  
    
    
    if (req.cookies.otp != otp) {
      return res.render('error', { errorMessage: "OTP EXPIRED PLEASE REGISTER AGAIN!!", userEmail: req.session.userEmail, name: req.session.name });
    }
    res.clearCookie('otp');
    const user = OtpModel.getUser(email);
    OtpModel.delete(user);
    if (!user) {
      return res.render('error', { errorMessage: "USER NOT FOUND!!", userEmail: req.session.userEmail, name: req.session.name });
    }
    if (user.otp != otp) {
      return res.render('error', { errorMessage: "INVALID OTP", userEmail: req.session.userEmail, name: req.session.name });
    }
    const newUser = userModel.addUser(user);
    if (!newUser) {
      return res.render('error', { errorMessage: "Something went wrong, Please try again!!", userEmail: req.session.userEmail, name: req.session.name });
    }
    const verifyEmail = new VerifyEmail();
    verifyEmail.sendmail(email, "Registration Successfull!", null, newUser.name, "welcome.ejs");
    res.render('login', { userEmail: req.session.userEmail, name: req.session.name });
  }

  /**
   * Get applicants for a job
   */
  getApplicant(req, res) {
    const jobId = req.params.id;
    const job = JobModel.getJob(jobId);
    res.render('applicant', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, jobs: job });
  }

  /**
   * Logout
   */
  getLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  }

  /**
   * Register user
   */
  postRegister(req, res) {
    const { name, email, designation, college, company, password } = req.body;
    const otp = OtpModel.generateOTP();
    const user = OtpModel.addUser(name, email, designation, college, company, password, otp);
    if (!user) {
      return res.render('error', { errorMessage: "Something went wrong,Please try again!" });
    }
    const verifyEmail = new VerifyEmail();
    verifyEmail.sendmail(email, "OTP for Verifying Email", otp, name, "otp.ejs");
    res.cookie('otp', otp, { maxAge: 8 * 60 * 1000, httpOnly: true });
    res.render('otp', { email: email, msg: "An OTP is Send to your Email Id" })
  }

  /**
   * Login user
   */
  postLogin(req, res) {
    const { email, password } = req.body;
    const validUser = userModel.verifyUser(email, password);
    if (validUser) {
      const user = userModel.getUser(email);
      req.session.userEmail = user.email;
      req.session.name = user.name;
      req.session.designation = user.designation;
      res.redirect('/jobs');
    } else {
      res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: "Invalid Credentials" });
    }
  }

  /**
   * Register recruiter
   */
  postRecruiterRegister(req, res) {
    const { name, email, college, company, password } = req.body;
    const designation = 'recruiter';
    const otp = OtpModel.generateOTP();
    const user = OtpModel.addUser(name, email, designation, college, company, password, otp);
    if (!user) {
      return res.render('error', { errorMessage: "Something went wrong,Please try again!" });
    }
    const verifyEmail = new VerifyEmail();
    verifyEmail.sendmail(email, "OTP for Verifying Email", otp, name, "otp.ejs");
    res.cookie('otp', otp, { maxAge: 8 * 60 * 1000, httpOnly: true });
    res.render('otp', { email: email, msg: "An OTP is Send to your Email Id" })
  }

  /**
   * Register jobseeker
   */
  postJobseekerRegister(req, res) {
    const { name, email, college, company, password } = req.body;
    const designation = 'jobseeker';
    const otp = OtpModel.generateOTP();
    const user = OtpModel.addUser(name, email, designation, college, company, password, otp);
    if (!user) {
      return res.render('error', { errorMessage: "Something went wrong,Please try again!" });
    }
    const verifyEmail = new VerifyEmail();
    verifyEmail.sendmail(email, "OTP for Verifying Email", otp, name, "otp.ejs");
    res.cookie('otp', otp, { maxAge: 8 * 60 * 1000, httpOnly: true });
    res.render('otp', { email: email, msg: "An OTP is Send to your Email Id" })
  }

  /**
   * Get jobseeker's my jobs
   */
  getJobseekerMyJob(req, res) {
    const email = req.session.userEmail;
    const user = userModel.getJobseekerMyJob(email);
    const jobs = JobModel.getFilteredJob(user.job);
    if (jobs.length == 0) {
      return res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: "No Job Applied" });
    } else {
      res.render('jobseekerMyJob', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, jobs: jobs });
    }
  }

  /**
   * Get recruiter's my jobs
   */
  getRecruiterMyJob(req, res) {
    const email = req.session.userEmail;
    const user = userModel.getJobseekerMyJob(email);
    const jobs = JobModel.getFilteredJob(user.job);
    if (jobs.length == 0) {
      return res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: "No Job Posted" });
    } else {
      res.render('recruiterMyJob', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, jobs: jobs });
    }
  }
}