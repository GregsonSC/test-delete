export const mockProjects = [
  {
    id: "1",
    name: "Project Alpha",
    status: "In Progress",
    progress: 30,
    phase: "Phase 1",
    documents: [{ name: "Document1.docx" }, { name: "Document2.docx" }],
    chat: [
      { from: "user", text: "Mensaje de usuario en Project Alpha" },
      { from: "admin", text: "Respuesta admin en Project Alpha" },
    ],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2024-05-14",
  },
  {
    id: "2",
    name: "Project Beta",
    status: "Completed",
    progress: 100,
    phase: "Phase 3",
    documents: [{ name: "BetaDoc1.pdf" }, { name: "BetaDoc2.pdf" }],
    chat: [
      { from: "user", text: "Mensaje de usuario en Project Beta" },
      { from: "admin", text: "Respuesta admin en Project Beta" },
    ],
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "2024-05-10",
  },
  // 8 más
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `${i + 3}`,
    name: `Project ${String.fromCharCode(67 + i)}`,
    status: i % 2 === 0 ? "In Progress" : "Completed",
    progress: Math.floor(Math.random() * 100),
    phase: `Phase ${1 + (i % 3)}`,
    documents: [{ name: `Doc${i + 1}.pdf` }],
    chat: [
      { from: "user", text: `Mensaje de usuario en Project ${String.fromCharCode(67 + i)}` },
      { from: "admin", text: `Respuesta admin en Project ${String.fromCharCode(67 + i)}` },
    ],
    description: `Descripción del proyecto ${String.fromCharCode(67 + i)}.`,
    date: `2024-05-${11 + i}`,
  })),
];

export const mockRequests = [
  {
    id: "a",
    name: "Request Uno",
    status: "Lead",
    service: "Web Design",
    plan: "Basic",
    chat: [
      { from: "user", text: "Mensaje de usuario en Request Uno" },
      { from: "admin", text: "Respuesta admin en Request Uno" },
    ],
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    date: "2024-05-12",
  },
  {
    id: "b",
    name: "Request Dos",
    status: "Lead",
    service: "SEO",
    plan: "Premium",
    chat: [
      { from: "user", text: "Mensaje de usuario en Request Dos" },
      { from: "admin", text: "Respuesta admin en Request Dos" },
    ],
    description: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    date: "2024-05-11",
  },
  // 8 más
  ...Array.from({ length: 8 }, (_, i) => ({
    id: String.fromCharCode(99 + i),
    name: `Request ${String.fromCharCode(67 + i)}`,
    status: "Lead",
    service: i % 2 === 0 ? "Branding" : "SEO",
    plan: i % 2 === 0 ? "Standard" : "Premium",
    chat: [
      { from: "user", text: `Mensaje de usuario en Request ${String.fromCharCode(67 + i)}` },
      { from: "admin", text: `Respuesta admin en Request ${String.fromCharCode(67 + i)}` },
    ],
    description: `Descripción del request ${String.fromCharCode(67 + i)}.`,
    date: `2024-05-${13 + i}`,
  })),
];
