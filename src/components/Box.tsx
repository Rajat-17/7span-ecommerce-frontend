type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Box({ children, className = "" }: Props) {
  return <div className={className}>{children}</div>;
}