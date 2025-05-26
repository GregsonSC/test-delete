"use client";
import React from "react";
import { Button } from "../../../components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../../../components/ui/popover";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/ui/accordion";

const sections = [
  {
    title: "Contact Information",
    subquestions: [
      {
        question: "How much does professional web design cost?",
        answer:
          "The cost varies depending on your project's needs. We work with flexible budgets to adapt to your business.",
      },
      {
        question: "How long does it take to create a website?",
        answer:
          "The timeline depends on the complexity of the site, but most projects are completed within 2-6 weeks.",
      },
      {
        question: "Can you help me rank my website on Google?",
        answer: "Yes! We offer SEO services to help improve your website's ranking on Google.",
      },
      {
        question: "Do you offer a guarantee on your web design services?",
        answer: "We guarantee satisfaction with our work and offer post-launch support.",
      },
      {
        question: "What platforms do you use for web development?",
        answer:
          "We use modern platforms like Next.js, React, and WordPress, depending on your needs.",
      },
      {
        question: "Is maintenance included after launch?",
        answer: "Yes, we offer maintenance packages to keep your website updated and secure.",
      },
    ],
  },
  {
    title: "Web Design",
    content: "Information about web design services.",
  },
  {
    title: "Online Store Design",
    content: "Details about online store design.",
  },
  {
    title: "Business Software Development",
    content: "Custom business software solutions.",
  },
  {
    title: "Google Ads Advertising",
    content: "Google Ads campaign management info.",
  },
  {
    title: "Social Media Advertising and Management",
    content: "Social media marketing and management services.",
  },
];

export function FloatingChatButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="rounded-full shadow-lg p-0 border-4 border-transparent bg-gradient-to-r from-[#99CC33] via-[#37cdc8] to-[#99CC33]"
            style={{
              width: "56px",
              height: "56px",
              minWidth: "56px",
              minHeight: "56px",
              maxWidth: "56px",
              maxHeight: "56px",
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(1.15)";
              e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "";
              e.currentTarget.style.boxShadow = "0 4px 24px 0 rgba(0,0,0,0.18)";
            }}
          >
            <img
              src="/faq/message-circle-more.svg"
              width={34}
              height={34}
              alt="Chat"
              style={{ display: "block" }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={16}
          className="p-0 w-[350px] max-w-[90vw] rounded-lg shadow-2xl border-none bg-gradient-to-r from-[#99CC33] via-[#37cdc8] to-[#99CC33] py-2"
          style={{ paddingLeft: "8px", paddingRight: "8px" }}
        >
          <h2 className="text-lg font-semibold text-center mb-2 text-white py-2">
            What would you like to know?
          </h2>
          <div className="rounded-lg bg-[#ebedf2] p-4 max-h-[65vh] overflow-y-auto">
            {/*   {"Esta linea controla la altura del popover "} */}

            <Accordion
              type="single"
              collapsible
              className="bg-transparent border-none shadow-none flex flex-col gap-[5px]"
            >
              {sections.map((section, idx) => (
                <AccordionItem
                  key={section.title}
                  value={section.title}
                  className="border-none rounded-lg transition-all "
                >
                  <AccordionTrigger className="text-base font-semibold text-black bg-white hover:bg-green-50 px-4 py-2 rounded-md text-left transition-all data-[state=open]:rounded-b-none data-[state=open]:pb-0 no-underline hover:no-underline focus:no-underline">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-black bg-white px-4 py-2 text-left rounded-b-md">
                    {idx === 0 && section.subquestions ? (
                      <Accordion type="single" collapsible className="flex flex-col gap-2 ">
                        {section.subquestions.map((sub, subIdx) => (
                          <AccordionItem
                            key={sub.question}
                            value={sub.question}
                            className="border-none rounded-lg transition-colors data-[state=open]:bg-[#d3e8a9]"
                          >
                            <AccordionTrigger className="text-sm font-medium text-black bg-transparent px-3 pt-2 pb-0 rounded-md flex w-full justify-between items-center [&>svg]:ml-2">
                              <span className="flex-1 text-left">{sub.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="text-xs text-green-900 px-3 pb-2 pt-1 w-full">
                              <span className="text-black font-normal">{sub.answer}</span>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      section.content
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
