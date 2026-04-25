import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider from "../../components/form/FormProvider";
import RHFInput from "../../components/form/RHFInput";
import Button from "../../components/Button";

import { loginSchema } from "../../utils/validation";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold">Welcome Back 👋</h2>
        <p className="text-gray-500 text-sm mt-1">
          Login to your account
        </p>
      </div>

      {/* Form */}
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <RHFInput
          name="email"
          label="Email"
          placeholder="Enter your email"
        />

        <RHFInput
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <Button type="submit">
          {methods.formState.isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </FormProvider>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Don’t have an account?{" "}
        <span className="text-blue-600 cursor-pointer">
          Register
        </span>
      </p>
    </div>
  );
}