import Link from 'next/link';
import { Navbar } from "@/presentation/organisms/navbar/navbar";
import { Button } from '@/presentation/atoms/button/button';

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
            </header>
            <main className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-9xl xl:text-[200px] font-black mb-6 text-[#ADE73A] ">404</h1>
                <h1 className='font-bold text-5xl mb-4'>Oops!</h1>
                <h2 className='text-4xl'>Page Not Found</h2>
                <Link href="/">
                    <Button className='rounded-full mt-16 text-xl p-6 font-bold'>
                        Back To Home
                    </Button>
                </Link>
                
                
            </main>
        </div>
    );
}
