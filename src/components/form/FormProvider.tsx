import { FormProvider as RHFProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  methods: any;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
};

export default function FormProvider({ children, methods, onSubmit }: Props) {
  return (
    <RHFProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </RHFProvider>
  );
}