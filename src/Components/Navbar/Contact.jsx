import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    course: '',
    admission: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry! We will get back to you soon.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }

        .card-hover {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .card-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .card-hover:hover::before {
          left: 100%;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          background: linear-gradient(135deg, #ffffff 0%, #f3e8ff 100%);
          border: 1px solid rgba(147, 51, 234, 0.2);
        }

        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }
        .delay-600 { animation-delay: 0.6s; opacity: 0; }
      `}</style>

      {/* Page Title with Back Button */}
      <div className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-700 hover:text-purple-900 mb-4 font-medium transition-colors animate-slideInLeft"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-gray-800 text-center animate-fadeInUp">Contact Us</h2>
          <p className="text-center text-gray-600 mt-2 animate-fadeInUp delay-100">Home &gt; Contact Us</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fadeInUp delay-200">
          <h3 className="text-2xl font-semibold text-purple-800 mb-2">
            YOU CAN REACH US THROUGH: 25135439
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Principal Section */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center card-hover animate-fadeInUp delay-300">
            <img 
              src="https://spndoshicollege.com/wp-content/uploads/2025/09/AshaMenon-Principal-80x80.jpg" 
              alt="Principal" 
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-200" 
            />
            <h4 className="text-lg font-semibold text-gray-800">Principal</h4>
            <p className="text-purple-700 font-medium">Dr. Aditi Maram</p>
            <p className="text-sm text-gray-600">Extension no. - 201</p>
            <a href="mailto:principaldoshicollege@gmail.com" className="text-blue-600 text-sm hover:underline">
              principaldoshicollege@gmail.com
            </a>
          </div>

          {/* Address Section */}
          <div className="bg-white p-6 rounded-lg shadow-md card-hover animate-fadeInUp delay-400">
            <div className="flex items-start space-x-3 mb-4">
              <MapPin className="w-5 h-5 text-purple-700 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Address</h4>
                <p className="text-gray-600 text-sm">
                  College Road, Ganjgolai (West), Mumbai - 400 048
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 mb-4">
              <Phone className="w-5 h-5 text-purple-700 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                <p className="text-gray-600 text-sm">022-25135439</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-purple-700 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                <a href="mailto:principaldoshicollege@gmail.com" className="text-blue-600 text-sm hover:underline">
                  principaldoshicollege@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info Only */}
          <div className="bg-white p-6 rounded-lg shadow-md card-hover animate-fadeInUp delay-500">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-purple-700 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                  <p className="text-gray-600 text-sm">022-25135439</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-purple-700 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Fax</h4>
                  <p className="text-gray-600 text-sm">022-25241603</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vice-Principals Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-100">
            <h5 className="font-semibold text-gray-800">Vice – Principal</h5>
            <p className="text-sm text-gray-600 mb-1">Arts</p>
            <p className="text-purple-700 font-medium">Prof. Madhumita Bandyopadhyay</p>
            <p className="text-sm text-gray-600">Extension no. - 216</p>
            <a href="mailto:vparts@spndoshi.com" className="text-blue-600 text-xs hover:underline">
              vparts@spndoshi.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-200">
            <h5 className="font-semibold text-gray-800">Vice – Principal</h5>
            <p className="text-sm text-gray-600 mb-1">Commerce</p>
            <p className="text-purple-700 font-medium">Mr. Raju Chauhan</p>
            <p className="text-sm text-gray-600">Extension no. - 211</p>
            <a href="mailto:commercefacultyspnd@gmail.com" className="text-blue-600 text-xs hover:underline">
              commercefacultyspnd@gmail.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-300">
            <h5 className="font-semibold text-gray-800">Vice – Principal</h5>
            <p className="text-sm text-gray-600 mb-1">Home Science</p>
            <p className="text-purple-700 font-medium">Dr. Rekha Randive</p>
            <p className="text-sm text-gray-600">Extension no. - 216</p>
            <a href="mailto:vpbsc@spndoshi.com" className="text-blue-600 text-xs hover:underline">
              vpbsc@spndoshi.com
            </a>
          </div>
        </div>

        {/* Second Row - Only 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 md:max-w-2xl md:mx-auto">
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-100">
            <h5 className="font-semibold text-gray-800">Vice – Principal</h5>
            <p className="text-sm text-gray-600 mb-1">Junior College</p>
            <p className="text-purple-700 font-medium">Smt. Seethalakshmi S.</p>
            <p className="text-sm text-gray-600">Extension no. - 211</p>
            <a href="mailto:stmehtajrcollege@gmail.com" className="text-blue-600 text-xs hover:underline">
              stmehtajrcollege@gmail.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-200">
            <h5 className="font-semibold text-gray-800">Supervisor (Jun. Col.)</h5>
            <p className="text-purple-700 font-medium">Mrs. Harshavardhini Pota</p>
            <p className="text-sm text-gray-600">Extension no. - 211</p>
          </div>
        </div>

        {/* Co-ordinators Section - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-100">
            <h5 className="font-semibold text-gray-800">Co-ordinator</h5>
            <p className="text-sm text-gray-600 mb-1">BCA</p>
            <p className="text-purple-700 font-medium">Dr. Suchita Bhovar</p>
            <a href="mailto:spnd.bcadepartment@gmail.com" className="text-blue-600 text-xs hover:underline">
              spnd.bcadepartment@gmail.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-200">
            <h5 className="font-semibold text-gray-800">Co-ordinator</h5>
            <p className="text-sm text-gray-600 mb-1">BMS</p>
            <p className="text-purple-700 font-medium">Dr. Veena Shete</p>
            <a href="mailto:spnd.bmsdept@gmail.com" className="text-blue-600 text-xs hover:underline">
              spnd.bmsdept@gmail.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-300">
            <h5 className="font-semibold text-gray-800">Co-ordinator</h5>
            <p className="text-sm text-gray-600 mb-1">BAMMC</p>
            <p className="text-purple-700 font-medium">Dr. Nimisha Kambli</p>
            <a href="mailto:spndoshibamm@gmail.com" className="text-blue-600 text-xs hover:underline">
              spndoshibamm@gmail.com
            </a>
          </div>
        </div>

        {/* Co-ordinators Section - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-100">
            <h5 className="font-semibold text-gray-800">Co-ordinator</h5>
            <p className="text-sm text-gray-600 mb-1">BAF</p>
            <p className="text-purple-700 font-medium">Ms. Sapana Dey</p>
            <p className="text-sm text-gray-600">Extension no. - 215</p>
            <a href="mailto:coordinatorbaf@spndoshi.com" className="text-blue-600 text-xs hover:underline">
              coordinatorbaf@spndoshi.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-200">
            <h5 className="font-semibold text-gray-800">Co-ordinator</h5>
            <p className="text-sm text-gray-600 mb-1">M.A.</p>
            <p className="text-purple-700 font-medium">Extension no. - 215/224</p>
            <a href="mailto:mapsychology2020@gmail.com" className="text-blue-600 text-xs hover:underline">
              mapsychology2020@gmail.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-300">
            <h5 className="font-semibold text-gray-800">Co-ordinator</h5>
            <p className="text-sm text-gray-600 mb-1">M.Com</p>
            <p className="text-purple-700 font-medium">Ms. Pankti Gosaliya</p>
            <p className="text-sm text-gray-600">Extension no. - 215/224</p>
            <a href="mailto:spndmcom@gmail.com" className="text-blue-600 text-xs hover:underline">
              spndmcom@gmail.com
            </a>
          </div>
        </div>

        {/* Co-ordinators Section - Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-100">
            <h5 className="font-semibold text-gray-800">Co-ordinator</h5>
            <p className="text-sm text-gray-600 mb-1">Swadhar Career Inst.</p>
            <p className="text-purple-700 font-medium">Dr. S. Kumudhavalli</p>
            <p className="text-sm text-gray-600">Extension no. - 217/211</p>
            <a href="mailto:swadhar@yahoo.co.in" className="text-blue-600 text-xs hover:underline">
              swadhar@yahoo.co.in
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-200">
            <h5 className="font-semibold text-gray-800">Co-ordinator</h5>
            <p className="text-sm text-gray-600 mb-1">MA-Hindi</p>
            <p className="text-purple-700 font-medium">Dr. VedPrakash Dubey</p>
            <a href="mailto:spnhdptspnd@gmail.com" className="text-blue-600 text-xs hover:underline">
              spnhdptspnd@gmail.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-300">
            <h5 className="font-semibold text-gray-800">Co-ordinator</h5>
            <p className="text-sm text-gray-600 mb-1">MSc. HD</p>
            <p className="text-purple-700 font-medium">Dr. Shobha Bharat</p>
            <a href="mailto:spndmastersceco@gmail.com" className="text-blue-600 text-xs hover:underline">
              spndmastersceco@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Row - Only 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-2xl md:mx-auto">
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-100">
            <h5 className="font-semibold text-gray-800">In-Charge Registrar</h5>
            <p className="text-purple-700 font-medium">Mr. Shailesh Chandulal Nayak</p>
            <p className="text-sm text-gray-600">Extension no. - 202</p>
            <a href="mailto:registrar@spndoshi.com" className="text-blue-600 text-xs hover:underline">
              registrar@spndoshi.com
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center card-hover animate-fadeInUp delay-200">
            <h5 className="font-semibold text-gray-800">Librarian</h5>
            <p className="text-purple-700 font-medium">Smt. Ketaki Deshpande</p>
            <p className="text-sm text-gray-600">Extension no. - 214</p>
            <a href="mailto:librarian@spndoshi.com" className="text-blue-600 text-xs hover:underline">
              librarian@spndoshi.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;