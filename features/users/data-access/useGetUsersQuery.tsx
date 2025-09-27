import { usersApi } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

const GET_USERS_CACHE_KEY = "getUsers";

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: [GET_USERS_CACHE_KEY],
    queryFn: usersApi.getUsers,
  });
};
