import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectDishes, selectFetchLoading } from "../../../../dishesSlise";
import { IDish } from "../../../../types";
import { toast } from "react-toastify";
import { fetchDishes, removeDish } from "../../../../dishesThunk";
import { NavLink } from "react-router-dom";

const DishList = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const loading = useAppSelector(selectFetchLoading);

  const [selectedDish, setSelectedDish] = useState<IDish | null>(null);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  const onDeleteDish = (id: string) => {
    dispatch(removeDish(id))
      .then(() => {
        setSelectedDish(null);
      })
      .catch((error) => {
        console.error("Ошибка удаления:", error);
        toast.error("Ошибка удаления блюда.");
      });
  };

  return (
    <div className="container-sm">
      <div className="d-flex justify-content-between mt-3">
        <h2>Dishes</h2>
        <NavLink to={"/admin-add-new-dishes"}>
          <button className="btn btn-primary">Add new dish</button>
        </NavLink>
      </div>

      {dishes.length === 0 ? (
        <p>Нет блюд</p>
      ) : (
        dishes.map((dish) => (
          <div className="card m-4" key={dish.id}>
            <div className="card-body">
              <a href="">
                <h5
                  className="card-title m-3"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Dish: {dish.title}
                </h5>
                <h5
                  className="card-title m-3"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Price: {dish.price}
                </h5>
              </a>
              <button
                className="btn btn-danger"
                onClick={() => onDeleteDish(dish.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDeleteDish(dish.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DishList;
