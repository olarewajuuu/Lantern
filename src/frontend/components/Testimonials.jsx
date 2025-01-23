import React from 'react';
import './Testimonials.css';
import TopDesign from '../../layout/header/TopDesign';
import PeopleIcon from '../../../public/people.svg';
import kazPics from "../../../public/kaz.png";
import joyPics from "../../../public/joy.png";
import isaacPics from "../../../public/isaac.png";
import odunPics from "../../../public/odun.png";
import bummiPics from "../../../public/bummi.png";
import gbemiPics from "../../../public/gbemi.png";

const testimonials = [
  {
    name: 'Kazeem',
    text: 'A great score in my GRE EXAM which helped me secured a scholarship all thanks to the instructor i met via LANTERN',
    date: '3hrs ago',
    img: kazPics, 
  },
  {
    name: 'Joy',
    text: 'I was so naive at first, been a first time techie, but with Lantern i became confident, the mentorship sessions with my instructor really helped me',
    date: 'October 13, 2024',
    img: joyPics,
  },
  {
    name: 'Isaac',
    text: 'Lantern will always be a platform i can recommend any day, any time, their attention to details and readiness to see you through your class journey is awesome',
    date: '18hrs ago',
    img: isaacPics,
  },
  {
    name: 'Odunayo',
    text: 'At Lantern i’m forever thankful to their team, i had my training on Fronted development with them, they helped me secured a paid internship and today, i’m gainfully employed as a software engineer',
    date: 'November 12, 2024',
    img: odunPics,
  },
  {
    name: 'Oluwabunmi',
    text: 'I’m in the United Kingdom, but LANTERN is the best platform you can source for a top IELTS tutor, i was able to make band 8.0 in my last exams',
    date: 'November 24, 2024',
    img: bummiPics,
  },
  {
    name: 'Gbemi',
    text: 'I came across LANTERN formerly HITA on IG, i reached out to them for my data analysis classes, i was assigned to my instructor. One thing i love this platform for is their expertise and professionalism',
    date: 'December 8, 2024',
    img: gbemiPics,
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials" id='testimonials'>
        <TopDesign />
      <div className="people-svg">
        <img src={PeopleIcon} alt="People illustration" />
      </div>
      <h2 className="desktop-heading">See what our students are saying</h2>
      <h2 className="mobile-heading">Testimonials</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <div className="user-info">
              <img src={testimonial.img} alt={testimonial.name} className="user-image" />
              <h3>{testimonial.name}</h3>
         
            </div>
            <hr/>
            <p>“{testimonial.text}”</p>
            <span>{testimonial.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

