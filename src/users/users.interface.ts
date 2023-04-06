export interface UserAggregate {
  _id: string;
  username: string;
}

export interface UserRegister {
  name: string;
  username: string;
  password: string;
  image: string;
}
