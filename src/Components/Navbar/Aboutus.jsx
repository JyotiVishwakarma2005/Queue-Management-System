
import React, { useState } from "react";

const Aboutus = () => {
  const [showOverview, setShowOverview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showVision, setShowVision] = useState(false);
  const [showMission, setShowMission] = useState(false);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; }

        .about-page {
          background: #f5f5f5;
          min-height: 100vh;
        }

        /* HERO SECTION */
        .about-hero {
          background: #efe8f4;
          padding: 50px 60px;
          display: flex;
          gap: 40px;
          align-items: center;
          justify-content: center;
        }

        .about-hero img {
          width: 320px;
          height: 220px;
          object-fit: cover;
          border-radius: 10px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        .about-text h1 {
          color: #3b1d5a;
          margin-bottom: 10px;
        }

        .about-text p {
          font-size: 15px;
          line-height: 1.7;
          color: #333;
          max-width: 520px;
        }

        /* CONTENT */
        .about-content {
          background: white;
          padding: 40px 60px;
        }

        .section-title {
          font-size: 18px;
          margin-bottom: 20px;
          color: #3b1d5a;
          font-weight: bold;
          text-align: center;
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .about-box {
          padding: 18px;
          border: 1px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #fff;
          text-align: center;
        }

        .about-box:hover {
          background: #3b1d5a;
          color: white;
          transform: translateY(-5px);
        }

        .about-box h3 {
          font-size: 15px;
          margin: 0;
        }

        /* OVERVIEW + HISTORY COMMON */
        .inner-page {
          background: white;
          padding: 40px 60px;
        }

        .page-title {
          text-align: center;
          font-size: 22px;
          margin-bottom: 30px;
          color: #3b1d5a;
        }

        .back-btn {
          margin-bottom: 20px;
          cursor: pointer;
          font-weight: bold;
          color: #3b1d5a;
        }

        /* OVERVIEW */
        .overview-main img {
          width: 100%;
          max-width: 850px;
          margin: 0 auto 25px;
          display: block;
          border-radius: 10px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }

        .overview-main p {
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 18px;
          color: #333;
        }

        /* HISTORY */
        .history-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
          align-items: flex-start;
        }

        .history-layout img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }

        .history-highlight {
          color: #8b1c2d;
          font-weight: bold;
          line-height: 1.6;
          margin-bottom: 15px;
        }

        .history-text {
          font-size: 15px;
          line-height: 1.8;
          color: #333;
        }

        .history-box {
          background: #f1ebff;
          padding: 14px 18px;
          margin-top: 15px;
          border-radius: 6px;
          font-size: 14px;
        }

        /* RESPONSIVE */
        @media (max-width: 992px) {
          .about-hero { flex-direction: column; text-align: center; }
          .about-grid { grid-template-columns: repeat(2, 1fr); }
          .history-layout { grid-template-columns: 1fr; }
        }

        @media (max-width: 576px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-content,
          .inner-page { padding: 20px; }
        }

        /* ================= TIMELINE ================= */
        .timeline-title {
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #3b1d5a;
          margin: 40px 0 30px;
        }

        .timeline {
          position: relative;
          max-width: 900px;
          margin: auto;
          padding: 20px 0;
        }

        /* vertical line */
        .timeline::after {
          content: "";
          position: absolute;
          width: 3px;
          background-color: #3b1d5a;
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -1.5px;
        }

        /* timeline item */
        .timeline-item {
          padding: 15px 30px;
          position: relative;
          width: 50%;
        }

        /* circles */
        .timeline-item::after {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          right: -7px;
          background-color: white;
          border: 3px solid #3b1d5a;
          top: 30px;
          border-radius: 50%;
          z-index: 1;
        }

        /* left side */
        .timeline-item.left {
          left: 0;
          text-align: right;
        }

        .timeline-item.left::after {
          right: -7px;
        }

        /* right side */
        .timeline-item.right {
          left: 50%;
        }

        .timeline-item.right::after {
          left: -7px;
        }

        /* content box */
        .timeline-content {
          background: #f1ebff;
          padding: 14px 18px;
          border-radius: 6px;
          font-size: 14px;
          display: inline-block;
          max-width: 320px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        /* year */
        .timeline-year {
          font-weight: bold;
          color: #8b1c2d;
          margin-bottom: 6px;
        }

        /* responsive */
        @media (max-width: 768px) {
          .timeline::after {
            left: 20px;
          }

          .timeline-item {
            width: 100%;
            padding-left: 60px;
            padding-right: 25px;
          }

          .timeline-item.right {
            left: 0%;
          }

          .timeline-item.left {
            text-align: left;
          }

          .timeline-item::after {
            left: 13px;
          }
        }
      `}</style>

      <div className="about-page">

        {/* ================= ABOUT PAGE ================= */}
        {!showOverview && !showHistory && !showVision && !showMission && (
          <>
            <div className="about-hero">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
                alt="College"
              />
              <div className="about-text">
                <h1>About Our College</h1>
                <p>
                  SMT P.N. Doshi Women's College of Arts is managed by SPRJ
                  Kanyashala Trust. The institution is dedicated to empowering
                  women through quality education.
                </p>
              </div>
            </div>

            <div className="about-content">
              <div className="section-title">College Information</div>

              <div className="about-grid">
                <div className="about-box" onClick={() => setShowOverview(true)}>
                  <h3>Overview</h3>
                </div>

                <div className="about-box" onClick={() => setShowHistory(true)}>
                  <h3>History of the College</h3>
                </div>

                <div className="about-box" onClick={() => setShowVision(true)}>
                  <h3>Vision</h3>
                </div>

                <div className="about-box" onClick={() => setShowMission(true)}>
                  <h3>Mission</h3>
                </div>

                <div className="about-box" onClick={() => window.open('https://spndoshicollege.com/wp-content/uploads/2025/08/savajanik_MOA.pdf', '_blank')}>
                  <h3>The Sarvajanik Education Society - MOA</h3>
                </div>
                
                <div className="about-box" onClick={() => window.open('https://spndoshicollege.com/wp-content/uploads/2025/08/Maharashtra-Public-University-Act-2016.pdf', '_blank')}>
                  <h3>Maharashtra Public University Act 2016</h3>
                </div>
                
                <div className="about-box" onClick={() => window.open('https://spndoshicollege.com/aishe-certificate/', '_blank')}>
                  <h3>AISHE (DCF) Certificates</h3>
                </div>
                 <div className="about-box" onClick={() => window.open('https://spndoshicollege.com/wp-content/uploads/2025/08/annual-Accounts-2025.pdf', '_blank')}>
                  <h3>Annual Accounts</h3>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================= OVERVIEW PAGE ================= */}
        {showOverview && (
          <div className="inner-page">
            <div className="back-btn" onClick={() => setShowOverview(false)}>
              ← Back to About
            </div>

            <div className="page-title">Overview</div>

            <div className="overview-main">
              <img src="https://spndoshicollege.com/wp-content/uploads/2025/08/overview-center.jpg" />
              <p>
                SPRJ Kanyashala Trust, a pioneer in women's education, visualized and promoted women's education at a time when it was not a priority. Smt. P.N. Doshi Women's College was established by the trust in 1960. The college started with five students in B.A and has grown into a multi-faculty institution with five thousand students.

Our vision is "To be recognized as a centre of excellence for women's education that empowers them to become self-reliant and responsible citizens who would contribute to building a healthy society".
              </p>

              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" />
              <p>
                Our Mission is "To provide quality multidisciplinary skill-based higher education, to strengthen scientific outlook among students, grooming them to acquire global competencies and catering to the diverse needs of students through an inclusive approach and holistic development by creating conducive eco-system." Our college is accredited with <strong>'A' </strong>Grade by National Assessment and Accreditation Council in 2003, 2010, 2016 and 2023 (Four consecutive cycles).
              </p>
            </div>
          </div>
        )}

        {/* ================= HISTORY PAGE ================= */}
        {showHistory && (
          <div className="inner-page">
            <div className="back-btn" onClick={() => setShowHistory(false)}>
              ← Back to About
            </div>

            <div className="page-title">History</div>

            <div className="history-layout">
              <img src="https://spndoshicollege.com/wp-content/uploads/2025/08/history_spnCollege.jpg" />

              <div>
                <div className="history-highlight">
                  Way back in 1924, when women's education was not remotely on the
                  agenda of social reformers, visionaries conceived the idea of an
                  establishment that paved the way for women's empowerment.
                </div>

                <p className="history-text">
                They established the SPRJ Kanyashala Trust, with the lofty ideal of providing free education from primary school up to post-graduation, to girls, especially from underprivileged sections of society. Thus, were born, Smt. P. N. Doshi Women’s college of Arts, Kumari .U. R. Shah Women’s college of Commerce and Dr (Smt.) Nanavati B. M. Women’s college of Home Science.
                </p>
              </div>
            </div>

            <div className="history-box">📘 Thirteen Undergraduate Courses</div>
            <div className="history-box">🎓 Five Post-Graduate Courses</div>
            <div className="history-box">🏫 Ph.D. Centre in Commerce</div>
         
            {/* TIMELINE */}
            <div className="timeline-title">Important Milestones</div>

            <div className="timeline">
              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-year">1960</div>
                  Establishment of the college
                </div>
              </div>

              <div className="timeline-item right">
                <div className="timeline-content">
                  <div className="timeline-year">1973</div>
                  Started B.A. in Economics
                </div>
              </div>

              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-year">1987</div>
                  Degree College in Home Science
                </div>
              </div>

              <div className="timeline-item right">
                <div className="timeline-content">
                  <div className="timeline-year">2004</div>
                  Career Oriented Programs Started
                </div>
              </div>

              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-year">2004</div>
                  Started UGC sponsored Career Oriented Programmes
                </div>
              </div>

              <div className="timeline-item right">
                <div className="timeline-content">
                  <div className="timeline-year">2004</div>
                  Establishment of Swadhar Career Institute
                </div>
              </div>

              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-year">2008</div>
                  Started BMS, BMM and BCA
                </div>
              </div>

              <div className="timeline-item right">
                <div className="timeline-content">
                  <div className="timeline-year">2012</div>
                  Added specialization in Accountancy and Finance to Commerce Faculty
                </div>
              </div>

              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-year">2012</div>
                  Started specialization in Animation for BMM
                </div>
              </div>

              <div className="timeline-item right">
                <div className="timeline-content">
                  <div className="timeline-year">2018</div>
                  Dr. (Smt.) Asha Menon took charge as Principal
                </div>
              </div>

              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-year">2021</div>
                  Started specialization in Counseling Psychology for MA
                </div>
              </div>

              <div className="timeline-item right">
                <div className="timeline-content">
                  <div className="timeline-year">2022</div>
                  Started MA (Hindi) and MSc. (Early Childhood Education)
                </div>
              </div>

              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-year">2023</div>
                  Started Ph.D. Centre in Commerce
                </div>
              </div>

              <div className="timeline-item right">
                <div className="timeline-content">
                  <div className="timeline-year">2025</div>
                  Granted Autonomous Status by University Grants Commission (UGC)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VISION PAGE ================= */}
        {showVision && (
          <div className="inner-page">
            <div className="back-btn" onClick={() => setShowVision(false)}>
              ← Back to About
            </div>

            <div className="page-title">Vision</div>

            <div className="history-layout">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1" alt="Vision" />

              <div>
                <div className="history-highlight" style={{fontSize: '16px'}}>
                  Our Vision
                </div>

                <p className="history-text" style={{color: '#8b1c2d', fontWeight: 'bold', fontSize: '15px'}}>
                  To Be Recognized As A Centre Of Excellence For Women's Education That Empowers Them To Become Self-Reliant And Responsible Citizens Who Would Contribute To Building A Healthy Society
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= MISSION PAGE ================= */}
        {showMission && (
          <div className="inner-page">
            <div className="back-btn" onClick={() => setShowMission(false)}>
              ← Back to About
            </div>

            <div className="page-title">Mission</div>

            <div className="history-layout">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1" alt="Mission" />

              <div>
                <div className="history-highlight" style={{fontSize: '16px'}}>
                  Our Mission
                </div>

                <p className="history-text" style={{color: '#8b1c2d', fontWeight: 'bold', fontSize: '15px'}}>
                  To Provide Quality Multidisciplinary Skill-Based Higher Education, To Strengthen Scientific Outlook Among Students, Grooming Them To Acquire Global Competencies And Catering To The Diverse Needs Of Students Through An Inclusive Approach And Holistic Development By Creating Conducive Eco-System.
                </p>
              </div>
            </div>

            <div className="page-title" style={{marginTop: '40px', fontSize: '18px'}}>📋 Objectives</div>

            <div style={{maxWidth: '900px', margin: '0 auto'}}>
              <div className="history-box">✓ To Offer Equal Opportunities To Students From Diverse Backgrounds</div>
              <div className="history-box">✓ To Instill A Sense Of Responsibility Towards Self And Society</div>
              <div className="history-box">✓ To Emphasize Student Centric Approach To Inculcate Self-Efficacy</div>
              <div className="history-box">✓ To Focus On Comprehensive Holistic Development By Creating A Conducive Eco-System</div>
              <div className="history-box">✓ To Offer Employability Skills And Entrepreneurship Opportunities Leading To Economic Independence</div>
            </div>
          </div>
        )}
          
      </div>
    </>
  );
};

export default Aboutus;