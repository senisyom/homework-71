import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { createDish, updateDish } from "../../../../store/dishesThunk";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectDishes } from "../../../../store/dishesSlise";
import { IDish } from "../../../../types";
import Navbar from "../../../../components/Navbar/Navbar";

const AddNewDish = () => {
  const { id } = useParams();
  const dishes = useSelector(selectDishes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [dish, setDish] = useState<{
    title: string;
    price: string;
    picture: string;
    id?: string;
  }>({
    title: "",
    price: "",
    picture: "",
  });

  useEffect(() => {
    if (id) {
      const dishToEdit = dishes.find((dish) => dish.id === id);
      if (dishToEdit) {
        setDish(dishToEdit);
      } else {
        navigate("/admin/dishes");
      }
    }
  }, [id, dishes, navigate]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDish((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (id) {
      try {
        await dispatch(updateDish(dish as IDish));
        navigate("/admin/dishes");
      } catch {
        toast.error("Ошибка");
      }
    } else {
      const newDish = { ...dish, id: Date.now().toString() };
      try {
        await dispatch(createDish(newDish as IDish));
        setDish({ title: "", price: "", picture: "" });
        navigate("/admin/dishes");
      } catch {
        toast.error("Ошибка добавлении ");
      }
    }
  };

  return (
    <div className="container w-50 mx-auto mt-4">
      <header>
        <Navbar />
      </header>

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
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default AddNewDish;
