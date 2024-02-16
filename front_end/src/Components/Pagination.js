import React from 'react';
import { useEffect} from 'react';
import Pagination from 'react-bootstrap/Pagination';


const PaginationComp = ({ 
    itemsPerPage, 
    totalItems, 
    currentPage,
    setCurrentPage,
    alwaysShown = true
}) => {
    const pagesCount = Math.ceil(totalItems / itemsPerPage);
    const isPaginationShown = alwaysShown ? true : pagesCount > 1;
    const changePage = (pageNum) => setCurrentPage(pageNum);

    const setLastPageAsCurrent = () => {
        if (currentPage !== 1 && currentPage > pagesCount) {
          setCurrentPage(pagesCount);
        }
    };

    let isPageNumberOutOfRange;

    // code adapted from: https://github.com/lukaaspl/ellipsis-pagination/blob/master/src/components/Pagination.js
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
            onClick={() => changePage(pageNumber)}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </Pagination.Item>
        );
      }
  
      if (!isPageNumberOutOfRange) {
        isPageNumberOutOfRange = true;
        return <Pagination.Ellipsis key={pageNumber} className="muted page__dots" />;
      }
  
      return null;
    });
    
    useEffect(setLastPageAsCurrent, [pagesCount, currentPage, setCurrentPage]);

    return (
        <nav> 
            <ul className="pagination">
                {isPaginationShown && (
                    <Pagination>
                        <Pagination.First 
                            onClick={ () => {
                                if (currentPage > 1) {
                                    changePage(1);
                                }
                            }} 
                        />
                        <Pagination.Prev 
                            onClick={ () => {
                                if (currentPage > 1) {
                                    changePage(currentPage - 1);
                                }
                            }}  
                        />
                        {pageNumbers}
                        <Pagination.Next 
                            onClick={ () => {
                                if (currentPage >= 1) {
                                    changePage(currentPage + 1);
                                }
                            }}  
                        />
                        <Pagination.Last 
                            onClick={ () => {
                                if (currentPage >= 1) {
                                    changePage(pagesCount);
                                }
                            }} 
                        />
                    </Pagination>
                )}
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
