import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
  meta?: React.ReactNode;
  className?: string;
};

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = "", meta, className = "", ...other }, ref) => {
    return (
      <>
        <Helmet>
          <title>{title ? `${title} | E-Commerce` : "E-Commerce"}</title>
          {meta}
        </Helmet>

        <div
          ref={ref}
          className={`min-h-screen bg-gray-50 ${className}`}
          {...other}
        >
          {children}
        </div>
      </>
    );
  }
);

export default Page;