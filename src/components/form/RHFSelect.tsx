import { useFormContext, Controller } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  options: { label: string; value: string | number }[];
};

export default function RHFSelect({ name, label, options }: Props) {
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

          <select
            {...field}
            className={`w-full px-3 py-2 border rounded-md outline-none
              ${error ? "border-red-500" : "border-gray-300"}
              focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

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