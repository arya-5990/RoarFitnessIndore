
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Programs from "./components/Programs";
import Blogs from "./components/Blogs";
import BlogDetail from "./components/BlogDetail";

function App() {
  return (
    <div className="font-vazirmatn text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
