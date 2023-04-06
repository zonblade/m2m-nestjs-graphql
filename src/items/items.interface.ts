import { ObjectId } from 'bson';

export interface I_ItemParam {
  name?: string;
  category?: string;
  image?: string;
  price?: number;
  availability?: number;
  for_sale?: boolean;
}

export interface I_ItemReviewParam {
  item_id: string;
  user_id: string;
  rating: number;
}

export interface I_ItemSearchResult {
  id: string;
  name: string;
  category: string;
  rating: number;
  reputation: {
    badge: string;
    value: number;
  };
  reputationBadge: string;
  image: string;
  price: number;
  availability: number;
}

export interface I_ItemDocument {
  _id: ObjectId;
  _user: ObjectId;
  _creator: ObjectId;
  _ownership: ObjectId[];
  _original: ObjectId | null;
  name: string;
  category: string;
  image: string;
  reputation: {
    badge: string;
    value: number;
  };
  price: number;
  availability: number;
  bought: number;
  time: {
    created: Date;
    updated: Date;
  };
  control: {
    active: boolean;
    deleted: boolean;
    banned: boolean;
    for_sale: boolean;
    editable: boolean;
  };
  indexes: string;
}
