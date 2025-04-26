export interface CardItem {
  title: string;
  description: string;
}

export interface ServiceContent {
  title: string;
  description: string;
  cardsSectionTitle: string;
  cardItems: CardItem[];
}

interface CountyConfig {
  cities: string[];
  services: Record<string, ServiceContent>;
}

export const serviceContent: Record<string, CountyConfig> = {
  "miami-dade": {
    cities: ["sunny-isles-beach","coral-gables","key-biscayne"],
    services: {
      websites: {
        title: "Web Design Services in Miami Beach",
        description:
          "Welcome to the premier choice for professional web design services in Miami Beach! Whether you’re a local business, a trendy boutique, a luxury hotel, or a thriving restaurant, we specialize in creating custom web designs that not only look stunning but also drive real results.",
        cardsSectionTitle: "Why Choose Our Miami Beach Web Design Services?",
        cardItems: [
          {
            title: "Custom Web Design for Miami Beach Businesses",
            description:
              "We create unique, eye-catching websites tailored to your brand and the Miami Beach audience.",
          },
          {
            title: "Mobile-Friendly & Responsive Web Design",
            description:
              "With so many users browsing on their phones, we ensure your website is fully responsive and looks amazing on any device.",
          },
          {
            title: "SEO-Optimized Websites for Local Visibility",
            description:
              "Our websites are built with local SEO strategies to help you rank higher on Google and attract more customers in Miami Beach.",
          },
          {
            title: "Conversion-Focused Web Development",
            description:
              "From clear calls-to-action to intuitive navigation, we design websites that turn visitors into paying customers.",
          },
          {
            title: "Ongoing Website Maintenance & Support",
            description:
              "Your website is your digital storefront. We offer reliable website maintenance to keep it running smoothly and securely.",
          },
        ],
      },
      marketing: {
        title: "Marketing Services in Miami Beach",
        description:
          "Welcome to the premier choice for marketing services in Miami Beach! Whether you’re a local business, a trendy boutique, a luxury hotel, or a thriving restaurant, we specialize in crafting digital marketing strategies that truly deliver results.",
        cardsSectionTitle: "Why Choose Our Miami Beach Marketing Services?",
        cardItems: [
          {
            title: "Custom Marketing Campaigns for Miami Beach",
            description:
              "We create unique, eye-catching marketing campaigns tailored to your brand and the Miami Beach audience.",
          },
          {
            title: "Mobile-Friendly & Responsive Digital Marketing",
            description:
              "Our marketing materials and digital presence are fully responsive and engaging on any device.",
          },
          {
            title: "SEO-Optimized Marketing for Local Visibility",
            description:
              "Our strategies are built with local SEO in mind, helping you rank higher on Google and drive traffic.",
          },
          {
            title: "Conversion-Focused Marketing Funnels",
            description:
              "From clear calls-to-action to intuitive navigation, we design marketing funnels that convert visitors into loyal customers.",
          },
          {
            title: "Ongoing Marketing Maintenance & Support",
            description:
              "Our maintenance and support services ensure your campaigns run smoothly and reliably.",
          },
        ],
      },
    },
  },

  broward: {
    cities: ["fort-lauderdale", "hollywood", "pompano-beach"],
    services: {
      websites: {
        title: "Web Design Services in Broward County",
        description:
          "Welcome to the premier choice for professional web design services in Broward County! Whether you’re a local business, a trendy boutique, a luxury hotel, or a thriving restaurant, we specialize in creating custom web designs that not only look stunning but also drive real results.",
        cardsSectionTitle: "Why Choose Our Broward County Web Design Services?",
        cardItems: [
          {
            title: "Custom Web Design for Broward County Businesses",
            description:
              "We create unique, eye-catching websites tailored to your brand and the Broward County audience.",
          },
          {
            title: "Mobile-Friendly & Responsive Web Design",
            description:
              "With so many users browsing on their phones, we ensure your website is fully responsive and looks amazing on any device.",
          },
          {
            title: "SEO-Optimized Websites for Local Visibility",
            description:
              "Our websites are built with local SEO strategies to help you rank higher on Google and attract more customers in Broward County.",
          },
          {
            title: "Conversion-Focused Web Development",
            description:
              "From clear calls-to-action to intuitive navigation, we design websites that turn visitors into paying customers.",
          },
          {
            title: "Ongoing Website Maintenance & Support",
            description:
              "Your website is your digital storefront. We offer reliable website maintenance to keep it running smoothly and securely.",
          },
        ],
      },
      marketing: {
        title: "Marketing Services in Broward County",
        description:
          "Welcome to the premier choice for marketing services in Broward County! Our expert team crafts digital campaigns to elevate your brand and engage your local audience.",
        cardsSectionTitle: "Why Choose Our Broward County Marketing Services?",
        cardItems: [
          {
            title: "Custom Marketing Campaigns for Broward County",
            description:
              "We create unique, eye-catching marketing campaigns tailored to your brand and the Broward County audience.",
          },
          {
            title: "Mobile-Friendly & Responsive Digital Marketing",
            description:
              "Our marketing materials and digital presence are fully responsive and engaging on any device.",
          },
          {
            title: "SEO-Optimized Marketing for Local Visibility",
            description:
              "Our strategies are built with local SEO in mind, helping you rank higher on Google and drive traffic.",
          },
          {
            title: "Conversion-Focused Marketing Funnels",
            description:
              "From clear calls-to-action to intuitive navigation, we design marketing funnels that convert visitors into loyal customers.",
          },
          {
            title: "Ongoing Marketing Maintenance & Support",
            description:
              "Our maintenance and support services ensure your campaigns run smoothly and reliably.",
          },
        ],
      },
    },
  },

  "palm-beach": {
    cities: ["west-palm-beach","boca-raton","delray-beach"],
    services: {
      websites: {
        title: "Web Design Services in Palm Beach County",
        description:
          "Welcome to the premier choice for professional web design services in Palm Beach County! Whether you’re a local business, a trendy boutique, a luxury hotel, or a thriving restaurant, we specialize in creating custom web designs that not only look stunning but also drive real results.",
        cardsSectionTitle: "Why Choose Our Palm Beach County Web Design Services?",
        cardItems: [
          {
            title: "Custom Web Design for Palm Beach County Businesses",
            description:
              "We create unique, eye-catching websites tailored to your brand and the Palm Beach County audience.",
          },
          {
            title: "Mobile-Friendly & Responsive Web Design",
            description:
              "With so many users browsing on their phones, we ensure your website is fully responsive and looks amazing on any device.",
          },
          {
            title: "SEO-Optimized Websites for Local Visibility",
            description:
              "Our websites are built with local SEO strategies to help you rank higher on Google and attract more customers in Palm Beach County.",
          },
          {
            title: "Conversion-Focused Web Development",
            description:
              "From clear calls-to-action to intuitive navigation, we design websites that turn visitors into paying customers.",
          },
          {
            title: "Ongoing Website Maintenance & Support",
            description:
              "Your website is your digital storefront. We offer reliable website maintenance to keep it running smoothly and securely.",
          },
        ],
      },
      marketing: {
        title: "Marketing Services in Palm Beach County",
        description:
          "Welcome to the premier choice for marketing services in Palm Beach County! Our expert team crafts digital campaigns to elevate your brand and engage your local audience.",
        cardsSectionTitle: "Why Choose Our Palm Beach County Marketing Services?",
        cardItems: [
          {
            title: "Custom Marketing Campaigns for Palm Beach County",
            description:
              "We create unique, eye-catching marketing campaigns tailored to your brand and the Palm Beach County audience.",
          },
          {
            title: "Mobile-Friendly & Responsive Digital Marketing",
            description:
              "Our marketing materials and digital presence are fully responsive and engaging on any device.",
          },
          {
            title: "SEO-Optimized Marketing for Local Visibility",
            description:
              "Our strategies are built with local SEO in mind, helping you rank higher on Google and drive traffic.",
          },
          {
            title: "Conversion-Focused Marketing Funnels",
            description:
              "From clear calls-to-action to intuitive navigation, we design marketing funnels that convert visitors into loyal customers.",
          },
          {
            title: "Ongoing Marketing Maintenance & Support",
            description:
              "Our maintenance and support services ensure your campaigns run smoothly and reliably.",
          },
        ],
      },
    },
  },
};