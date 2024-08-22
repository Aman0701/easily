
/**
 * Hides the jobseeker and recruiter divs by default
 */
document.getElementById('jobseeker').style.display = 'none';
document.getElementById('recruiter').style.display = 'none';

/**
 * Handles the change event on the designation dropdown
 */
document.getElementById('designation').addEventListener('change', function(event) {
  /**
   * Checks if the changed element is the designation dropdown
   */
  if (event.target.name === 'designation') {
    /**
     * Hides the jobseeker and recruiter divs
     */
    document.getElementById('jobseeker').style.display = 'none';
    document.getElementById('recruiter').style.display = 'none';
    
    /**
     * Gets the selected div based on the dropdown valuen
     */
    const selectedDiv = document.getElementById(event.target.value);
    if (selectedDiv) {
      /**
       * Shows the selected div
       */
      selectedDiv.style.display = 'flex';
    }
  }
});