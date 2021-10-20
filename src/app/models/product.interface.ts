export interface Product {
  id: number;
  name: string;
  photo: string;
  price: number;
  description: string;
  averageRating: number;
  reviews: IReviews[];
  quantity: number;
}

export interface IReviews {
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
