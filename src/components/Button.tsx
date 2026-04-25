type Props = {
  children: React.ReactNode;
  type?: "button" | "submit";
};

export default function Button({ children, type = "button" }: Props) {
  return (
    <button
      type={type}
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}