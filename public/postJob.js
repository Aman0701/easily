/**
 * Options object containing arrays of job designations for tech and non-tech categories.
 */
const options = {
    tech: ["SDE", "DevOps", "MERN Developer", "MEAN Developer", "JAVA Developer", "Front-End Developer", "Back-End Developer", "Full-Stack Developer"],
    nonTech: ["HR", "Social Media Manager", "Bussiness Analyst", "Marketing Manager", "Customer Relationship Manager", "Bussiness Development Executive", "Management Consultant"]
};

/**
 * Get the job category select element.
 */
const jobCategory = document.getElementById('jobCategory');

/**
 * Get the job designation select element.
 */
const jobDesignation = document.getElementById('jobDesignation');

/**
 * Event listener for the job category select element.
 * Updates the job designation select element with options based on the selected job category.
 */
jobCategory.addEventListener("change", () => {
    /**
     * Get the selected value of the job category select element.
     */
    const selectedValue = jobCategory.value;

    /**
     * Check if the selected value is a valid key in the options object.
     * If it is, update the job designation select element with options.
     */
    if (options[selectedValue]) {
        /**
         * Clear the job designation select element.
         */
        jobDesignation.innerHTML = "";

        /**
         * Create a new option element for the "Select Job Designation" placeholder.
         */
        const firstOption = document.createElement('option');
        firstOption.textContent = "Select Job Designation";
        firstOption.disabled = true;
        firstOption.selected = true;
        jobDesignation.appendChild(firstOption);

        /**
         * Iterate over the options array for the selected job category and create new option elements.
         */
        options[selectedValue].forEach(option => {
            /**
             * Create a new option element for the current option.
             */
            const newOption = document.createElement('option');
            newOption.value = option;
            newOption.textContent = option;
            jobDesignation.appendChild(newOption);
        });
    }
});

/**
 * Get the current date in ISO format (YYYY-MM-DD).
 */
const today = new Date().toISOString().split('T')[0];

/**
 * Set the min attribute of the date input element to the current date.
 */
document.getElementById('calender').setAttribute('min', today);