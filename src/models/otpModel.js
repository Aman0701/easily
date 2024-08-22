/**
 * OtpModel class represents a user with OTP
 */
export default class OtpModel {
    /**
     * Constructor for OtpModel
     */
    constructor(name, email, designation, college, company, password, otp) {
      this.name = name;
      this.email = email;
      this.designation = designation;
      this.college = college;
      this.company = company;
      this.password = password;
      this.otp = otp;
    }
  
    /**
     * Generates a random OTP
     */
    static generateOTP() {
      const otp = Math.floor(Math.random() * 900000) + 100000;
      return otp;
    }
  
    /**
     * Adds a new user to the OTPS array
     */
    static addUser(name, email, designation, college, company, password, otp) {
      const user = new OtpModel(name, email, designation, college, company, password, otp);
      OTPS.push(user);
      return user;
    }
  
    /**
     * Retrieves a user by email from the OTPS array
     */
    static getUser(email) {
      const user = OTPS.find(u => u.email == email);
      return user;
    }
  
    /**
     * Deletes a user from the OTPS array
     */
    static delete(user) {
      const userIndex = OTPS.findIndex(i => i.email == user.email);
      if (userIndex < 0) {
        return;
      }
      OTPS.splice(userIndex, 1);
    }
  }
  
  const OTPS = [];