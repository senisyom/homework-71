import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DishList from "./containers/AdminPages/Dishes/DishList/DishList";
import AddNewDish from "./containers/AdminPages/Dishes/AddNewDish/AddNewDish";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/admin/dishes" element={<DishList />}></Route>
        <Route path="/admin-add-new-dishes" element={<AddNewDish />} />
      </Routes>
    </>
  );
};

export default App;
