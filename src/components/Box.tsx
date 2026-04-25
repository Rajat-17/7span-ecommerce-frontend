export default function Box({ children, className = "" }: any) {
  return <div className={className}>{children}</div>;
}