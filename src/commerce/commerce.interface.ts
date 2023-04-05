import { ObjectId } from 'bson';

export interface I_CommerceParam {
  id: string;
  quantity: number;
}

export interface I_Commerce {
  _user_sell: ObjectId;
  _user_acquirer: ObjectId;
  items: I_CommerceItem[];
  subtotal: number;
  payment: I_CommercePayment;
}

export interface I_CommercePayment {
  method: string;
  currency: string;
  amount: number;
  fee: number;
  link: string;
  account: string;
  status: string;
}

export interface I_CommerceItem {
  id: ObjectId;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface I_CommerceReview {
  _user: ObjectId;
  _commerce: ObjectId;
  rating: number;
}

export interface I_CommerceReviewAggregate {
  final_score: number;
}
