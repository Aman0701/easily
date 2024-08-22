/**
 * Deletes a product by its ID.
 */
function deleteProduct(id){
    const result = confirm("Are you sure you want to delete the JOB ?");

    if(result){       
        fetch("/deleteJob/"+id,{
             method:"delete"
        }).then((res) =>{
            if(res.ok){
                window.location.href='/jobs';
            }
        })

    }
}

function updateProduct(id){
    const result = confirm("Are you sure want to update the JOB ?");

    if(result){
      window.location.href= "/updateJob/"+id;
    }
}