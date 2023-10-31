import React from 'react';
import { useState , useEffect} from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComp = ({ 
    itemsPerPage, 
    totalItems, 
    currentPage,
    setCurrentPage,
    paginate 
}) => {
    const pagesCount = Math.ceil(totalItems / itemsPerPage);
    // const isCurrentPageFirst = currentPage === 1;
    // const isCurrentPageLast = currentPage === pagesCount;
    // const changePage = number => {
    //     if (currentPage === number) return;
    //     setCurrentPage(number);
    // };
    // const onPageNumberClick = pageNumber => {
    //     changePage(pageNumber);
    // };
    
    const setLastPageAsCurrent = () => {
        if (currentPage > pagesCount) {
          setCurrentPage(pagesCount);
        }
    };

    let isPageNumberOutOfRange;

    const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
      const pageNumber = index + 1;
      const isPageNumberFirst = pageNumber === 1;
      const isPageNumberLast = pageNumber === pagesCount;
      const isCurrentPageWithinTwoPageNumbers =
        Math.abs(pageNumber - currentPage) <= 2;
  
      if (
        isPageNumberFirst ||
        isPageNumberLast ||
        isCurrentPageWithinTwoPageNumbers
      ) {
        isPageNumberOutOfRange = false;
        return (
          <Pagination.Item
            key={pageNumber}
            onClick={() => {
                paginate(pageNumber);
                setCurrentPage(pageNumber);
            }}
            onLoad={console.log(pageNumber)}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </Pagination.Item>
        );
      }
  
      if (!isPageNumberOutOfRange) {
        isPageNumberOutOfRange = true;
        return <Pagination.Ellipsis key={pageNumber} className="muted" />;
      }
  
      return null;
    });
    
    useEffect(setLastPageAsCurrent, [pagesCount]);
    // useEffect(setLastPageAsCurrent, [pagesCount, currentPage, setCurrentPage]);

    return (
        <nav> 
            <ul className="pagination">
                <Pagination>
                    <Pagination.First 
                        onClick={ () => {
                            if (currentPage > 1) {
                                paginate(1);
                            }
                        }} 
                    />
                    <Pagination.Prev 
                        onClick={ () => {
                            if (currentPage > 1) {
                                paginate(currentPage - 1);
                            }
                        }}  
                    />
                    {pageNumbers}
                    <Pagination.Next 
                        onClick={ () => {
                            if (currentPage >= 1) {
                                paginate(currentPage + 1);
                            }
                        }}  
                    />
                    <Pagination.Last 
                        onClick={ () => {
                            if (currentPage >= 1) {
                                paginate(pagesCount);
                            }
                        }} 
                    />
                </Pagination>
            </ul>
        </nav>
    );
}

export default PaginationComp


// OG Functional this way at last commit (Pagination functional to use elsewhere)
// const PaginationComp = ({ itemsPerPage, totalItems, paginate }) => {
//     const pageNumbers = []; 
//     const [active, setActive] = useState(1);

//     for (let i = 1; i < (totalItems/itemsPerPage); i++) {  // 0-10 and when 2/next clicked, 11-20 shows but page 2 stops appear
//         pageNumbers.push(
//             <Pagination.Item 
//                 key={i} 
//                 active={i === active} 
//                 onClick={() => {
//                     paginate(i);
//                     setActive(i);
//                 }}
//             >
//                 {i}
//             </Pagination.Item>
//         );
//     }

//   return (
//     <nav> 
//         <ul className="pagination">
//             <Pagination>
//                 <Pagination.First 
//                     onClick={ () => {
//                         if (active > 1) {
//                             paginate(1);
//                             setActive(1);
//                         }
//                     }} 
//                 />
//                 <Pagination.Prev 
//                     onClick={ () => {
//                         if (active > 1) {
//                             paginate(active - 1);
//                             setActive(active - 1);
//                         }
//                     }}  
//                 />
//                 {pageNumbers}
//                 <Pagination.Ellipsis/>
//                 <Pagination.Next 
//                     onClick={ () => {
//                         if (active >= 1) {
//                             paginate(active + 1);
//                             setActive(active + 1);
//                         }
//                     }}  
//                 />
//                 <Pagination.Last 
//                     onClick={ () => {
//                         if (active >= 1) {
//                             paginate(Math.ceil(totalItems / itemsPerPage));
//                             setActive(Math.ceil(totalItems / itemsPerPage));
//                         }
//                     }} 
//                 />
//             </Pagination>
//         </ul>
//     </nav>
//   )
// }

// export default PaginationComp
