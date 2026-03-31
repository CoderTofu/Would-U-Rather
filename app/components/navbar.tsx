import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="min-w-screen border-b-[#262626] border-solid border-b flex justify-center py-2">
      <div className="w-full max-w-200 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Would U Rather Logo"
            width={50}
            height={50}
          />
          <h2>Would U Rather</h2>
        </a>
        <div>
          <a href="#">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}
