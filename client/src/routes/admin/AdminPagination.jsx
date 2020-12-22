import React from 'react';

//Pagination buttons
const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) =>
{
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = [];
    for(let i = 1; i <= pagesCount; i++) pages.push(i);
    
    return (
        <nav>
        <ul className="pagination mb-0">
         {pages.map(page => (
             <li
                key={page}
               className={page === currentPage ? "page-item active" : "page-item"}
              >
                <a onClick={() => onPageChange(page)} className="page-link btn">
                 {page}
               </a>
            </li>
         ))}
        </ul>
        </nav>
  );
};

export default Pagination;