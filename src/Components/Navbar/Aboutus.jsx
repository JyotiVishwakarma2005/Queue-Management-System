import aboutImg from "../../assets/Images/about-college.jpg";
import studentsImg from "../../assets/Images/about-college2.jpg"; // student image
import { motion } from "framer-motion";
import Footer from "../Footer/Footer";

const AboutUs = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative w-full h-96">
          <motion.img
            src={aboutImg}
            alt="College Overview"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
              About Smt. P. N. Doshi Women’s College
            </h1>
          </motion.div>
        </div>

        {/* Quick Links Section */}
        <div className="max-w-6xl mx-auto py-12 px-6">
          <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="/admission"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Admission
              </a>
            </li>
            <li>
              <a
                href="/student-corner"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Student Corner
              </a>
            </li>
            <li>
              <a
                href="/alumni"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Alumni
              </a>
            </li>
            <li>
              <a
                href="/information"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Information
              </a>
            </li>
          </ul>
        </div>

        {/* Student / Group Image Section */}
        <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col md:flex-row items-center gap-8">
          <motion.img
            src={studentsImg}
            alt="Students"
            className="w-full md:w-1/2 rounded shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="md:w-1/2 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-bold">Student Life & Campus</h2>
            <p className="text-gray-700">
              Our campus provides a vibrant learning environment for students
              with excellent infrastructure and supportive faculty. We nurture
              creativity, teamwork, and holistic development in every student.
            </p>
            <p className="text-gray-700">
              Students enjoy access to well-equipped classrooms, libraries,
              career counseling, and various co-curricular activities to enhance
              their learning experience.
            </p>
          </motion.div>
        </div>

        {/* Overview Section */}
        <div className="max-w-6xl mx-auto py-16 px-6 space-y-8">
          <motion.p
            className="text-gray-700 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Managed by <strong>SPRJ Kanyashala Trust</strong>, and conducted by
            Sarvajanik Education Society, Smt. P. N. Doshi Women’s College is
            one of its kind, which takes pride in caring for the underprivileged
            and nurturing good human beings. The vision of our Institution is to
            Educate, Enlighten and Empower girls.
          </motion.p>

          <motion.p
            className="text-gray-700 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            We strive to motivate the weak, address the average and challenge the
            gifted. The founders of this institution subscribed to the maxim of
            <strong> ‘Beti Bachao, Beti Padhao’</strong>.
          </motion.p>

          <motion.p
            className="text-gray-700 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            We provide education supported by various financial schemes to nearly
            5000 girls through our Junior colleges, Degree colleges, Professional
            Courses, Post Graduate Departments as well as Career Institute.
          </motion.p>

          <motion.p
            className="text-gray-700 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The guidance and vibrant learning atmosphere provided by our well
            qualified teachers help students respond to stimulating challenges,
            which coupled with excellent infrastructure facilities and support
            services lead to a successful “learning” experience.
          </motion.p>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700">
                To be recognized as a centre of excellence for women’s education
                that empowers them to become self-reliant and responsible citizens
                who contribute to building a healthy society.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700">
                To provide quality multidisciplinary skill-based higher education,
                strengthen scientific outlook among students, groom them to acquire
                global competencies and cater to the diverse needs of students
                through an inclusive approach and holistic development.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
