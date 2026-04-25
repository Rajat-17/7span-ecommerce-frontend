export default function Container({ children }: any) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {children}
    </div>
  );
}