/**
 * Searches for jobs based on the input query.
 */
function searchJob() {
    const input = document.getElementById('search');
    
    if (input.value.trim() == "" || input.value.trim() == null || input.value.trim() == undefined) {
        return;
    }
    const query = input.value;
    
    fetch(`/search?q=${query}&page=${1}`)
    .then(response => response.json())
    .then(data =>{
        const resultDiv = document.getElementById('results');
        resultDiv.innerHTML = ""
        data.forEach(element => {
            const div = document.createElement('div');
            const anchor = document.createElement('a');
            anchor.href = `/searchJob?q=${element}&page=${1}`
            div.textContent = element;
            anchor.appendChild(div);
            resultDiv.appendChild(anchor);
        });
    })
}


/**
 * Clears the search input and results when the user clicks outside the search input and results.
 */
const mainDiv = document.getElementById('main');
document.addEventListener('click',(event)=>{
    const div = document.getElementById('results');
    if (div && event.target != div && event.target != input) {
        div.innerHTML = "";
        document.getElementById('search').value = "";
    }
});


/**
 * Handles the search button click event.
 */
const searchButton = document.getElementById('search-button');


searchButton.addEventListener('click',()=>{
    const value = document.getElementById('search').value;
    console.log(value);
    
    if (value.trim() == "" || value.trim() == null || value.trim() == undefined) {
        return;
    }
    fetch(`/searchJob?page=${1}`,{
        method:"post",
        body:value
   }).then((res) =>{
       if(res.ok){
           window.location.href='/jobs';
       }
   })
})