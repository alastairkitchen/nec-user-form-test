"use client";

import { Toaster } from "@/features/chakra/toaster";
import { useGetUsersQuery } from "@/features/users/data-access/useGetUsersQuery";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  const { data, isLoading } = useGetUsersQuery();

  return (
    <Box>
      <Link href="/add">Add user</Link>

      {isLoading && <Text>Loading...</Text>}

      {data?.users.map((user) => (
        <Flex>
          {user.fullName} | age: {user?.age} | Country: {user?.country} |
          Interests:{" "}
          {user?.interests?.map(
            (item) => `${item} 
          
            `
          )}
        </Flex>
      ))}

      <Toaster />
    </Box>
  );
}
