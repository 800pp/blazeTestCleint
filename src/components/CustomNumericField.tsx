import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { useField, useFormikContext } from "formik";
import React from "react";

type CustomNumericFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isDisabled?: boolean;
  name: string;
  label: string;
  numberHolder: number;
  changeValue?: (newValue: number) => void;
};

export const CustomNumericField: React.VFC<CustomNumericFieldProps> = (
  props
) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <NumberInput
        isDisabled={props.isDisabled}
        min={0}
        precision={2}
        step={0.1}
        defaultValue={props.numberHolder}
      >
        <NumberInputField
          {...field}
          id={field.name}
          onChange={(e) => {
            props.changeValue!(Number(e.target.value));
          }}
        />
      </NumberInput>
    </FormControl>
  );
};
