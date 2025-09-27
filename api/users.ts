import { User } from "@/features/users/types";
import { apiClient } from "./client";

type UsersResult = {
  users: User[];
};

export const usersApi = {
  getUsers: async (): Promise<UsersResult> => {
    try {
      const response = await apiClient.get<UsersResult>("/users");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error}`);
    }
  },
  addUser: async (user: User): Promise<User> => {
    try {
      const response = await apiClient.post<User>(`/users`, user);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error}`);
    }
  },
};
