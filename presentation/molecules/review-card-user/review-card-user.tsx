import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewCardUserProps } from "@/components/interface/review-card-user-interface";


export function ReviewCardUser({
    profilePicture = "/fotos-prueba/joe.jpg",
    name = "Joe",
    rating = 5.0,
    review = "Good experience",
}: ReviewCardUserProps) {
    return (
        <Card className="bg-white/95 border-[#99CC33]  w-full lg:w-72 h-60 hover:bg-white/80">
            <CardHeader className="flex flex-row space-y-2">
                <img
                    src={profilePicture}
                    alt="pfp"
                    className="rounded-full w-10 h-10"
                />
                <CardTitle className="ml-3 text-xl text-black font-semibold">
                    {name}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
                <div className="flex justify-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            fill="black"
                            stroke="black"
                            className="h-6 w-12"
                        />
                    ))}
                </div>
                <p className="text-base text-black font-normal">{review}</p>
            </CardContent>

            <CardFooter className="flex flex-col">
                <hr className="w-11/12 mx-auto border-t border-black pb-2" />
                <a className="flex justify-end w-full text-base text-black font-normal" href="https://shorturl.at/m8XMt" target="_blank" rel="noopener noreferrer">
                    Source
                </a>
            </CardFooter>
        </Card>
    );
}
