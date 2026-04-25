import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 bg-gray-800 text-white">
      <Link to="/">Products</Link>

      <div className="flex gap-4">
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </div>
  );
}