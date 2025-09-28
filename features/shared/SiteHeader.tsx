import { Box, List } from "@chakra-ui/react";
import Link from "next/link";

export const SiteHeader = () => {
  return (
    <Box as="header" py={6}>
      <List.Root listStyle="none" flexDir="row" gap={6}>
        <List.Item>
          <Link href="/">Home</Link>
        </List.Item>
        <List.Item>
          <Link href="/users/add">Add user</Link>
        </List.Item>
      </List.Root>
    </Box>
  );
};
