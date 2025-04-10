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

    // Sample projects data
    const projects = [
        {
            id: "1",
            name: "Beach Resort Website",
            progress: 75,
            phase: "Project Phase",
        },
        { id: "2", name: "Corporate Portal", progress: 45, phase: "Design" },
        { id: "3", name: "E-commerce Platform", progress: 90, phase: "Testing" },
        { id: "4", name: "Mobile App", progress: 30, phase: "Development" },
    ];

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
                                    <ProfileProjectCard
                                        key={project.id}
                                        projectName={project.name}
                                        progress={project.progress}
                                        phase={project.phase}
                                    />
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
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className="h-[120px]">
                                            <ProfileProjectDetail
                                                description={`Project description ${index + 1}. Lorem ipsum dolor sit amet.`}
                                                documents={projectDocuments.slice(0, 2)}
                                                date={new Date()}
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
                                    <ProfileChat />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}