import BecomeTutorForm from "../../frontend/components/BecomeTutorForm";

import FindTutorPage from "../../frontend/components/FindTutorPage";
import Fqa from "../../frontend/components/Fqa";
import ChatButton from "../../frontend/components/ChatButton";
import Homepage from "../../frontend/components/Homepage";
import Testimonials from "../../frontend/components/Testimonials";
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
