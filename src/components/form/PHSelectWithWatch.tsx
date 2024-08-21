import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  defaultValue?: string | number;
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  defaultValue,
  mode,
  onValueChange,
}: TPHSelectProps) => {
  const { control } = useFormContext();
  const inputvalue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    onValueChange(inputvalue);
  }, [inputvalue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            mode={mode}
            disabled={disabled}
            size="large"
            {...field}
            options={options}
            defaultValue={defaultValue}
          />
          {error && (
            <small className="text-center text-red-500 font-semibold pt-0.5">
              {error.message}
            </small>
          )}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;
