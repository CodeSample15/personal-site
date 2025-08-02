import { Navbar } from "./components/Navbar"
import { PageRouter } from "./PageRouter"

function App() {
  return (
    <>
      <Navbar defaultPage="Home" tabs={[
        {name: "Home", path: "/"},
        {name: "About", path: '/about'},
        {name: "Projects", path: "/projects"},
        {name: "Drones", path: "/drones"},
        {name: "Resume", path: "/resume"}
      ]}/>
      <PageRouter />
    </>
  )
}

export default App
