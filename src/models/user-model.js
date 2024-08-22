/**
 * User model class
 */
export default class userModel {
    /**
     * Constructor
     */
    constructor(name, email, designation, collegeName, companyName, password) {
      this.name = name;
      this.email = email;
      this.designation = designation;
      this.collegeName = collegeName;
      this.companyName = companyName;
      this.password = password;
      this.job = [];
    }
  
    /**
     * Add a new user to the system
     */
    static addUser(user) {
      const newUser = new userModel(user.name, user.email, user.designation, user.college, user.company, user.password);
      users.push(newUser);
      return newUser;
    }
  
    /**
     * Verify a user's credentials
     */
    static verifyUser(email, password) {
      const user = users.find(u => u.email === email && u.password === password);
      return user;
    }
  
    /**
     * Get a user by email
     */
    static getUser(email) {
      const user = users.find(u => u.email === email);
      return user;
    }
  
    /**
     * Add a job to a user's profile
     */
    static addJob(email, jobId) {
      const user = users.find(u => u.email == email);
      if (user) {
        user.job.push(jobId);
      }
    }
  
    /**
     * Delete a job from a user's profile
     */
    static deleteJob(email, jobId) {
      const userIndex = users.find(u => u.email == email);
      if (userIndex == -1) {
        return "no User found";
      } else {
        const jobIndex = users[userIndex].job.findIndex(j => j == jobId);
        if (jobIndex == -1) {
          return "no job found";
        } else {
          users[userIndex].job.splice(jobIndex, 1);
        }
      }
    }
  
    /**
     * Get a job seeker's jobs
     */
    static getJobseekerMyJob(email) {
      const user = users.find(u => u.email == email);
      return user;
    }
  }
  
  const users = [];