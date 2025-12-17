import React from 'react'
import Footer from '../Footer/Footer'
const Contact = () => {
  return (
    <>
  <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h2 
        style={{ cursor: "pointer", color: "blue" }}
      >
        Contact
      </h2>
        <div>
          <h3>ADDRESS :</h3>
          <p>
            Smt. P. N. Doshi Women's College,  
            Cama Lane, Ghatkopar (W),  
            Mumbai – 400 086
          </p>

          <p>
            <strong>Phone:</strong> 25135439
          </p>

          <p>
            <strong>Fax:</strong> 022-25094065
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:principalspndoshi@gmail.com">
              principalspndoshi@gmail.com
            </a>
          </p>
        </div>
    </div>
     <Footer/>
</>
  )
}


export default Contact
