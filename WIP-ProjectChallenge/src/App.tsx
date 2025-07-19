import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { CreateArticlePage } from "@/components/CreateArticlePage";

function App() {
  return (
    <div className="p-4">
      <CreateArticlePage />
    </div>
  );
}

export default App
