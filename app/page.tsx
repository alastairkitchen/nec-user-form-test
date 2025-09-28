"use client";
import { Toaster } from "@/features/chakra/toaster";
import { SiteHeader } from "@/features/shared";
import { useGetUsersQuery } from "@/features/users/data-access/useGetUsersQuery";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError } = useGetUsersQuery();

  return (
    <Box maxW="900px" margin="0 auto">
      <SiteHeader />

      <Heading as="h1" mb={6}>
        Users list
      </Heading>
      <Box>
        {isLoading && <Text>Loading...</Text>}
        {isError && <Text>An error occured...</Text>}

        <Stack gap="2" mb={6}>
          {data?.users.map((user) => (
            <Flex>
              {user.fullName} | age: {user?.age} | Country: {user?.country} |
              Interests: {user?.interests?.map((item) => `${item} `)}
            </Flex>
          ))}
        </Stack>

        <Button asChild colorPalette="purple">
          <Link href="/users/add">Add users</Link>
        </Button>

        <Toaster />
      </Box>
    </Box>
  );
}
