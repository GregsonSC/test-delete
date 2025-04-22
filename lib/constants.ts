// aqui danny
// Sample documents data
const projectDocuments = [
  { id: "doc1", name: "Document1.docx", url: "#" },
  { id: "doc2", name: "Document2.docx", url: "#" },
  { id: "doc3", name: "Document3.docx", url: "#" },
  { id: "doc4", name: "Document4.docx", url: "#" },
  { id: "doc5", name: "Document1.docx", url: "#" },
  { id: "doc6", name: "Document2.docx", url: "#" },
  { id: "doc7", name: "Document3.docx", url: "#" },
  { id: "doc8", name: "Document4.docx", url: "#" },
];

// Sample projects data
export const projects = [
  {
    id: "1",
    name: "Beach Resort Website",
    progress: 75,
    phase: "Project Phase",
    details: [
      {
        description: "Initial design mockups completed. Waiting for client feedback.",
        documents: projectDocuments.slice(0, 3),
        date: new Date(2023, 5, 15),
      },
      {
        description: "Homepage and about page development completed.",
        documents: projectDocuments.slice(2, 5),
        date: new Date(2023, 6, 1),
      },
    ],
    chatHistory: [
      {
        sender: "client" as const,
        message: "How's the progress on the homepage?",
        timestamp: new Date(2023, 5, 20),
      },
      {
        sender: "agent" as const,
        message: "We've completed the initial design. I'll send you the mockups today.",
        timestamp: new Date(2023, 5, 20),
      },
    ],
  },
  {
    id: "2",
    name: "Corporate Portal",
    progress: 45,
    phase: "Design",
    details: [
      {
        description: "User research and competitor analysis completed.",
        documents: projectDocuments.slice(4, 6),
        date: new Date(2023, 4, 10),
      },
    ],
    chatHistory: [
      {
        sender: "agent" as const,
        message:
          "We've completed the user research phase. Would you like to schedule a call to discuss the findings?",
        timestamp: new Date(2023, 4, 12),
      },
      {
        sender: "client" as const,
        message: "Yes, that would be great. How about tomorrow at 2pm?",
        timestamp: new Date(2023, 4, 12),
      },
    ],
  },
  {
    id: "3",
    name: "E-commerce Platform",
    progress: 90,
    phase: "Testing",
    details: [
      {
        description: "Product catalog and checkout functionality implemented.",
        documents: projectDocuments.slice(0, 3),
        date: new Date(2023, 3, 5),
      },
      {
        description: "User testing completed with minor issues identified.",
        documents: projectDocuments.slice(0, 5),
        date: new Date(2023, 3, 20),
      },
      {
        description: "Final revisions based on user feedback.",
        documents: projectDocuments.slice(5, 7),
        date: new Date(2023, 4, 1),
      },
    ],
    chatHistory: [
      {
        sender: "client" as const,
        message: "When can we expect the platform to go live?",
        timestamp: new Date(2023, 4, 5),
      },
      {
        sender: "agent" as const,
        message:
          "We're aiming for next week. Just finalizing some minor fixes from the user testing.",
        timestamp: new Date(2023, 4, 5),
      },
    ],
  },
  {
    id: "4",
    name: "Mobile App",
    progress: 30,
    phase: "Development",
    details: [
      {
        description: "Initial wireframes and app architecture defined.",
        documents: projectDocuments.slice(2, 4),
        date: new Date(2023, 5, 1),
      },
    ],
    chatHistory: [
      {
        sender: "agent" as const,
        message: "We've started the development phase. Would you like to see the current progress?",
        timestamp: new Date(2023, 5, 10),
      },
      {
        sender: "client" as const,
        message: "Yes, please share a demo when available.",
        timestamp: new Date(2023, 5, 10),
      },
    ],
  },
  {
    id: "5",
    name: "Healthcare Portal",
    progress: 60,
    phase: "Integration",
    details: [
      {
        description: "Patient management system integrated with database.",
        documents: projectDocuments.slice(1, 4),
        date: new Date(2023, 7, 5),
      },
      {
        description: "Security audit completed with recommendations.",
        documents: projectDocuments.slice(3, 6),
        date: new Date(2023, 7, 20),
      },
    ],
    chatHistory: [
      {
        sender: "agent" as const,
        message: "The security audit has been completed. We need to implement a few changes.",
        timestamp: new Date(2023, 7, 22),
      },
      {
        sender: "client" as const,
        message: "What's the timeline for these security updates?",
        timestamp: new Date(2023, 7, 23),
      },
      {
        sender: "agent" as const,
        message: "We can implement them within the next two weeks.",
        timestamp: new Date(2023, 7, 23),
      },
    ],
  },
  {
    id: "6",
    name: "Educational Platform",
    progress: 85,
    phase: "Final Review",
    details: [
      {
        description: "Course creation tools and student dashboard completed.",
        documents: projectDocuments.slice(2, 5),
        date: new Date(2023, 6, 10),
      },
      {
        description: "Video streaming functionality optimized for various devices.",
        documents: projectDocuments.slice(0, 3),
        date: new Date(2023, 6, 25),
      },
    ],
    chatHistory: [
      {
        sender: "client" as const,
        message: "Can we add a feature for downloadable resources?",
        timestamp: new Date(2023, 7, 1),
      },
      {
        sender: "agent" as const,
        message: "Yes, we can implement that. It would take about 3-4 days to complete.",
        timestamp: new Date(2023, 7, 1),
      },
      {
        sender: "client" as const,
        message: "Great, please proceed with that addition.",
        timestamp: new Date(2023, 7, 2),
      },
    ],
  },
  {
    id: "7",
    name: "Fitness Tracking App",
    progress: 40,
    phase: "Development",
    details: [
      {
        description: "User profile and goal setting features implemented.",
        documents: projectDocuments.slice(4, 7),
        date: new Date(2023, 8, 5),
      },
      {
        description: "Integration with wearable devices in progress.",
        documents: projectDocuments.slice(1, 3),
        date: new Date(2023, 8, 15),
      },
    ],
    chatHistory: [
      {
        sender: "agent" as const,
        message:
          "We're making good progress on the wearable device integration. Would you like to see a demo?",
        timestamp: new Date(2023, 8, 18),
      },
      {
        sender: "client" as const,
        message:
          "Yes, that would be great. Also, have you started on the nutrition tracking feature?",
        timestamp: new Date(2023, 8, 19),
      },
      {
        sender: "agent" as const,
        message:
          "We'll begin work on the nutrition tracking next week after finalizing the current integration.",
        timestamp: new Date(2023, 8, 19),
      },
    ],
  },
];

// Sample requests data with details and chat history
// Sample estimate items structure (can be reused)
const sampleEstimateItems = [
  { name: "Design Phase", value: 1500 },
  { name: "Development (Frontend)", value: 3000 },
  { name: "Development (Backend)", value: 2500 },
  { name: "Deployment", value: 500 },
];

// Sample requests data with details, chat history, and estimates
export const requests = [
    {
        id: "req1",
        requestName: "New Website Design",
        leadStatus: "New Lead",
        associatedService: "Web Development",
        companyPlan: "Premium Plan",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sodales nibh. Fusce fermentum dapibus arcu, id hendrerit odio consectetur vitae.",
        chatHistory: [ // Added chat history
            { sender: "client" as const, message: "Can you provide a quote for the website?", timestamp: new Date(2023, 8, 1) },
            { sender: "agent" as const, message: "Certainly! I'll prepare a detailed proposal and send it over by tomorrow.", timestamp: new Date(2023, 8, 1) }
        ],
        // Add estimates array
        estimates: [
            { title: "Initial Proposal", items: sampleEstimateItems.slice(0, 2), status: "pending" as const }, // Example status
            { title: "Phase 1 Estimate", items: sampleEstimateItems.slice(1, 3), status: "approved" as const },
        ]
    },
    {
        id: "req2",
        requestName: "Mobile App Development",
        leadStatus: "Contacted",
        associatedService: "Mobile Development",
        companyPlan: "Standard Plan",
        description: "Develop a cross-platform mobile app for task management. Initial features include user login, task creation, and notifications.",
        chatHistory: [ // Added chat history
            { sender: "agent" as const, message: "Following up on our call last week regarding the mobile app.", timestamp: new Date(2023, 8, 5) },
            { sender: "client" as const, message: "Thanks for the follow-up. We're still discussing internally.", timestamp: new Date(2023, 8, 6) }
        ],
        // Add estimates array
        estimates: [
            { title: "Full Project Estimate", items: sampleEstimateItems, status: "sent" as const },
            { title: "MVP Estimate", items: sampleEstimateItems.slice(0, 3), status: "pending" as const },
            { title: "Additional Features", items: [{ name: "Push Notifications", value: 800 }, { name: "Offline Mode", value: 1200 }], status: "draft" as const },
        ]
    },
    {
        id: "req3",
        requestName: "E-commerce Integration",
        leadStatus: "Qualified",
        associatedService: "Web Development",
        companyPlan: "Enterprise Plan",
        description: "Integrate Shopify API with existing inventory management system. Requires custom middleware development.",
        chatHistory: [], // Example with empty history
        // Add estimates array (can be empty)
        estimates: []
    },
    {
        id: "req4",
        requestName: "SEO Optimization",
        leadStatus: "Proposal Sent",
        associatedService: "Digital Marketing",
        companyPlan: "Basic Plan",
        description: "Improve search engine rankings for client's blog. Focus on keyword research, on-page optimization, and link building.",
        chatHistory: [
             { sender: "agent" as const, message: "Just sent over the SEO proposal for your review.", timestamp: new Date(2023, 8, 10) }
        ],
        estimates: [
             { title: "Monthly SEO Retainer", items: [{ name: "On-Page SEO", value: 500 }, { name: "Link Building", value: 750 }, { name: "Reporting", value: 250 }], status: "sent" as const }
        ]
    },
    {
        id: "req5",
        requestName: "Cloud Migration",
        leadStatus: "Negotiation",
        associatedService: "Cloud Services",
        companyPlan: "Enterprise Plan",
        description: "Migrate existing on-premise infrastructure to AWS. Includes server setup, data migration, and security configuration.",
        chatHistory: [
            { sender: "client" as const, message: "Can we schedule a call to discuss the migration timeline?", timestamp: new Date(2023, 8, 12) },
            { sender: "agent" as const, message: "Absolutely. How about Thursday at 10 AM?", timestamp: new Date(2023, 8, 12) }
        ],
        estimates: [
             { title: "Migration Estimate", items: [{ name: "Server Setup", value: 2000 }, { name: "Data Transfer", value: 1500 }, { name: "Security Config", value: 1000 }], status: "negotiation" as const }
        ]
    },
    // --- Start of new requests ---
    {
        id: "req6",
        requestName: "Social Media Campaign",
        leadStatus: "New Lead",
        associatedService: "Digital Marketing",
        companyPlan: "Standard Plan",
        description: "Launch a new social media campaign targeting millennials for a new product launch. Focus on Instagram and TikTok.",
        chatHistory: [
            { sender: "client" as const, message: "Interested in your social media marketing services. Can we discuss options?", timestamp: new Date(2023, 9, 1) }
        ],
        estimates: [ // Add estimates
             { title: "Campaign Setup", items: [{ name: "Strategy", value: 600 }, { name: "Ad Creative", value: 900 }], status: "draft" as const },
             { title: "Monthly Management", items: [{ name: "Ad Spend", value: 1000 }, { name: "Management Fee", value: 500 }], status: "draft" as const }
        ]
    },
    {
        id: "req7",
        requestName: "CRM Customization",
        leadStatus: "Qualified",
        associatedService: "Software Development",
        companyPlan: "Premium Plan",
        description: "Customize Salesforce instance to include new fields for lead tracking and automated reporting.",
        chatHistory: [
            { sender: "agent" as const, message: "Following up on the CRM customization requirements we discussed.", timestamp: new Date(2023, 9, 5) },
            { sender: "client" as const, message: "Yes, we've finalized the requirements document. I'll send it over.", timestamp: new Date(2023, 9, 5) }
        ],
        estimates: [ // Add estimates
             { title: "Custom Fields Dev", items: [{ name: "Analysis", value: 400 }, { name: "Development", value: 1800 }, { name: "Testing", value: 300 }], status: "approved" as const }
        ]
    },
    {
        id: "req8",
        requestName: "Website Maintenance",
        leadStatus: "Proposal Sent",
        associatedService: "Web Development",
        companyPlan: "Basic Plan",
        description: "Ongoing monthly website maintenance including security updates, backups, and minor content changes.",
        chatHistory: [
            { sender: "agent" as const, message: "Here is the proposal for the website maintenance plan.", timestamp: new Date(2023, 9, 10) },
            { sender: "client" as const, message: "Thanks, reviewing it now.", timestamp: new Date(2023, 9, 11) }
        ],
        estimates: [ // Add estimates
             { title: "Monthly Plan", items: [{ name: "Updates & Backups", value: 150 }, { name: "Support Hours (2hr)", value: 200 }], status: "sent" as const }
        ]
    }
    // --- End of new requests ---
];
