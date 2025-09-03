import React, {useState, useEffect} from "react";
import api from "../api";

function Navgate() {

  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    api.get("/personal-info/").then((res)=>{
      if (res.data.length > 0){
        setPersonalInfo(res.data[0]);
      }
    }).catch((err) => console.error(err));
  }, []);
  
  return (
      <header className="fixed top-0 left-0 w-full bg-gray-800 shadow z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-blue-400">
          {personalInfo?.fname} {personalInfo?.lname}
        </div>
        <ul className="hidden md:flex space-x-8 font-medium">
          <li><a href="#introduction" className="hover:text-blue-400">Intro</a></li>
          <li><a href="#about" className="hover:text-blue-400">About</a></li>
          <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}
export default Navgate;