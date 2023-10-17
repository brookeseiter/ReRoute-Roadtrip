import React from 'react';
import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComp = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = []; 
    const [active, setActive] = useState(1);

    for (let i = 1; i < (totalItems/itemsPerPage); i++) {  // 0-10 and when 2/next clicked, 11-20 shows but page 2 stops appear
        pageNumbers.push(
            <Pagination.Item 
                key={i} 
                active={i === active} 
                onClick={() => {
                    paginate(i);
                    setActive(i);
                }}
            >
                {i}
            </Pagination.Item>
        );
    }

  return (
    <nav> 
        <ul className="pagination">
            <Pagination>
                <Pagination.First 
                    onClick={ () => {
                        if (active > 1) {
                            paginate(1);
                            setActive(1);
                        }
                    }} 
                />
                <Pagination.Prev 
                    onClick={ () => {
                        if (active > 1) {
                            paginate(active - 1);
                            setActive(active - 1);
                        }
                    }}  
                />
                {pageNumbers}
                <Pagination.Ellipsis/>
                <Pagination.Next 
                    onClick={ () => {
                        if (active >= 1) {
                            paginate(active + 1);
                            setActive(active + 1);
                        }
                    }}  
                />
                <Pagination.Last 
                    onClick={ () => {
                        if (active >= 1) {
                            paginate(Math.ceil(totalItems / itemsPerPage));
                            setActive(Math.ceil(totalItems / itemsPerPage));
                        }
                    }} 
                />
            </Pagination>
        </ul>
    </nav>
  )
}

export default PaginationComp
