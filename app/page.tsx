"use client";

import { useGetUsersQuery } from "@/features/users/data-access/useGetUsersQuery";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  const { data } = useGetUsersQuery();

  return (
    <Box>
      <Link href="/add">Add user</Link>

      {data?.users.map((user) => (
        <Box>{user.fullName}</Box>
      ))}
    </Box>
  );
}
