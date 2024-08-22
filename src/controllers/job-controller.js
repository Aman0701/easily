import path from "path";
import userModel from "../models/user-model.js";
import JobModel from "../models/job-model.js";
import fs from 'fs';
import getPagination from "./pagenation-controller.js";
import DateModel from "../models/dateModel.js";
import VerifyEmail from "./verifyEmail-controller.js";

/**
 * JobController class
 * Handles job-related operations
 */
export default class JobController {
  /**
   * Get the new job page
   */
  getNewJob(req, res) {
    return res.render('postJob', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: null });
  }

  /**
   * Post a new job
   */
  postnewJob(req, res) {
    const email = req.session.userEmail

    const user = userModel.getUser(email);

    if (user) {
      const { jobCategory, jobDesignation, jobLocation, salary, opening, skills, calender } = req.body;
      const companyName = user.companyName;
      const timestamp = Date.now();
      const date = DateModel.getDate(timestamp);
      const time = DateModel.getTime(timestamp);

      const [year, month, day] = calender.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      const newJob = JobModel.addJob(email, companyName, jobCategory, jobDesignation, jobLocation, salary, opening, skills, formattedDate, date, time);

      if (newJob) {
        userModel.addJob(email, newJob.jobId);
        const verifyEmail = new VerifyEmail();
        verifyEmail.sendmail(email, "Successfull!!", null, user.name, "jobpost.ejs");
        res.redirect('/jobs');
      } else {
        res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: 'No Data Found' });
      }
    }
  }

  /**
   * Apply for a job
   */
  applyJob(req, res) {
    const email = req.session.userEmail;
    const { jobId, contact } = req.body;
    const resumeUrl = 'resume/' + req.file.filename;
    const name = userModel.getUser(email).name;
    const job = JobModel.addApplicant(email, jobId, contact, resumeUrl, name);
    const addJob = userModel.addJob(email, jobId);
    const verifyEmail = new VerifyEmail();
    verifyEmail.sendmail(email, "Job Application Received!", null, name, "applyJob.ejs");
    res.redirect(`/viewDetail/${jobId}`);
  }

  /**
   * View a resume
   */
  viewResume(req, res) {
    const url = req.query.url;
    const email = req.query.email;
    const resumeUrl = path.join(path.resolve(), 'public', url);
    if (fs.existsSync(resumeUrl)) {
      const user = userModel.getUser(email);
      const company = userModel.getUser(req.session.userEmail).companyName;
      const verifyEmail = new VerifyEmail();
      verifyEmail.sendmail(email, " Application Viewed!", company, user.name, "viewjob.ejs");

      res.sendFile(resumeUrl);
    } else {
      res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: "File Not Found" });
    }
  }

  /**
   * Download a resume
   */
  downloadResume(req, res) {
    const url = req.query.url;
    const email = req.query.email;
    const resumeUrl = path.join(path.resolve(), 'public', url);
    if (fs.existsSync(resumeUrl)) {
      res.download(resumeUrl);
      const user = userModel.getUser(email);
      const company = userModel.getUser(req.session.userEmail).companyName;
      const verifyEmail = new VerifyEmail();
      verifyEmail.sendmail(email, " Application Downloaded!", company, user.name, "downloadjob.ejs");

    } else {
      res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: "File Not Found" });
    }
  }

  /**
   * Delete a job
   */
  deleteJob(req, res) {
    const jobId = req.params.id;
    const error = JobModel.deleteJob(jobId);
    const email = req.session.userEmail;

    if (error) {
      res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: error });
    } else {
      userModel.deleteJob(email, jobId);
      const job = JobModel.getAllJob();
      const pages = getPagination(1, job);
      res.render('jobs', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, jobs: job, pages: pages });
    }
  }

  /**
   * Get the update job page
   */
  getUpdateJob(req, res) {
    const jobId = req.params.id;
    const job = JobModel.getJob(jobId);

    res.render('updateJob', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, jobs: job });
  }

  /**
   * Update a job
   */
  updateJob(req, res) {
    const { jobId, jobCategory, jobDesignation, jobLocation, salary, opening, skills, calender } = req.body;
    const timestamp = Date.now();
    const date = DateModel.getDate(timestamp);
    const time = DateModel.getTime(timestamp);
    const error = JobModel.updateJob(jobId, jobCategory, jobDesignation, jobLocation, salary, opening, skills, calender, date, time);

    if (error) {
      res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: error });
    } else {
      res.redirect(`/viewDetail/${jobId}`);
    }
  }

  /**
   * Get search results
   */
  getSearchResult(req, res) {
    const query = req.query.q.toLowerCase();

    const data = JobModel.getSearchResult(query);

    return res.json(data);
  }

  /**
   * Get all jobs}
   */
  getAllJob(req, res) {
    const query = req.query.q.toLowerCase();
    const page = req.query.page;
    const jobs = JobModel.getSearchJob(query);
    const pages = getPagination(page, jobs);
    if (jobs.length == 0) {
      return res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: "Invalid Input" });
    } else {
      return res.render('jobs', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, jobs: jobs, page: page, query: query, totalPage: pages });
    }
  }

  /**
   * Get specific job
   */
  getSpecificJob(req, res) {
    let query = req.body.search.trim().toLowerCase();
    if (!query) {
      return res.redirect('/jobs');
    }
    const jobs = JobModel.getSearchJob(query);
    let page = req.query.page;
    if (!page) {
      page = 1;
    }
    const pages = getPagination(page, jobs);
    if (jobs.length == 0) {
      return res.render('error', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, errorMessage: "Invalid Input" });
    } else {
      return res.render('jobs', { userEmail: req.session.userEmail, name: req.session.name, designation: req.session.designation, jobs: jobs, page: page, query: query, totalPage: pages });
    }
  }
}