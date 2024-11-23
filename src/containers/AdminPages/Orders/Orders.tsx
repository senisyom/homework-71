import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchDishes, removeDish } from "../../../store/dishesThunk";
import { IDish } from "../../../types";

const Orders = () => {
  const dispatch = useAppDispatch();

  const dishes = useAppSelector((state) => state.dishes.items);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    await dispatch(removeDish(id));
    dispatch(fetchDishes());
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h4 className="text-center mb-4 fw-bold text-primary">Dishes</h4>
          {dishes.map((dish: IDish) => {
            const totalPrice = parseFloat(dish.price) * dish.price;

            return (
              <div
                key={dish.id}
                className="card mb-3 shadow-sm p-3 bg-light border-0 rounded-3"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title m-0">{dish.title}</h5>
                    <span className="badge bg-primary rounded-pill fs-6">
                      x<strong>{dish.price}</strong>
                    </span>
                  </div>

                  <p className="card-text text-muted">
                    Delivery cost: <strong>150 KGS</strong>
                  </p>
                  <h6 className="fw-bold">
                    Total Price: <strong>{totalPrice + 150} KGS</strong>
                  </h6>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => onDelete(dish.id)}
                    >
                      Complete order
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
