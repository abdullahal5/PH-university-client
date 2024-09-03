import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import Title from "../components/ui/Title";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing password...");

    try {
      const res = await changePassword(data);
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, {
          id: toastId,
        });
      } else {
        toast.success(res?.data?.message, { id: toastId });
        dispatch(logout());
        return navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" className="h-[100vh]">
      <PHForm onSubmit={onSubmit}>
        <Title title={"Change Password"} />
        <PHInput type="text" name="oldPassword" label="Old Password:" />
        <PHInput type="text" name="newPassword" label="New password:" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
