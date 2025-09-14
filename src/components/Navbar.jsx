import Link from "next/link";
import { checkUser } from '@/lib/checkUser'

const Navbar = async () => {
  await checkUser();
  return (
    <div className="fixed top-0 w-full bg-white  z-50 border-b">
      <Link href="/dashboard" className="text-black no-underline hover:underline">Dashboard</Link>
    </div>
  )
}

export default Navbar;
