"use client";

import { Box, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      <Link href="/about">About</Link>

      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
    </Box>
  );
}
