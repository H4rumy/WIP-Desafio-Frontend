import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Button } from "@/components/ui/button"; //adicionado

function App() {
  return (
    <div>
      <Button>Botão ShadCN</Button>
    </div>
  );
}

export default App

/*
return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div className="text-xl font-medium text-black">Hello Tailwind!</div>
        <p className="text-gray-500">teste.</p>
      </div>
    </div>
  );
  */