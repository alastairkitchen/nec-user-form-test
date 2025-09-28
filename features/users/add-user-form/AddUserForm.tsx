"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useAddUserMutation } from "../data-access/useAddUserMutation";
import { User } from "../types";
import {
  Stack,
  Field,
  Input,
  NumberInput,
  Button,
  Box,
  BoxProps,
  Flex,
  Text,
} from "@chakra-ui/react";
import { CountryDropdown } from "../CountryDropdown";
import { InterestsCheckboxGroup } from "../InterestsCheckboxGroup";
import Link from "next/link";

export type AddUserFormData = {
  fullName: string;
  age: string;
  country: string[];
  interests: string[];
};

export const AddUserForm: React.FC<BoxProps> = (props) => {
  const form = useForm<AddUserFormData>({
    defaultValues: {
      fullName: "",
      age: "",
      country: [],
      interests: [],
    },
  });

  const { mutate, isPending } = useAddUserMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = (data: AddUserFormData) => {
    const payload: User = {
      fullName: data?.fullName,
      age: Number(data?.age),
      country: data?.country?.length > 0 ? Number(data?.country[0]) : null,
      interests: data?.interests?.map((item) => Number(item)),
    };

    mutate(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Box
        border="1px solid"
        borderColor="whiteAlpha.400"
        padding="4"
        borderRadius="md"
        {...props}
      >
        <Text id="form-description" mb={4}>
          Fill out the form below to add a new user
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={6}>
            <Field.Root invalid={!!errors.fullName}>
              <Field.Label>Full Name</Field.Label>
              <Input
                {...register("fullName", {
                  required: "full name required",
                })}
              />

              <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.age}>
              <Field.Label>Age</Field.Label>
              <NumberInput.Root width="200px" max={120}>
                <NumberInput.Control />
                <NumberInput.Input
                  {...register("age", {
                    required: "age required",
                    min: {
                      value: 18,
                      message: "age must be 18 or above",
                    },
                  })}
                />
              </NumberInput.Root>
              <Field.ErrorText>{errors.age?.message}</Field.ErrorText>
            </Field.Root>
            <CountryDropdown />
            <InterestsCheckboxGroup />
            <Flex mt={4} gap={4}>
              <Button
                colorPalette="purple"
                type="submit"
                loading={isPending}
                role="button"
                aria-describedby="form-description"
                aria-label="Add user"
              >
                Add User
              </Button>
              <Button
                asChild
                opacity="0.8"
                colorPalette="purple"
                bg="colorPalette.200"
                color="black"
                _hover={{
                  opacity: 1,
                }}
              >
                <Link href="/">View users</Link>
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </FormProvider>
  );
};
