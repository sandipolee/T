"use client"; // Ensure this component is rendered on the client side

import { signOut } from "next-auth/react"; // Import client-side signOut from NextAuth
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    await signOut({
      redirect:true
    }); // Perform sign-out, disable built-in redirect
    router.push("/login"); // Redirect after sign-out
  };

  return (
    <form onSubmit={handleLogout}>
      <button type="submit" className="dropdown-menu-item text-red-500">
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
