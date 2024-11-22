import { Route, Routes } from "react-router-dom";
import "./App.css";

import DishList from "./containers/AdminPages/Dishes/DishList/DishList";
import AddNewDish from "./containers/AdminPages/Dishes/AddNewDish/AddNewDish";
import Navbar from "./components/Navbar/Navbar";
import ClientNavbar from "./components/ClientNavbar/ClientNavbar";
import ClientPage from "./containers/ClientPage/ClientPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="dishes" element={<DishList />} />
                <Route path="add-new-dish" element={<AddNewDish />} />
                <Route path="dishes/:id/edit" element={<AddNewDish />} />
              </Routes>
            </>
          }
        />

        <Route
          path="/*"
          element={
            <>
              <ClientNavbar />
              <Routes>
                <Route path="/" element={<ClientPage/>} />
              </Routes>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;
