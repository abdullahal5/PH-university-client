import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  defaultValue?: string | number;
};

const PHSelect = ({
  label,
  name,
  options,
  disabled,
  defaultValue,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
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

export default PHSelect;
