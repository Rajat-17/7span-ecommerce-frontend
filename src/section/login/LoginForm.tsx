import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider from "../../components/form/FormProvider";
import RHFInput from "../../components/form/RHFInput";
import Button from "../../components/Button";

import { loginSchema } from "../../utils/validation";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";

export default function LoginForm() {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <Card>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Please login to your account</p>
        </div>

        <div className="space-y-4">
          <RHFInput name="email" label="Email" placeholder="Enter your email" />

          <RHFInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <div className="pt-2">
            <Button type="submit" loading={loading}>
              Sign In
            </Button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">© 7Span E-Commerce</p>
        </div>
      </FormProvider>
    </Card>
  );
}
