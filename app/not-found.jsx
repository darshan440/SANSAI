import Link from "next/link";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4">
      <h1 className="text-6xl font-bold gradient-title mb-4">400</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        Oops! The page you&apos;re looking for does&apos;t exist or have been
        moved.
      </p>
      <Link href="/">
        <Button>Return to home</Button>
      </Link>
    </div>
  );
}
