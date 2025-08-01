import { Navbar } from "./components/Navbar"
import { PageRouter } from "./PageRouter"

function App() {
  return (
    <>
      <Navbar defaultPage="Home" tabs={[
        {name: "Home", path: "/"},
        {name: "Projects", path: "/projects"},
        {name: "Drones", path: "/drones"},
      ]}/>
      <PageRouter />
    </>
  )
}

export default App
