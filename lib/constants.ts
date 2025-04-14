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
