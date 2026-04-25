import { useFormContext, Controller } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
};

export default function RHFInput({
  name,
  label,
  type = "text",
  placeholder,
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && (
            <label className="block text-sm font-medium mb-1">
              {label}
            </label>
          )}

          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md outline-none
              ${error ? "border-red-500" : "border-gray-300"}
              focus:ring-2 focus:ring-blue-500`}
          />

          {error && (
            <p className="text-red-500 text-sm mt-1">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}