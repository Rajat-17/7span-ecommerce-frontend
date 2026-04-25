export default function Button({
  children,
  type = "button",
  loading = false,
}: any) {
  return (
    <button
      type={type}
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}