import "./App.css";
import Home from "./PortfolioContainer/Home/Home";
import AboutMe from "./PortfolioContainer/AboutMe/AboutMe";
import Resume from "./PortfolioContainer/Resume/Resume";
import ContactMe from "./PortfolioContainer/ContactMe/ContactMe";
import fire from "./firebase";

function App() {
  return (
    <div className="App">
      <Home />
      <AboutMe />
      <Resume />
      <ContactMe />
    </div>
  );
}

export default App;
