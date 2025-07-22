import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import CreateArticlePage from "./components/CreateArticlePage";
import SidebarMenuLeft from "@/components/SidebarMenuLeft";

function App() {

 const [selected, setSelected] = useState<string>("CreateArticles");

   return (
    <div className="h-screen flex">
      <SidebarMenuLeft onSelect={setSelected} />
      <main className="flex-1 p-4 ml-64">
        {selected === "CreateArticles" && <CreateArticlePage />}
        {selected === "Backlog" && <div> Não há conteúdo para Backlog.</div>}
        {selected === "Roadmap" && <div> Não há conteúdo para Roadmap.</div>}
        {selected === "Reports" && <div> Não há conteúdo para Reports.</div>}
        {selected === "Releases" && <div> Não há conteúdo para Releases.</div>}
        {selected === "Teams" && <div> Não há conteúdo para Teams.</div>}
        {selected === "ProjectSettings" && <div> Não há conteúdo para Project Settings.</div>}
      </main>
    </div>
  );
}

export default App;

