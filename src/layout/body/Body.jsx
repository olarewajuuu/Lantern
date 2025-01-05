import ChatButton from "../../components/ChatButton";
import FindTutorPage from "../../FindTutorPage";
import Fqa from "../../Fqa";
import Homepage from "../../frontend/modules/Hompage/Homepage";
import Testimonials from "../../Testimonials";
import Footer from "../footer/Footer";

const Body = () => {
  return (
    <div>

      <Homepage />
      <FindTutorPage />
      <Testimonials />
      <ChatButton />
      <Fqa />
      <Footer />

    </div>
  );
};

export default Body;
