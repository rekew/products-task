import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "./store/store";
import Routing from "./Routing";

function App() {
  const { data, fetchData } = useStore();

  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <>
      <Router>
        <Routing />
      </Router>
    </>
  );
}

export default App;
