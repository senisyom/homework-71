import { useAppSelector } from "../../../app/hooks";
import { selectCart } from "../../../store/dishesSlise";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";

const Total = () => {
  const cart = useAppSelector(selectCart);
  const [showModal, setShowModal] = useState(false);

  const total = cart.reduce((acc, cartDish) => {
    const price = +cartDish.dish.price;
    return acc + price * cartDish.amount;
  }, 0);

  const onCheckout = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="row row-cols-2 align-items-center justify-content-between px-3">
        <div className="text-start p-0">
          <p>
            <strong>Order total: </strong>
          </p>
        </div>
        <div className="text-end p-0">
          <p>
            {total} <strong>SOM</strong>{" "}
          </p>
          <button className="btn btn-primary" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </div>

      {showModal && <Modal orderDetails={cart} onClose={onCloseModal} />}
    </div>
  );
};

export default Total;
