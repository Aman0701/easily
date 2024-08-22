import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import userController from './src/controllers/user-controller.js';
import JobController from './src/controllers/job-controller.js';
import { auth } from './src/middleware/authMiddleware.js';
import { uploadFile } from './src/middleware/fileUploadMiddleware.js';
import validateEmail from './src/middleware/checkEmail-middleware.js';
import checkDesignation from './src/middleware/checkdesignation-middleware.js';
import validName from './src/middleware/checkName-middleware.js';
import validPassword from './src/middleware/verifyPassword-middleware.js';
import validCollege from './src/middleware/checkCollege-middleware.js';
import postJob from './src/middleware/postJob-middleware.js'

const server = new express();

/**
 * Sets up the express server to parse URL-encoded bodies
 */
server.use(express.urlencoded({ extended: true }));

/**
 * Sets the view engine to EJS
 */
server.set('view engine', 'ejs');

/**
 * Sets the views directory to the 'src/views' folder
 */
server.set("views", path.join(path.resolve(), 'src', 'views'));

/**
 * Enables EJS layouts
 */
server.use(ejsLayouts);

/**
 * Serves static files from the 'public' folder
 */
server.use(express.static('public'));

/**
 * Parses cookies
 */
server.use(cookieParser());

/**
 * Sets up the session middleware
 */
server.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

/**
 * Serves static files from the 'src/views' folder
 */
server.use(express.static('src/views'));

const UserController = new userController();

/**
 * GET / - Redirects to the jobs page
 */
server.get('/', auth, UserController.getJobs);

/**
 * GET /jobs - Displays the jobs page
 */
server.get('/jobs', auth, UserController.getJobs);

/**
 * GET /viewDetail/:id - Displays the job details page
 */
server.get('/viewDetail/:id', auth, UserController.getViewDetail);

/**
 * GET /login - Displays the login page
 */
server.get('/login', UserController.getLogin);

/**
 * GET /register - Displays the registration page
 */
server.get('/register', UserController.getRegister);

const jobController = new JobController();

/**
 * GET /postJob - Displays the post job page
 */
server.get('/postJob', auth, jobController.getNewJob);

/**
 * GET /applicant/:id - Displays the applicant details page
 */
server.get('/applicant/:id', auth, UserController.getApplicant);

/**
 * GET /logout - Logs out the user
 */
server.get('/logout', auth, UserController.getLogout);

/**
 * POST /register - Registers a new user
 */
server.post('/register', validName, validateEmail, checkDesignation, validCollege, validPassword, UserController.postRegister);

/**
 * POST /login - Logs in an existing user
 */
server.post('/login', UserController.postLogin);

/**
 * POST /recruiterRegister - Registers a new recruiter
 */
server.post('/recruiterRegister', validName, validateEmail, validCollege, validPassword, UserController.postRecruiterRegister);

/**
 * POST /jobseekerRegister - Registers a new job seeker
 */
server.post('/jobseekerRegister', validName, validateEmail, validCollege, validPassword, UserController.postJobseekerRegister);

/**
 * POST /postJob - Creates a new job posting
 */
server.post('/postJob', auth, postJob, jobController.postnewJob);

/**
 * POST /applyJob - Applies for a job
 */
server.post('/applyJob', auth, uploadFile.single('resume'), jobController.applyJob);

/**
 * GET /view - Displays the resume view page
 */
server.get('/view', auth, jobController.viewResume);

/**
 * GET /download - Downloads the resume
 */
server.get('/download', auth, jobController.downloadResume);

/**
 * DELETE /deleteJob/:id - Deletes a job posting
 */
server.delete('/deleteJob/:id', auth, jobController.deleteJob);

/**
 * GET /updateJob/:id - Displays the update job page
 */
server.get('/updateJob/:id', auth, jobController.getUpdateJob);

/**
 * POST /updatePostJob - Updates a job posting
 */
server.post('/updatePostJob', auth, postJob, jobController.updateJob);

/**
 * GET /getJobseekerMyJob - Displays the job seeker's my jobs page
 */
server.get('/getJobseekerMyJob', auth, UserController.getJobseekerMyJob);

/**
 * GET /getRecruiterMyJob - Displays the recruiter's my jobs page
 */
server.get('/getRecruiterMyJob', auth, UserController.getRecruiterMyJob);

/**
 * GET /search - Displays the search results page
 */
server.get('/search', auth, jobController.getSearchResult);

/**
 * GET /searchJob - Displays the search job page
 */
server.get('/searchJob', auth, jobController.getAllJob);

/**
 * POST /searchJob - Searches for a specific job
 */
server.post('/searchJob', auth, jobController.getSpecificJob);

/**
 * POST /verifyotp - Verifies the OTP
 */
server.post('/verifyotp', UserController.VerifyOtp);

/**
 * 404 error handler
 */
server.use((req, res, next) => {
  res.status(404).render('error', { errorMessage: "Path not found" });
});

/**
 * Starts the server on port 5000
 * @example
 * server.listen(5000);
 */
server.listen(5000);

console.log("server is running on 5000");