import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = "" }, ref) => {
    return (
      <>
        <Helmet>
          <title>{title ? `${title} | E-Commerce` : "E-Commerce"}</title>
        </Helmet>

        <div
          ref={ref}
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
        >
          {children}
        </div>
      </>
    );
  },
);

export default Page;
