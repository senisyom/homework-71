import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectDishes,
  selectFetchLoading,
} from "../../dishesSlise";
import { fetchDishes } from "../../dishesThunk";

const ClientDishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const loading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  if (loading) {
    return <p> Загрузка...</p>;
  }
  return (
    <div className="container-sm">
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
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ClientDishes;
