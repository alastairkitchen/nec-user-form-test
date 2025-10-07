import { Box, Heading } from "@chakra-ui/react";
import { AddUserForm } from "@/features/users";

const FORM_MAX_WIDTH = "360px";

const AddUser = () => {
  return (
    <>
      <Box maxW={FORM_MAX_WIDTH} margin="0 auto">
        <Heading as="h1" mb={6}>
          Add users
        </Heading>
        <AddUserForm mb={10} />
      </Box>
    </>
  );
};

export default AddUser;
