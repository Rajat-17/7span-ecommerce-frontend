export default function Card({ children }: any) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      {children}
    </div>
  );
}