"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MainLayout } from "@/presentation/templates/main-layout";
import { ProfileChat } from "@/presentation/atoms/chat/profile-chat";
import { ProfileProjectCard } from "@/presentation/atoms/profile-project/profile-project-card";
import { ProfileProjectDetail } from "@/presentation/atoms/profile-project/profile-project-detail";

// Sample documents data
const projectDocuments = [
    { id: "doc1", name: "Document1.docx", url: "#" },
    { id: "doc2", name: "Document2.docx", url: "#" },
    { id: "doc3", name: "Document3.docx", url: "#" },
    { id: "doc4", name: "Document4.docx", url: "#" },
    { id: "doc5", name: "Document1.docx", url: "#" },
    { id: "doc6", name: "Document2.docx", url: "#" },
    { id: "doc7", name: "Document3.docx", url: "#" },
    { id: "doc8", name: "Document4.docx", url: "#" }
];

export function ProfileProjects() {
    const [activeTab, setActiveTab] = useState<"leads" | "projects">("projects");
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    // Sample projects data
    const projects = [
        {
            id: "1",
            name: "Beach Resort Website",
            progress: 75,
            phase: "Project Phase",
            details: [
                {
                    description: "Initial design mockups completed. Waiting for client feedback.",
                    documents: projectDocuments.slice(0, 2),
                    date: new Date(2023, 5, 15)
                },
                {
                    description: "Homepage and about page development completed.",
                    documents: projectDocuments.slice(2, 4),
                    date: new Date(2023, 6, 1)
                }
            ],
            chatHistory: [
                { sender: "client" as const, message: "How's the progress on the homepage?", timestamp: new Date(2023, 5, 20) },
                { sender: "agent" as const, message: "We've completed the initial design. I'll send you the mockups today.", timestamp: new Date(2023, 5, 20) }
            ]
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
                    date: new Date(2023, 4, 10)
                }
            ],
            chatHistory: [
                { sender: "agent" as const, message: "We've completed the user research phase. Would you like to schedule a call to discuss the findings?", timestamp: new Date(2023, 4, 12) },
                { sender: "client" as const, message: "Yes, that would be great. How about tomorrow at 2pm?", timestamp: new Date(2023, 4, 12) }
            ]
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
                    date: new Date(2023, 3, 5)
                },
                {
                    description: "User testing completed with minor issues identified.",
                    documents: projectDocuments.slice(3, 5),
                    date: new Date(2023, 3, 20)
                },
                {
                    description: "Final revisions based on user feedback.",
                    documents: projectDocuments.slice(5, 7),
                    date: new Date(2023, 4, 1)
                }
            ],
            chatHistory: [
                { sender: "client" as const, message: "When can we expect the platform to go live?", timestamp: new Date(2023, 4, 5) },
                { sender: "agent" as const, message: "We're aiming for next week. Just finalizing some minor fixes from the user testing.", timestamp: new Date(2023, 4, 5) }
            ]
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
                    date: new Date(2023, 5, 1)
                }
            ],
            chatHistory: [
                { sender: "agent" as const, message: "We've started the development phase. Would you like to see the current progress?", timestamp: new Date(2023, 5, 10) },
                { sender: "client" as const, message: "Yes, please share a demo when available.", timestamp: new Date(2023, 5, 10) }
            ]
        },
    ];

    // Find the selected project
    const selectedProject = projects.find(project => project.id === selectedProjectId) || projects[0];

    // Handle project selection
    const handleProjectSelect = (projectId: string) => {
        setSelectedProjectId(projectId);
    };

    return (
        <MainLayout>
            <section className="bg-gray-50 ">
                <div className="w-full px-5 py-4 overflow-x-hidden lg:mt-0 mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-6">
                        {/* Left column - Projects list */}
                        <div className="bg-white rounded-lg p-4" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                            {/* Tabs */}
                            <div className="flex mb-4">
                                <button
                                    className={cn(
                                        "px-6 py-0 rounded-full mr-2 text-lg font-bold",
                                        activeTab === "leads"
                                            ? "bg-[#99CC33] text-white"
                                            : "bg-transparent text-[#739926] border border-[#99CC33]"
                                    )}
                                    onClick={() => setActiveTab("leads")}
                                >
                                    Leads
                                </button>
                                <button
                                    className={cn(
                                        "px-6 py-0 rounded-full text-lg font-bold",
                                        activeTab === "projects"
                                            ? "bg-[#99CC33] text-white"
                                            : "bg-transparent text-[#739926] border border-[#99CC33]"
                                    )}
                                    onClick={() => setActiveTab("projects")}
                                >
                                    Projects
                                </button>
                            </div>

                            {/* Project cards container */}
                            <div
                                className="h-[650px] overflow-y-auto space-y-4 pr-2"
                                style={{
                                    msOverflowStyle: 'none',
                                    scrollbarWidth: 'none'
                                }}
                            >
                                <style jsx>{`
                                    div::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>
                                {activeTab === "projects" && projects.map((project) => (
                                    <div 
                                        key={project.id} 
                                        onClick={() => handleProjectSelect(project.id)}
                                        className="cursor-pointer"
                                    >
                                        <ProfileProjectCard
                                            projectName={project.name}
                                            progress={project.progress}
                                            phase={project.phase}
                                            isSelected={selectedProjectId === project.id}
                                        />
                                    </div>
                                ))}
                                {activeTab === "leads" && (
                                    <div className="text-center text-gray-500 mt-10">
                                        No leads available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right column - Project details and chat */}
                        <div className="flex flex-col space-y-6">
                            {/* Project details section */}
                            <div className="bg-white rounded-lg p-4 max-w-full h-[300px] overflow-auto" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                                <style jsx>{`
                                    div::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>
                                <div className="grid grid-cols-1 gap-4 h-full overflow-y-auto">
                                    {selectedProject.details.map((detail, index) => (
                                        <div key={index} className="h-[120px]">
                                            <ProfileProjectDetail
                                                description={detail.description}
                                                documents={detail.documents}
                                                date={detail.date}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chat section */}
                            <div className="bg-white rounded-lg p-4 flex-1 max-h-[420px]" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                <div className="mb-4">
                                    <div className="px-6 py-0 rounded-full bg-[#99CC33] text-white text-center font-bold text-lg w-24">
                                        Chat
                                    </div>
                                </div>
                                <div className="h-[calc(100%-48px)] overflow-y-auto"
                                     style={{ 
                                         msOverflowStyle: 'none',
                                         scrollbarWidth: 'none'
                                     }}>
                                    <style jsx>{`
                                        div::-webkit-scrollbar {
                                            display: none;
                                        }
                                    `}</style>
                                    <ProfileChat messages={selectedProject.chatHistory} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}