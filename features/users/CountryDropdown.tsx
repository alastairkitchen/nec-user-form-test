"use client";

import { createListCollection, Field, Portal, Select } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

import countries from "./mock-data/countries.json";
import { useMemo } from "react";
import { AddUserFormData } from "./add-user-form/AddUserForm";

export const CountryDropdown = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddUserFormData>();

  const countriesValues = useMemo(
    () =>
      createListCollection({
        items: countries?.data?.map((item) => ({
          label: item?.value,
          value: String(item?.id),
        })),
      }),
    [countries]
  );

  return (
    <Field.Root invalid={!!errors.country} width="320px">
      <Field.Label>Country of residence</Field.Label>
      <Controller
        control={control}
        name="country"
        rules={{
          required: "Country is required",
        }}
        render={({ field }) => (
          <Select.Root
            multiple={false}
            name={field.name}
            value={[field.value]}
            onValueChange={(value) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            collection={countriesValues}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select country" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {countriesValues.items.map((country) => (
                    <Select.Item item={country} key={country.value}>
                      {country.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
      <Field.ErrorText>
        {String(errors?.country?.message || "")}
      </Field.ErrorText>
    </Field.Root>
  );
};
