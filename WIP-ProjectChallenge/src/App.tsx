import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useState } from 'react';
import SidebarMenuLeft from "@/components/SidebarMenuLeft";
import CreateArticlePage from "./components/CreateArticlePage";

export default function App() {
  const [selected, setSelected] = useState("CreateArticles");

  return (
    <div className="flex h-screen">
      <SidebarMenuLeft onSelect={setSelected} />

      <main className="fixed">
        {selected === "CreateArticles" && <CreateArticlePage />}
        {selected !== "CreateArticles" && <div>Conteúdo {selected}</div>}
      </main>
    </div>
  );
}





