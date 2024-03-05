export type CreateUserParams = {
  clerkId: string;
  email: string;
  photo: string;
  username: string;
  created_at: Date;
};

export type UpdateUserParams = {
  photo: string;
};
