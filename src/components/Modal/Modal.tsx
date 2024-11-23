import React from "react";

interface ModalProps {
  orderDetails: { dish: { title: string; price: string }; amount: number }[];
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ orderDetails, onClose }) => {
  const getTotal = () => {
    let total = 0;
    orderDetails.forEach(({ dish, amount }) => {
      total += Number(dish.price) * amount;
    });
    return total + 150;
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Your Order</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <ul>
              {orderDetails.map(({ dish, amount }) => (
                <li key={dish.title}>
                  {dish.title} x{amount} - {dish.price} KGS
                </li>
              ))}
            </ul>
            <p>Delivery: 150 KGS</p>
            <p>Total: {getTotal()} KGS</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onClose}>
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
