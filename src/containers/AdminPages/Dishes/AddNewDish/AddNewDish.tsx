import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { createDish } from "../../../../dishesThunk";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectDishes } from "../../../../dishesSlise";

const AddNewDish = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const dishes = useSelector(selectDishes);

  const [dish, setDish] = useState({
    title: "",
    price: "",
    picture: "",
  });

  useEffect(() => {
    if (id) {
      const dishToEdit = dishes.find((dish) => dish.id === id);
      if (dishToEdit) {
        setDish(dishToEdit);
      }
    }
  }, [id, dishes]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDish((prevDish) => ({
      ...prevDish,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newDish = {
      ...dish,
      id: Date.now().toString(),
    };

    try {
      await dispatch(createDish(newDish));
      toast.success("Блюдо добавлено");

      setDish({
        title: "",
        price: "",
        picture: "",
      });
      navigate("/admin/dishes");
    } catch {
      toast.error("Ошибка добавления блюда");
    }
  };

  return (
    <div className="container w-50 mx-auto mt-4">
      <h2 className="mb-4">
        {id ? "Редактировать блюдо" : "Добавить новое блюдо"}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="form-floating mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Название"
            name="title"
            value={dish.title}
            onChange={onChange}
            required
          />
          <label>Название</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Цена"
            name="price"
            value={dish.price}
            onChange={onChange}
            required
          />
          <label>Цена</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="text"
            className="form-control"
            value={dish.picture}
            onChange={onChange}
            placeholder="Ссылка на изображение"
            name="picture"
          />
          <label>Фото</label>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Сохранить изменения" : "Сохранить"}
        </button>
      </form>
    </div>
  );
};

export default AddNewDish;
