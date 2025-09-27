import { usersApi } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const GET_USERS_QUERY_KEY = "getUsers";

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: [GET_USERS_QUERY_KEY],
    queryFn: usersApi.getUsers,
  });
};
