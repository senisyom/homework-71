export interface IDish {
  id: string;
  title: string;
  price: string;
  picture: string;
}

export interface ApiDish {
  title: string;
  price: string;
  picture: string;
}

export interface ApiDishes {
  [key: string]: ApiDish;
}
