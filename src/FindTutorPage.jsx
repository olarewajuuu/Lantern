import React from "react";
import "./FindTutorPage.css"; 
import TopDesign from "./layout/header/TopDesign";
import { useState } from "react";
import Graduation from '../public/graduationcap.svg';

const tutors = [
  {
    heading: "Digital Marketing Tutors",
    name: "Abigail Ademola", 
    image: "https://randomuser.me/api/portraits/women/1.jpg", 
    students: "198",
    position: "Digital Marketing Tutor",
    rating: "5/5",
    reviews: "123",
    about:
      "I'm Abigail, a digital marketing expert with 5+ years of experience. I mentor beginners, helping them build practical skills for real-world marketing success.",
    course: "Digital marketing course",
    type:"online classes only",
    learn: [
      "No prior experience needed it's perfect for beginners.",
      "Master social media marketing for Facebook, TikTok, Twitter, SEO, and online ads.",
      "Learn how to promote brands and businesses online.",
      "Get skills that can lead to jobs in marketing or freelancing.",
      "Earn a certificate.",
    ],
      },
  {
    heading: "Software Engineering Tutors",
    name: "Jude Amabu",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    students: "144",
    position: "Software Engineering Tutor",
    rating: "5/5",
    reviews: "113",
    about:
      "I am Jude, a software engineer with 6 years of experience. My students have built real-world apps and landed remote roles at top tech companies.",
    course: "Software engineering course",
    type: "online and physical classes",
    learn: [
      "Learn how to build apps and websites from scratch.",
      "No coding experience needed we'll teach you step by step.",
      "Master popular coding languages like HTML, CSS, and JavaScript.",
      "Prepare for jobs like web developer or software engineer.",
      "Earn a certificate.",
    ],
  },
  
];

const FindTutorPage = () => {
  const [ratings, setRatings] = useState(tutors.map(() => 0)); 

  const handleStarClick = (index, tutorIndex) => {
    
    setRatings(prevRatings => {
      const newRatings = [...prevRatings];
      newRatings[tutorIndex] = index + 1;
      return newRatings;
    });
  };

  return (
    <div className="find-tutor-page">
      <TopDesign />
      <div className="graduation-cap">
      <img src={Graduation} alt="graduation cap" />
      </div>
      <header className="header">
        <h1 className="desktop-heading">Select a Tutor and Register Here</h1>
        <h1 className="mobile-heading">Select a Tutor</h1>
     
      </header>
      <div className="tutor-grid">
        {tutors.map((tutor, tutorIndex) => (
          <div key={tutorIndex} className="tutor-section">
        
            <div className="tutor-title-heading">{tutor.heading}</div>

            {/* Tutor Card */}
            <div className="tutor-card">
  
  <div className="tutor-info">
  <div
    className="tutor-image"
    style={{ backgroundImage: `url(${tutor.image})` }} 
  ></div>
  <div className="tutor-details">
  <div className="tutor-name-and-taught">
    <h2>{tutor.name}</h2>
    <p className="taught">Taught {tutor.students} students</p>
  </div>
  <p className="title">{tutor.position}</p>
</div>

</div>
<p className="highest-rated">
  Highest rated
  <span className="rating-stars">
    {Array(parseInt(tutor.rating.split('/')[0])).fill(0).map((_, i) => (
      <span key={i}>&#9733;</span> // Filled stars (★)
    ))}
    {Array(5 - parseInt(tutor.rating.split('/')[0])).fill(0).map((_, i) => (
      <span key={i + 5}>&#9734;</span> // Empty stars (☆)
    ))}
  </span>
  <span className="rating-number">
    {tutor.rating} rating ({tutor.reviews} reviews)
  </span>
</p>
<h3 className="aboutHeading"> About me </h3>
  <p className="about">{tutor.about}</p>
  <h3 className="course">{tutor.course}</h3>
  <p className="courseType"> ({tutor.type})</p>
<p className="learn">What you will learn</p>
<ul>
  {tutor.learn.map((item, idx) => (
    <li key={idx}>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="23" viewBox="0 0 14 23" fill="none">
        <path d="M9.17279 15.2731C9.39314 15.1104 9.65258 15 9.9265 15C10.5194 15 11 15.4806 11 16.0735V20.3818C11 21.8674 9.30041 22.7118 8.11653 21.8144C7.47978 21.3318 6.59423 21.3323 5.95265 21.8085C4.73937 22.709 3 21.8564 3 20.3455V16.112C3 15.4979 3.49785 15 4.11198 15C4.34044 15 4.56294 15.0711 4.75055 15.2015C5.43357 15.6761 5.98236 16 7 16C7.81504 16 8.58117 15.71 9.17279 15.2731ZM13.926 8.277C13.977 8.424 14 8.574 14 8.722C14 9.171 13.778 9.605 13.385 9.878C12.129 10.748 12.295 10.529 11.823 11.945C11.625 12.536 11.053 12.935 10.409 12.935H10.405C8.856 12.93 9.126 12.847 7.877 13.724C7.615 13.908 7.308 14 7 14C6.692 14 6.385 13.908 6.124 13.725C4.875 12.847 5.144 12.931 3.596 12.936H3.592C2.947 12.936 2.376 12.537 2.179 11.946C1.706 10.529 1.868 10.748 0.617 9.879C0.222 9.605 0 9.171 0 8.722C0 8.574 0.0239999 8.424 0.0739999 8.278C0.557 6.867 0.558 7.139 0.0739999 5.723C0.0239999 5.576 0 5.426 0 5.278C0 4.828 0.222 4.395 0.616 4.121C1.867 3.253 1.705 3.473 2.178 2.054C2.375 1.463 2.947 1.064 3.591 1.064H3.595C5.14 1.069 4.866 1.159 6.123 0.274C6.385 0.091 6.692 0 7 0C7.308 0 7.615 0.091 7.876 0.274C9.125 1.152 8.856 1.069 10.404 1.064H10.408C11.053 1.064 11.624 1.463 11.822 2.054C12.295 3.47 12.129 3.251 13.384 4.121C13.778 4.394 14 4.828 14 5.277C14 5.425 13.977 5.576 13.926 5.722C13.443 7.132 13.441 6.861 13.926 8.277ZM9.96898 6.02009C10.263 5.72048 10.2606 5.23987 9.96367 4.94317C9.66227 4.64204 9.17293 4.6452 8.87544 4.95019L6.8713 7.00488C6.45743 7.42918 5.77951 7.44243 5.34938 7.03462L5.12754 6.82428C4.82452 6.53699 4.34777 6.54345 4.05265 6.83884C3.74878 7.14299 3.75272 7.63701 4.06139 7.93628L4.82634 8.67792C5.54484 9.37452 6.69099 9.36027 7.39195 8.64601L9.96898 6.02009Z" fill="url(#paint0_linear_161_720)"/>
        <defs>
          <linearGradient id="paint0_linear_161_720" x1="7" y1="0" x2="7" y2="24" gradientUnits="userSpaceOnUse">
            <stop stop-color="#152F56"/>
            <stop offset="1" stop-color="#2E67BC"/>
          </linearGradient>
        </defs>
      </svg>
      <span>{item}</span>
    </li>
  ))}
</ul>


  <button className="register-btn">Register</button>

  <hr/>
 
  <div className="review-section">
        <h3><i className="fas fa-edit"></i>Reviews</h3>
        <p>We want to hear from you; how was your learning experience with{" "}
        {tutor.name.split(" ")[0]}? </p>
        <p>Rate {tutor.name.split(" ")[0]}  </p>
        <div className="ratings-stars">
                  {Array(5).fill().map((_, index) => (
                    <span 
                      key={index} 
                      className={index < ratings[tutorIndex] ? "filled" : "empty"}
                      onClick={() => handleStarClick(index, tutorIndex)}
                      style={{ cursor: "pointer" }}
                    >
                      &#9734;
                    </span>
                  ))}
                </div>
        <span className="optional">(Optional)</span>
        <textarea className="review-textarea" placeholder="Write your review here..."></textarea>
        <button className="register-btn submit-btn">Submit</button>
    </div>
</div>
<div className="seeAllContainer">
<button className="seeAll"> See all {tutor.heading}
<svg xmlns="http://www.w3.org/2000/svg" width="90" height="16" viewBox="0 0 90 16" fill="none" className="arrow">
    <path d="M89.7071 8.70711C90.0976 8.31658 90.0976 7.68342 89.7071 7.29289L83.3431 0.928932C82.9526 0.538408 82.3195 0.538408 81.9289 0.928932C81.5384 1.31946 81.5384 1.95262 81.9289 2.34315L87.5858 8L81.9289 13.6569C81.5384 14.0474 81.5384 14.6805 81.9289 15.0711C82.3195 15.4616 82.9526 15.4616 83.3431 15.0711L89.7071 8.70711ZM0 9H89V7H0V9Z" fill="#305FCD"/>
  </svg>
</button>
</div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default FindTutorPage;
