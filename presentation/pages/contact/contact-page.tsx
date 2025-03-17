import Link from "next/link";
import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import { ContactForm } from "@/presentation/molecules/contact-form/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -left-20 top-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Contact Us
            </Heading>
            <p className="text-lg text-muted-foreground">
              Have a question or want to work with us? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <Heading level="h2" className="text-3xl font-bold mb-6">
                  Get in Touch
                </Heading>
                <p className="text-muted-foreground">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <ContactForm />
            </div>

            <div className="space-y-8">
              <div>
                <Heading level="h2" className="text-3xl font-bold mb-6">
                  Contact Information
                </Heading>
                <p className="text-muted-foreground">
                  You can also reach us using the following contact information.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Address</h3>
                    <p className="text-muted-foreground">
                      South Florida
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-muted-foreground">info@senaviacorp.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-background/5 border border-gray-800 rounded-lg p-6">
                <h3 className="font-bold mb-4">Business Hours</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>

              <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.53925916665!2d-80.29949920266949!3d25.782390733064336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1623252073635!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  aria-hidden="false"
                  tabIndex={0}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </Heading>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What services does Senavia Corp offer?",
                answer:
                  "Senavia Corp offers a wide range of digital services including web design and development, digital marketing, graphic design, branding, e-commerce solutions, and more.",
              },
              {
                question: "How long does it take to complete a website project?",
                answer:
                  "The timeline for a website project depends on its complexity. A simple website might take 2-4 weeks, while a more complex e-commerce site could take 8-12 weeks or more.",
              },
              {
                question: "Do you offer ongoing maintenance for websites?",
                answer:
                  "Yes, we offer website maintenance packages to keep your site secure, up-to-date, and performing optimally. These can be tailored to your specific needs.",
              },
              {
                question: "How much does a typical project cost?",
                answer:
                  "Project costs vary based on requirements, complexity, and scope. We provide detailed quotes after understanding your specific needs during our initial consultation.",
              },
              {
                question: "Do you work with clients outside of South Florida?",
                answer:
                  "While we're based in South Florida, we work with clients nationwide and internationally through virtual meetings and digital collaboration tools.",
              },
              {
                question: "What is your process for starting a new project?",
                answer:
                  "We begin with a discovery call to understand your needs, followed by a proposal and quote. Once approved, we'll create a detailed project plan and timeline before beginning work.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-background/5 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 border-y border-primary/20">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </Heading>
            <p className="text-muted-foreground text-lg mb-8">
              Book a call with our team to discuss your project and get a free quote.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="https://calendly.com/senaviacorp/30min" target="_blank">
                Book a Call
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
