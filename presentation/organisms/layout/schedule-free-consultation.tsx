import { ContactUs } from "@/presentation/molecules/contact-us/contact-us";
import { Section } from "lucide-react";

export function ScheduleFreeConsultation() {

    return(
        <section className="flex flex-col items-center justify-center pt-24 pb-24 xl:pt-36 xl:b-36">
            <div className="place-content-start mb-12 text-center mx-9">
                <h1 className="font-bold text-5xl mb-12">Schedule a free consultation call!</h1>
                <p className="text-lg font-semibold mb-12 xl:px-72">Let’s Create Something Amazing Together! Take your business to the next level with the best digital marketing services. Connect with one of our digital experts at Senavia to fast-track your business objectives.</p> 
            </div>

                <ContactUs isLoggedIn={false} />

        </section>

    )
}
