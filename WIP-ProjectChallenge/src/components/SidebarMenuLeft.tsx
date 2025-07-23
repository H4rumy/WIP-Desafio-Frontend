import { useState } from "react";
import {Sidebar,SidebarContent, SidebarHeader, SidebarMenu,SidebarMenuItem, SidebarProvider,} from "./ui/sidebar";

import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlinePartition } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineTruck } from "react-icons/ai";
import { AiOutlineProfile } from "react-icons/ai";
import { AiOutlineCompass } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
interface SidebarMenuProps {
  onSelect: (item: string) => void;
}

export default function SidebarMenuLeft({ onSelect }: SidebarMenuProps) {
  const [selected, setSelected] = useState<string>("");

   function handleSelect(item: string) {
    setSelected(item);
    onSelect(item);
  }

  return (
    <SidebarProvider>
      <Sidebar className="w-64 h-screen fixed left-0 top-0 bg-gray-100 text-left pl-4">

    
        <SidebarHeader>
          <div className="pl-4 ">
            <img src="/img/WIP.png" alt="Logo" className="h-24 w-auto" />
          </div>
        </SidebarHeader>
        <SidebarContent className="py-4">
          <SidebarMenu className="space-y-4">
            <SidebarMenuItem  className={selected === "CreateArticles" ? "text-[#d67c7c] font-bold" : ""}
              onClick={() => handleSelect("CreateArticles")}>
                <AiOutlineAppstore className="inline mr-2" size={20}></AiOutlineAppstore>
              Create Articles
            </SidebarMenuItem>
            <SidebarMenuItem className={selected === "Backlog" ? "text-[#d67c7c] font-bold" : ""}
              onClick={() => handleSelect("Backlog")}>
                <AiOutlinePartition className="inline mr-2" size={20}></AiOutlinePartition>
              Backlog
            </SidebarMenuItem>
            <SidebarMenuItem className={selected === "Roadmap" ? "text-[#d67c7c] font-bold" : ""}
              onClick={() => handleSelect("Roadmap")}>
                <AiOutlineCompass className="inline mr-2" size={20}></AiOutlineCompass>
              Roadmap
            </SidebarMenuItem>
            <SidebarMenuItem className={selected === "Reports" ? "text-[#d67c7c] font-bold" : ""}
              onClick={() => handleSelect("Reports")}>
                <AiOutlineProfile className="inline mr-2" size={20}></AiOutlineProfile>
              Reports
            </SidebarMenuItem>
            <SidebarMenuItem className={selected === "Releases" ? "text-[#d67c7c] font-bold" : ""}
              onClick={() => handleSelect("Releases")}>
                <AiOutlineTruck className="inline mr-2" size={20}></AiOutlineTruck>
              Releases
            </SidebarMenuItem>

            <div className="border-b border-gray-200 my-2" />

            <SidebarMenuItem className={selected === "Teams" ? "text-[#d67c7c] font-bold" : ""}
              onClick={() => handleSelect("Teams")}>
                <IoPeopleOutline className="inline mr-2" size={20}></IoPeopleOutline>
              Teams
            </SidebarMenuItem>
            <SidebarMenuItem className={selected === "ProjectSettings" ? "text-[#d67c7c] font-bold" : ""}
              onClick={() => handleSelect("ProjectSettings")}>
                <AiOutlineSetting className="inline mr-2" size={20}></AiOutlineSetting>
              Project settings
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
