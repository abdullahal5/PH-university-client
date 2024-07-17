import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHSelect = ({ label, name, options }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            size="large"
            {...field}
            options={options}
          />
          {error && (
            <small className="text-center text-red-500 font-semibold pt-0.5">{error.message}</small>
          )}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
