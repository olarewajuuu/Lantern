import React from 'react';
import './Testimonials.css';
import TopDesign from './layout/header/TopDesign';
import PeopleIcon from '../public/people.svg';

const testimonials = [
  {
    name: 'Tola. A',
    text: 'I had no tech background, the tutors made it so easy to learn, I am building my first app now',
    date: '3hrs ago',
    img: 'https://randomuser.me/api/portraits/women/3.jpg', // Replace with actual image paths
  },
  {
    name: 'Zainab Adams',
    text: 'This platform change my life. After completing the virtual assistant course, I got a job with a UK company, I can now take good care of my mom and dad',
    date: 'October 13, 2024',
    img: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Emeka. E',
    text: 'Learning from real professionals on this platform helped land my first job as a software engineer with a European Start-up, the mentorship was amazing',
    date: '18hrs ago',
    img: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Ngozi',
    text: 'Thanks to this platform, I now work at a top digital marketing company in Lagos as a digital marketer',
    date: 'November 12, 2024',
    img: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    name: 'Chioma Udeze',
    text: 'The flexible learning schedule allows me to learn at my own pace, I am confident of starting a new career as a UX/UI designer',
    date: 'November 24, 2024',
    img: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    name: 'Bisi Ademola',
    text: 'I was tired of jumping from one job to another. I now work as a data analyst and I love what I do',
    date: 'December 8, 2024',
    img: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
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
            <p>"{testimonial.text}"</p>
            <span>{testimonial.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

