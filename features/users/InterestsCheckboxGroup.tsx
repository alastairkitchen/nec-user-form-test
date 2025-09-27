"use client";
import {
  Checkbox,
  CheckboxGroup,
  createListCollection,
  Fieldset,
} from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import interests from "./mock-data/interests.json";
import { useMemo } from "react";
import { AddUserFormData } from "@/app/add/page";

export const InterestsCheckboxGroup = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddUserFormData>();

  const framework = useController({
    control,
    name: "interests",
    defaultValue: [],
    rules: {
      required: "Select at least one interest",
    },
  });

  const interestsValues = useMemo(
    () =>
      createListCollection({
        items: interests?.data?.map((item) => ({
          label: item?.value,
          value: String(item?.id),
        })),
      }),
    [interests]
  );

  const invalid = !!errors.interests;

  return (
    <Fieldset.Root invalid={invalid}>
      <Fieldset.Legend>Select interests</Fieldset.Legend>
      <CheckboxGroup
        invalid={invalid}
        value={framework.field.value}
        onValueChange={framework.field.onChange}
        name={framework.field.name}
      >
        <Fieldset.Content>
          {interestsValues?.items?.map((item) => (
            <Checkbox.Root key={item.value} value={item.value}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{item.label}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Fieldset.Content>
      </CheckboxGroup>

      {invalid && (
        <Fieldset.ErrorText>
          {String(errors?.interests?.message)}
        </Fieldset.ErrorText>
      )}
    </Fieldset.Root>
  );
};
