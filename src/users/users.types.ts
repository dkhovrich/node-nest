export type User = {
  id: string;
  email: string;
  name: string;
};

export type CreateUserDto = Omit<User, 'id'>;
