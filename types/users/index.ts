export type CreateUserParams = {
  clerkId: string;
  email: string;
  photo: string;
  username: string;
  created_at: Date;
  first_name: string;
  last_name: string;
};

export type UpdateUserParams = {
  photo: string;
};

export type UserColumnParams = {
  email: string;
  username: string;
  created_at: Date;
};
