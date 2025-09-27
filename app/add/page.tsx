"use client";
import {
  Box,
  Button,
  Heading,
  Input,
  NumberInput,
  Stack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { Field } from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { CountryDropdown, InterestsCheckboxGroup } from "@/features/users";
import Link from "next/link";
import { User } from "@/features/users/types";
import { useAddUserMutation } from "@/features/users/data-access/useAddUserMutation";
import { Toaster } from "@/features/chakra/toaster";

export type AddUserFormData = {
  fullName: string;
  age: string;
  country: string[];
  interests: string[];
};

const AddUser = () => {
  const form = useForm<AddUserFormData>();

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
      country: data?.country.length > 0 ? Number(data?.country[0]) : null,
      interests: data?.interests?.map((item) => Number(item)),
    };

    mutate(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Box maxW="700px" margin="0 auto">
      <Link href="/">Go to Homepage</Link>
      <Heading as="h1">Add users Page</Heading>

      <FormProvider {...form}>
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
              <NumberInput.Root width="200px" defaultValue="10" max={120}>
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
            <Button colorPalette="purple" type="submit" loading={isPending}>
              Add User
            </Button>
          </Stack>
          <DevTool control={control} /> {/* set up the dev tool */}
        </form>
      </FormProvider>
      <Toaster />
    </Box>
  );
};

export default AddUser;
