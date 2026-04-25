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
            <label className="block text-sm font-medium mb-1">{label}</label>
          )}

          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`w-full px-4 py-2.5 rounded-xl border bg-white
              focus:outline-none transition
              ${
                error
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-200 focus:ring-2 focus:ring-blue-400"
              }
              shadow-sm`
            }
          />

          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
