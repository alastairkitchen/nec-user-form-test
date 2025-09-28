import { Box, Heading } from "@chakra-ui/react";
import { Toaster } from "@/features/chakra/toaster";
import { AddUserForm } from "@/features/users";
import { SiteHeader } from "@/features/shared";

const FORM_MAX_WIDTH = "360px";

const AddUser = () => {
  return (
    <Box maxW="900px" margin="0 auto">
      <SiteHeader />
      <Box maxW={FORM_MAX_WIDTH} margin="0 auto">
        <Heading as="h1" mb={6}>
          Add users
        </Heading>
        <AddUserForm mb={10} />
        <Toaster />
      </Box>
    </Box>
  );
};

export default AddUser;
