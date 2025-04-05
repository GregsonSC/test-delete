import { ContactUs } from "@/presentation/molecules/contact-us/contact-us";
import { Section } from "lucide-react";

export function ScheduleFreeConsultation() {

    return(
        <Section>
            <div>
                <h1>Schedule a free consultation call!</h1>
                <p>Let’s Create Something Amazing Together! Take your business to the next level with the best digital marketing services. Connect with one of our digital experts at Senavia to fast-track your business objectives.</p> 
            </div>
            <ContactUs isLoggedIn={false} />
        </Section>

    )
}
