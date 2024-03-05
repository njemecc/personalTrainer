export type CreateUserParams = {
  clerkId: string;
  email: string;
  photo: string;
  username: string;
  createdAt: Date;
};

export type UpdateUserParams = {
  photo: string;
};
