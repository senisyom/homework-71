import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  selectDishes,
  selectDeleteLoading,
  selectFetchLoading,
} from "../../../../store/dishesSlise";
import { fetchDishes, removeDish } from "../../../../store/dishesThunk";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const DishList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dishes = useAppSelector(selectDishes);
  const loading = useAppSelector(selectFetchLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const onDeleteDish = (id: string) => {
    dispatch(removeDish(id))
      .then(() => {
        dispatch(fetchDishes());
      })
      .catch(() => {
        toast.error("Ошибка удаления");
      });
  };

  const onEditDish = (id: string) => {
    navigate(`/admin/dishes/${id}/edit`);
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="container-sm">
      <div className="d-flex justify-content-between mt-3">
        <h2>Доступные блюда</h2>
        <NavLink to="/admin/add-new-dish">
          <button className="btn btn-primary">Добавить новое блюдо</button>
        </NavLink>
      </div>

      {dishes.length === 0 ? (
        <p>Нет блюд</p>
      ) : (
        dishes.map((dish) => (
          <div className="card m-4" key={dish.id}>
            <div className="card-body d-flex align-items-center">
              <img
                src={dish.picture}
                alt={dish.title}
                className="img-thumbnail"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="ms-3">
                <h5 className="card-title mb-1">{dish.title}</h5>
                <p className="mb-0">
                  Цена: {dish.price} <strong>KGZ</strong>{" "}
                </p>
              </div>
              <div className="ms-auto">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => onEditDish(dish.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDeleteDish(dish.id)}
                  disabled={deleteLoading === dish.id}
                >
                  {deleteLoading === dish.id ? "Удаление..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DishList;
