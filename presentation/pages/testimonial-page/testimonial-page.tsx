"use client"
import React from "react";
import { MainLayout } from "@/presentation/templates/main-layout";
import { Button } from "@/presentation/atoms/button/button";
import { ReviewSummary } from "@/presentation/organisms/review-summary/review-summary";
import Link from "next/link";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";
import { Card, CardContent, CardHeader,CardTitle,CardDescription, } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,

} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import { StudyCaseViewModel } from "@/presentation/molecules/news/StudyCaseViewModel";

export default function TestimonialPage() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    const { StudyCases } = StudyCaseViewModel()
    
    // Function to randomly select 5 elements from StudyCases
    const getRandomStudyCases = React.useMemo(() => {
        if (!StudyCases || StudyCases.length === 0) return [];
        const shuffled = [...StudyCases].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    }, [StudyCases]);

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <MainLayout>
            <div>
                <section className="flex-col items-center justify-center text-center bg-black">
                    <div className="py-24 px-10 xl:px-32">
                        <h1 className="font-bold text-8xl">Study Cases</h1>
                        <div className="mt-12 mx-10 xl:mx-44 font-medium">
                            <p>
                                See How We Can Make the Difference.
                            </p>
                            <p className="mt-5">
                                From Delray high-end construction companies to Miami Beach nightlife spots, we help brands shine brighter online. Here's a peek behind the scenes at what we've done, and what we can do for you.
                            </p>
                        </div>
                        <Link href="/contact">
                            <Button className="mt-10 rounded-full text-[#050A2B] font-bold text-2xl xl:text-3xl px-10 py-8">
                                Book a Call Now!!
                            </Button>
                        </Link>
                    </div>
                </section>
                <section className="relative flex-col items-center justify-items text-center bg-black">
                    <video className="absolute top-0 left-0 w-full h-full object-cover" src="/fondos/blog-video-background.mp4" autoPlay loop muted />
                    <div className="py-24 px-10 xl:px-64 flex flex-col justify-center items-center">
                        <div className="-mx-10 xl:-mx-64">
                            <Carousel setApi={setApi}
                                opts={{ loop: true, align: "center" }}
                                className="w-screen">
                                <CarouselContent>
                                    {getRandomStudyCases.map((_, index) => (
                                        /* 3. Cada slide ocupa toda la pista */
                                        <CarouselItem
                                            key={index}
                                            className="basis-full xl:basis-2/3 2xl:basis-[950px] flex items-center justify-center"
                                        >
                                            <div className="w-full max-w-[847px]  md:px-28 flex flex-col items-center">
                                                {current === index + 1 ? (
                                                    <Card className="w-full md:w-[847px] h-auto p-0 bg-transparent border-transparent transition-all duration-500 ease-in-out transform scale-100 opacity-100">
                                                        <CardHeader><CardTitle className="font-bold text-5xl text-[#0A1248]">{getRandomStudyCases[index].title}</CardTitle></CardHeader>
                                                        <CardContent className="flex flex-col h-full items-center justify-center p-0 md:p-2">
                                                            <p className="font-semibold text-white mt-5 mb-10 text-center px-10">
                                                                {getRandomStudyCases[index].resume}
                                                            </p>
                                                            <iframe
                                                                className="w-80 h-48 md:w-[847px] md:h-[475px]"
                                                                src={getRandomStudyCases[index].videoUrl}
                                                                title="YouTube video player"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                ) : (
                                                    <Card className="w-[847px] h-auto p-0 bg-transparent border-transparent mt-64 transition-all duration-500 ease-in-out transform scale-95">
                                                        <CardContent className="flex flex-col h-full items-center justify-center p-2">
                                                            <div className="w-80 h-48 md:w-[847px] md:h-[339px] bg-[#04081E]"/>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                        <div className="relative flex justify-center space-x-8 mt-16 ">
                            {getRandomStudyCases.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`h-5 w-5 rounded-full transition-colors ${current === idx + 1 ? 'bg-[#04081E]' : 'bg-white'}`}
                                    onClick={() => api?.scrollTo(idx)}
                                    aria-label={`Ir al slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                <section>
                    <ReviewSummary />
                </section>
                <section>
                    {ContactInfo(1)}
                </section>
                <section>
                    <ScheduleFreeConsultation />
                </section>
            </div>
        </MainLayout>
    )
}