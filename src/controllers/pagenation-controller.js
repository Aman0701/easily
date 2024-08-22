/**
 * Generates an array of page numbers for pagination.
 */
export default function getPagination(currentPage, totalJObs) {
    const pages = [];
    const maxPagesToShow = 5;
    let p = 0;
    // Show first few pages
    currentPage = parseFloat(currentPage);
    for (let i = 0; i < totalJObs.length; i += 3) {
       p++;
    }

    if(p <= maxPagesToShow){
        for(let i = 1; i <= p; i++){
            pages.push(i);
        }
    }else{
        if(currentPage < maxPagesToShow-1){
            for(let i = 1; i <= 4; i++){
                pages.push(i);
            }
            pages.push('...');
            pages.push(p);
        }else{
            pages.push(1);
            pages.push('...');
            if(currentPage >= p-2){
                for(let i = p-3;i <= p; i++){
                    pages.push(i);
                }
            }else{
                for(let i = currentPage-1; i <= currentPage+1;i++){
                    pages.push(i);
                }
                pages.push('...');
                pages.push(p);
            }
        }
    }

    // Show ellipsis if there are more page

    return pages;
}