import { useEffect, useState } from 'react';
import Navbar from '../Components/NavBar.js';
import StopList from '../Components/StopList.js';
import PaginationComp from '../Components/Pagination.js';

const AllStopsPage = () => {
    const [stops, setStops] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [stopsPerPage] = useState(10);
    
    useEffect(() => {
        fetch(`/stops`)
            .then((response) => response.json())
            .then((data) => {
                setStops(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const stopsObj = Object.entries(stops).map(([key, value]) => ({key, value}));

    // Get current stops
    const idxOfLastStop = currentPage * stopsPerPage;
    const idxOfFirstStop = idxOfLastStop - stopsPerPage;
    const currentStops = stopsObj.slice(idxOfFirstStop, idxOfLastStop);

    // Change page
    const changePage = (pageNum) => setCurrentPage(pageNum);

    // stopsObj.filter((stop) => {
    //     // console.log(stop.value.stop_name);
    //     return stop.value.stop_name;
    // });

    // const [searchInput, setSearchInput] = useState("");

    // const handleChange = (e) => {
    //     // console.log(e.target.value);
    //     e.preventDefault();
    //     setSearchInput(e.target.value);
    // };

    // if (searchInput.length > 0) {
    //     stopsObj.filter((stop) => {
    //         // console.log(stop.value.stop_name.match(searchInput));
    //         return stop.value.stop_name.match(searchInput);
    //     });
    // }

    return (
        <div className="all-stops-page">
            <Navbar />
            <div className="all-stops-page-content container">
                {/* <input 
                    type="search"
                    onChange={handleChange}
                    value={searchInput} />
                <table>
                    <tr>
                        <th>Country</th>
                    </tr>

                    {stopsObj.map((stop) => {

                    <div key={stop.key}>
                        <tr>
                            <td>{stop.value.stop_name}</td>
                        </tr>
                    </div>

                    })}
                </table> */}
                {stopsObj && <StopList stopsObj={currentStops} title="All Stops" />}
                <PaginationComp
                    itemsPerPage={stopsPerPage} 
                    totalItems={stopsObj.length}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    changePage={changePage}
                />
            </div>
        </div>
    );
};

export default AllStopsPage;



// OG before PaginationComp.js 
// const AllStopsPage = () => {
//     const [stops, setStops] = useState([]);
//     // the page thats highlighted totally in blue in the pagination 
//     // const [active, setActive] = useState(1);
//     // the page that youre currently looking at (stops change)
//     const [currentPage, setCurrentPage] = useState(1);
//     // # of stops on each page
//     const [stopsPerPage] = useState(10);
//     // # of pages of the pagination 
//     const [limit, setLimit] = useState(11);
    
//     useEffect(() => {
//         fetch(`/stops`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setStops(data);
//             })
//             .catch((error) => console.log(error));
//     }, []);

//     const stopsObj = Object.entries(stops).map(([key, value]) => ({key, value}));

//     // Get current stops
//     const idxOfLastStop = currentPage * stopsPerPage;
//     const idxOfFirstStop = idxOfLastStop - stopsPerPage;
//     const currentStops = stopsObj.slice(idxOfFirstStop, idxOfLastStop);

//     // Change page
//     const paginate = (i) => setCurrentPage(i);

//     // for (let i = 1; i <= limit; i++) {  // Goes to 11 and flips stops past that, no new #s
//     // for (let i = (currentPage - 1) * limit; i < (currentPage * limit); i++) {  // 0-10 and when 2/next clicked, 11-20 shows but page 2 stops appear
//     // // for (let i = 1; i < (currentPage * limit); i++) {  // further #s shown, multiplied by 10 peach time past the last stop and flipping works
//     // // for (let i = 1; i <= Math.ceil(stopsObj.length / stopsPerPage); i++) { // the numbers go to the end (1-31) and flipping works
//     //     pageNumbers.push(
//     //         <Pagination.Item 
//     //             key={i} 
//     //             active={i === active} 
//     //             onClick={() => {
//     //                 paginate(i);
//     //                 setActive(i);
//     //                 console.log('i', i);
//     //                 console.log((currentPage - 1) * limit);
//     //                 console.log(currentPage * limit);
//     //             }}
//     //         >
//     //             {i}
//     //         </Pagination.Item>
//     //     );
//     // }


//     // stopsObj.filter((stop) => {
//     //     // console.log(stop.value.stop_name);
//     //     return stop.value.stop_name;
//     // });

//     // const [searchInput, setSearchInput] = useState("");

//     // const handleChange = (e) => {
//     //     // console.log(e.target.value);
//     //     e.preventDefault();
//     //     setSearchInput(e.target.value);
//     // };

//     // if (searchInput.length > 0) {
//     //     stopsObj.filter((stop) => {
//     //         // console.log(stop.value.stop_name.match(searchInput));
//     //         return stop.value.stop_name.match(searchInput);
//     //     });
//     // }




//     return (
//         <div className="all-stops-page">
//             <Navbar />
//             <div className="all-stops-page-content container">
//                 {/* <input 
//                     type="search"
//                     onChange={handleChange}
//                     value={searchInput} />
//                 <table>
//                     <tr>
//                         <th>Country</th>
//                     </tr>

//                     {stopsObj.map((stop) => {

//                     <div key={stop.key}>
//                         <tr>
//                             <td>{stop.value.stop_name}</td>
//                         </tr>
//                     </div>

//                     })}
//                 </table> */}
//                 {stopsObj && <StopList stopsObj={currentStops} title="All Stops" />}
//                 {/* <Pagination>
//                     <Pagination.First 
//                         onClick={ () => {
//                             if (active > 1) {
//                                 paginate(1);
//                                 setActive(1);
//                             }
//                         }} 
//                     />
//                     <Pagination.Prev 
//                         onClick={ () => {
//                             if (active > 1) {
//                                 paginate(active - 1);
//                                 setActive(active - 1);
//                             }
//                         }}  
//                     />
//                     {pageNumbers}
//                     <Pagination.Ellipsis
//                         // onClick={ () => {
//                         //     if (active >= 10) {
//                         //         paginate(11);
//                         //         setActive(11);
//                         //     }
//                         // }} 
//                     />
//                     <Pagination.Next 
//                         onClick={ () => {
//                             if (active >= 1) {
//                                 paginate(active + 1);
//                                 setActive(active + 1);
//                             }
//                         }}  
//                     />
//                     <Pagination.Last 
//                         onClick={ () => {
//                             if (active >= 1) {
//                                 paginate(Math.ceil(stopsObj.length / stopsPerPage));
//                                 setActive(Math.ceil(stopsObj.length / stopsPerPage));
//                             }
//                         }} 
//                     />
//                 </Pagination> */}
//                 <PaginationComp
//                     itemsPerPage={stopsPerPage} 
//                     totalItems={stopsObj.length}
//                     paginate={paginate}
//                 />
//                 {/* {stopsObj && <StopList stopsObj={stopsObj} title="All Stops" />} */}
//             </div>
//         </div>
//     );
// }

// export default AllStopsPage;