import { MainLayout } from "@/presentation/templates/main-layout";
import { Button } from "@/presentation/atoms/button/button";
import { ReviewSummary } from "@/presentation/organisms/review-summary/review-summary";
import Link from "next/link";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";


export default function TestimonialPage() {
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
                                From Delray high-end construction companies to Miami Beach nightlife spots, we help brands shine brighter online. Here’s a peek behind the scenes at what we’ve done, and what we can do for you.
                            </p>
                        </div>
                        <Link href="/contact">
                            <Button className="mt-10 rounded-full text-[#050A2B] font-bold text-3xl px-10 py-8">
                                Book a Call Now!!
                            </Button>
                        </Link>
                    </div>
                </section>
                <section className="flex-col items-center justify-center text-center bg-black">
                    <div className="py-24 px-10 xl:px-64">
                        <h1 className="font-bold text-5xl text-[#0A1248]">Subtitle</h1>
                        <h1 className="font-semibold tex-white mt-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt. Phasellus vitae magna tincidunt, aliquam velit sit amet, convallis ante. Nunc non commodo nisi. Morbi libero leo, ultricies at iaculis ac, eleifend ut felis.
                        </h1>
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