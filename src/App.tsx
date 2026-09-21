import { useEffect, useState } from "react"
import { Navbar } from "./components/Navbar"
import { PageRouter } from "./PageRouter"
import { useLocation } from 'react-router-dom'

function App() {
  const [currPage, setCurrPage] = useState("Home");
  const location = useLocation();

  useEffect(()=>{
    if(location.pathname.includes("/projects"))
      setCurrPage("Projects");
  }, [location]);

  return (
    <>
      <Navbar page={currPage} setPage={setCurrPage} tabs={[
        {name: "Home", path: "/"},
        {name: "Projects", path: "/projects"},
        {name: "Resume", path: "/resume"}
      ]}/>
      <PageRouter />
    </>
  )
}

export default App
