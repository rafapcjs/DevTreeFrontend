export type User = {
  handle: string;

  name: string;
  email: string;
  password: string;
  description: string;
  _id: string;
};

export type RegisterForm = Pick<User, "handle" | "name" | "email"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type profileForm = Pick<User, "handle" | "description">;
