/**
 * Gets the username element from the DOM
 */
const userName = document.getElementById('userName');

/**
 * Toggles the visibility of the user layout element when the username element is clicked
 */
userName.addEventListener('click', ()=>{
  /**
   * Gets the user layout element from the DOM
   */
  const div = document.getElementById('user-layout');

  /**
   * Toggles the 'display-none' class on the user layout element
   */
  div.classList.toggle('display-none');
});