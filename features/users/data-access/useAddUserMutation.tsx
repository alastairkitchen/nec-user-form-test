"use client";
import { useMutation } from "@tanstack/react-query";
import { usersApi } from "../../../api/users";
import { User } from "../types";
import { toaster } from "@/features/chakra/toaster";
import { GET_USERS_QUERY_KEY } from "./useGetUsersQuery";
import Link from "next/link";
import { queryClient } from "@/features/shared/query-client";

export const useAddUserMutation = (options?: {
  onSuccess?: (data: User) => void;
  onError?: (error: Error) => void;
  invalidateQueries?: boolean;
}) => {
  return useMutation<User, Error, User>({
    mutationFn: (user: User) => usersApi.addUser(user),
    onSuccess: () => {
      if (options?.invalidateQueries !== false) {
        queryClient.invalidateQueries({ queryKey: [GET_USERS_QUERY_KEY] });
      }

      toaster.create({
        title: "Successfully added User",
        description: (
          <>
            view users list on <Link href="/">Homepage</Link>
          </>
        ),
        type: "success",
        duration: 5000,
      });
    },
    onError: () => {
      toaster.create({
        title: "Error",
        description: "Please contact administration",
        type: "error",
      });
    },
  });
};
