import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "../components/Container";

const AllRoute = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Container />}/>
        </Routes>
    </Router>
  )
}

export default AllRoute