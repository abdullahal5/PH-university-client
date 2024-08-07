import { DatePicker, Form } from "antd";
import moment from "moment";
import { Controller } from "react-hook-form";

type TInputDatePickerProps = {
  name: string;
  label?: string;
  defaultValue?: string | number | undefined;
};

const PHDatePicker = ({ name, label, defaultValue }: TInputDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              size="large"
              {...field}
              id={name}
              style={{ width: "100%" }}
              defaultValue={moment(defaultValue)}
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

export default PHDatePicker;
