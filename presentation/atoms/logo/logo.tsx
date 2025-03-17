import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-DTlf0TqWgChNWZ92lxtnZorjd8LfQT.png"
        alt="Senavia Logo"
        width={120}
        height={30}
        className="h-8 w-auto"
      />
    </Link>
  );
}
