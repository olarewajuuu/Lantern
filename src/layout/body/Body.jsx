import BecomeTutorForm from "../../BecomeTutorForm";
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
      <BecomeTutorForm />
      <Footer />

    </div>
  );
};

export default Body;
