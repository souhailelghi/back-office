// import React from 'react';

// // import GetTimeRangesBySportAndDay from './Components/User/GetTimeRangesBySportAndDay';
// // import SELECTandGetTimeRangesBySportAndDay from './Components/User/SELECTandGetTimeRangesBySportAndDay';
// // import AddReservationForm from './Components/User/createReservations/AddReservationForm';
// //  import Tims from './Components/User/createReservations/Tims';
// // import FetchSportCategories from './Components/FetchSportCategories';
// // import ReservationForm from './Components/ReservationFormWork/ReservationForm';
// // import ReservationwithTimeSelect from '../src/Components/User/IntegrateTimeInReservation/ReservationwithTimeSelect'
// // import AddReservationForm from './Components/AddReservationForm';
// import ReservationForm from './ReservationForm';
// // import TimsForReservation from './Components/User/IntegrateTimeInReservation/TimsForReservation';
// function App() {


//   return (

//    <>
//     <div>
//     {/* <GetTimeRangesBySportAndDay /> */}
//     {/* <FetchSportCategories /> */}
//     {/* <SELECTandGetTimeRangesBySportAndDay /> */}
//     {/* <AddReservationForm /> */}
//     {/* <Tims/> */}
//     {/* <ReservationForm/> */}
//     {/* <ReservationwithTimeSelect/> */}
//     {/* <AddReservationForm/>  */}

//     {/* <TimsForReservation/>  */}


//     <h1>Reservation Form : </h1>
//     <ReservationForm />

//     </div>
//    </>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddSportCategory from './Components/AddSportCategory';
import FetchSportCategories from './Components/FetchSportCategories';
import AddSport from './Components/AddSport';

function App() {
  const [sportData, setSportData] = useState({ token: '', categoryId: '' });

  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/">Add Sport Category</Link></li>
            <li><Link to="/fetch-categories">Fetch Sport Categories</Link></li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<AddSportCategory />} />
          <Route path="/fetch-categories" element={<FetchSportCategories setSportData={setSportData} />} />
          <Route path="/add-sport" element={<AddSport token={sportData.token} categorieId={sportData.categoryId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
