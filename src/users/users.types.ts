export type User = {
  id: string;
  name: string;
  password: string;
};

export type CreateUserDto = Omit<User, 'id'>;
