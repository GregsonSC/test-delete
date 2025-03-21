import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PhoneCall, Mail } from "lucide-react"; 
import { Inter } from "next/font/google";

const inter600 = Inter({
  weight: "600",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});


//This is NOT responsive, need fix
export function ContactCard() {
  return (
    <Card
      className={`bg-[#99CC33] w-full [1440px]:w-1/2 flex flex-col ${inter600.className}`}
    >
      <CardContent className="flex-1 p-2 flex flex-col">
        <div className="w-full">
          <iframe
            className="w-full h-64 md:h-96 "
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=150%20S%20Pine%20Island%20Rd,%20Plantation,%20FL%2033324,%20EE.%20UU.+(Senavia%20Corp)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/collections/drones/">drone quadcopter</a>
          </iframe>
        </div>
      </CardContent>

      <CardFooter className="p-2 flex flex-col items-center gap-2 justify-center">
        <div className="flex items-center gap-2">
          <PhoneCall color="black" />
          <p className="text-black">(954) 706-4084</p>
        </div>
        <div className="flex items-center gap-2">
          <Mail color="black" />
          <p className="text-black">
            info@senaviacorp.com leads@senaviacorp.com
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
