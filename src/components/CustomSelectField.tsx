import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type optionType = {
  key: string | boolean;
  value: string | number | readonly string[] | undefined;
};

type CustomSelectFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  label: string;
  options: optionType[];
};

export const CustomSelectField: React.VFC<CustomSelectFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Select
        {...field}
        id={field.name}
        as="select"
        placeholder={props.placeholder}
        rootProps={props}
      >
        {props.options.map((o, i) => {
          return (
            <option key={i} value={o.value}>
              {o.key}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};
/*
props.options.map((o: string) => {
          return <option value={o.toLowerCase()}>{o.toUpperCase()}</option>;
        })*/
