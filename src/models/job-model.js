let jobId = 1;

/**
 * JobModel class represents a job posting.
 */
export default class JobModel {
  constructor(email, companyName, jobCategory, jobDesignation, jobLocation, salary, opening, skills, calender, date, time) {
    this.jobId = jobId++;
    this.email = email;
    this.companyName = companyName;
    this.jobCategory = jobCategory;
    this.jobDesignation = jobDesignation;
    this.jobLocation = jobLocation;
    this.salary = salary;
    this.opening = opening;
    this.skills = skills;
    this.calender = calender;
    this.date = date;
    this.time = time;
    this.applicant = [];
    this.updated = false;
  }

  /**
   * Adds a new job to the list of jobs.
   */
  static addJob(email, companyName, jobCategory, jobDesignation, jobLocation, salary, opening, skills, calender, date, time) {
    const newJob = new JobModel(email, companyName, jobCategory, jobDesignation, jobLocation, salary, opening, skills, calender, date, time);
    jobs.unshift(newJob);

    return newJob;
  }

  /**
   * Returns the list of all jobs.
   */
  static getAllJob() {
    return jobs;
  }

  /**
   * Returns a job by its ID.
   */
  static getJob(jobId) {
    const job = jobs.find(j => j.jobId == jobId);

    return job;
  }

  /**
   * Adds an applicant to a job.
   */
  static addApplicant(email, jobId, contact, resumeUrl, name) {
    const job = jobs.find(j => j.jobId == jobId);
    const num = job.applicant.length + 1;
    const newApplicant = {
      num: num,
      name: name,
      contact: contact,
      email: email,
      resumeUrl: resumeUrl
    };
    job.applicant.push(newApplicant);
  }

  /**
   * Deletes a job by its ID.
   */
  static deleteJob(jobId) {
    const job = jobs.findIndex(j => j.jobId == jobId);

    if (job == -1) {
      return "No job found";
    } else {
      jobs.splice(job, 1);
    }
  }

  /**
   * Updates a job by its ID.
   */
  static updateJob(jobId, jobCategory, jobDesignation, jobLocation, salary, opening, skills, calender, date, time) {
    const jobIndex = jobs.findIndex(j => j.jobId == jobId);

    if (jobIndex == -1) {
      return "NO JOB FOUND";
    } else {
      jobs[jobIndex].jobCategory = jobCategory;
      jobs[jobIndex].jobDesignation = jobDesignation;
      jobs[jobIndex].jobLocation = jobLocation;
      jobs[jobIndex].salary = salary;
      jobs[jobIndex].opening = opening;
      jobs[jobIndex].skills = skills;
      jobs[jobIndex].calender = calender;
      jobs[jobIndex].date = date;
      jobs[jobIndex].time = time;
      jobs[jobIndex].updated = true;
    }
  }

  /**
   * Returns a list of jobs that match the specified IDs.
   */
  static getFilteredJob(jobIds) {
    const allJob = [];
    for (let i = 0; i < jobIds.length; i++) {
      for (let j = 0; j < jobs.length; j++) {
        if (jobIds[i] == jobs[j].jobId) {
          allJob.push(jobs[j]);
          break;
        }
      }
    }
    return allJob;
  }

  /**
   * Returns a list of search results that match the specified query.
   */
  static getSearchResult(query) {
    const result = [];
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].jobCategory.toLowerCase().includes(query)) {
        if (!result.includes(jobs[i].jobCategory)) {
          result.push(jobs[i].jobCategory);
        }
      }
      if (jobs[i].jobDesignation.toLowerCase().includes(query)) {
        if (!result.includes(jobs[i].jobDesignation)) {
          result.push(jobs[i].jobDesignation);
        }
      }
      if (jobs[i].jobLocation.toLowerCase().includes(query)) {
        if (!result.includes(jobs[i].jobLocation)) {
          result.push(jobs[i].jobLocation);
        }
      }
      if (jobs[i].companyName.toLowerCase().includes(query)) {
        if (!result.includes(jobs[i].companyName)) {
          result.push(jobs[i].companyName);
        }
      }
      jobs[i].skills.forEach(element => {
        if (element.toLowerCase().includes(query)) {
          if (!result.includes(element)) {
            result.push(element);
          }
        }
      });
    }
    return result;
  }

  /**
   * Returns a list of jobs that match the specified search query.
   */
  static getSearchJob(query) {
    const result = [];
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].jobCategory.toLowerCase() == query) {
        if (!result.includes(jobs[i].jobId)) {
          result.push(jobs[i]);
        }
      }
      if (jobs[i].jobDesignation.toLowerCase() == query) {
        if (!result.includes(jobs[i].jobId)) {
          result.push(jobs[i]);
        }
      }
      if (jobs[i].jobLocation.toLowerCase() == query) {
        if (!result.includes(jobs[i].jobId)) {
          result.push(jobs[i]);
        }
      }
      if (jobs[i].companyName.toLowerCase() == query) {
        if (!result.includes(jobs[i].jobId)) {
          result.push(jobs[i]);
        }
      }
      jobs[i].skills.forEach(element => {
        if (element.toLowerCase() == query) {
          if (!result.includes(jobs[i].jobId)) {
            result.push(jobs[i]);
          }
        }
      });
    }
    return result;
  }
}

const jobs= [new JobModel("amantheboss1@gmail.com","abc","tech","SDE","banglore","2000000",9,["HTML","CSS","JS"],"10/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
new JobModel("amantheboss1@gmail.com","abc","non-tech","HR","banglore","1000000",5,["Communication","Problem solving",],"15/8/24"),
]