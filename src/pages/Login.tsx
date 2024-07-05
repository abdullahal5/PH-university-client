import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

type TLoginData = {
  id: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "2024030001",
      password: "student",
    },
  });
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit = async (data: TLoginData) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };

    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);
    dispatch(
      setUser({
        user: user,
        token: res.data.accessToken,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input className="border" type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          className="border"
          type="text"
          id="password"
          {...register("password")}
        />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
