import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(105vh - 140px)" }}>{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;