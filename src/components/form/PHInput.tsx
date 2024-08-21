import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string | number;
  disabled?: boolean;
};

const PHInput = ({
  type,
  name,
  label,
  defaultValue,
  disabled,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              size="large"
              {...field}
              className="border"
              type={type}
              disabled={disabled}
              id={name}
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
    </div>
  );
};

export default PHInput;
