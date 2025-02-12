import React, { useEffect, useState } from "react";
import axios from "axios";

const GetLandDetails = () => {
  const [lands, setLands] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to show the form
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await axios.get(
          "https://modcom2.pythonanywhere.com/api/get_product_details"
        );
        // Reverse the order of the lands to display the most recently added land first
        setLands(response.data.reverse());
      } catch (error) {
        console.error("Error fetching land details:", error);
      }
    };

    fetchLandDetails();
  }, []);

  const handlePaymentSubmit = async () => {
    // Send the amount and phone number to the payment API
    try {
      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/mpesa_payment",
        {
          amount: amount,
          phone: phone,
        }
      );
      console.log("Payment response:", response);
      // Handle the response appropriately
      alert("Payment Successful!");
      setShowPaymentForm(false);
    } catch (error) {
      console.error("Error making payment:", error);
      alert("Payment Failed, please try again!");
    }
  };

  return (
    <div className="container mt-4">
      {/* 🏞️ Banner Image */}
      <div className="text-center mb-4">
        <img
          src="/banner1.webp"
          alt="Land Banner"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "350px", width: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="row">
        {lands.map((land) => (
          <div key={land.land_id} className="col-md-3 mb-4">
            <div className="card shadow-lg h-100">
              {" "}
              {/* Ensures all cards have equal height */}
              <img
                src={`https://modcom2.pythonanywhere.com/static/images/${land?.product_photo}`}
                className="card-img-top"
                alt={land.land_description}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                {" "}
                {/* Makes content inside flex-controlled */}
                <h5 className="card-title">{land?.product_name}</h5>
                <h5 className="card-title small flex-grow-1">
                  {" "}
                  {/* Pushes button to bottom */}
                  {land.product_description.length > 50
                    ? `${land.product_description.slice(0, 50)}...`
                    : land.product_description}
                </h5>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="text-success fw-bold">
                    Ksh {land.product_cost.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Buy Land
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-content">
                <h3>Enter Payment Details</h3>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handlePaymentSubmit}
                  >
                    Submit Payment
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Purchase
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetLandDetails;
// import "../App.css";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const GetLandDetails = () => {
//   const [lands, setLands] = useState([]);
//   const [showPaymentForm, setShowPaymentForm] = useState(false); // State to show the form
//   const [amount, setAmount] = useState("");
//   const [phone, setPhone] = useState("");

//   useEffect(() => {
//     const fetchLandDetails = async () => {
//       try {
//         const response = await axios.get(
//           "https://modcom2.pythonanywhere.com/api/get_land_details"
//         );
//         setLands(response.data.reverse()); // Reverse the order to show the latest land first
//       } catch (error) {
//         console.error("Error fetching land details:", error);
//       }
//     };

//     fetchLandDetails();
//   }, []);

//   const handleBuyNow = (land) => {
//     // Show the payment form when the "Buy Now" button is clicked
//     setShowPaymentForm(true);
//   };

//   const handlePaymentSubmit = async () => {
//     // Send the amount and phone number to the payment API
//     try {
//       const response = await axios.post(
//         "https://modcom2.pythonanywhere.com/api/mpesa_payment",
//         {
//           amount: amount,
//           phone: phone,
//         }
//       );
//       console.log("Payment response:", response);
//       // Handle the response appropriately
//       alert("Payment Successful!");
//       setShowPaymentForm(false); // Close the payment form
//     } catch (error) {
//       console.error("Error making payment:", error);
//       alert("Payment Failed, please try again!");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       {/* 🏞️ Banner Image */}
//       <div className="text-center mb-4">
//         <img
//           src="/banner2.jpg"
//           alt="Land Banner"
//           className="img-fluid rounded shadow"
//           style={{ maxHeight: "350px", width: "100%", objectFit: "cover" }}
//         />
//       </div>
//       <div className="row">
//         {lands.map((land) => (
//           <div key={land.land_id} className="col-md-4 mb-4">
//             <div className="card shadow-lg">
//               <img
//                 src={`https://modcom2.pythonanywhere.com/static/images/${land.land_photo}`}
//                 className="card-img-top"
//                 alt={land.land_description}
//                 style={{ height: "200px", objectFit: "cover" }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{land.land_description}</h5>
//                 <p className="card-text">
//                   <strong>Location:</strong> {land.land_location}
//                   <br />
//                   <strong>Size:</strong> {land.land_size}
//                   <br />
//                   <strong>Owner:</strong> {land.land_owner}
//                   <br />
//                   <strong>Plot No:</strong> {land.plot_no}
//                 </p>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="text-success fw-bold">
//                     Ksh {land.land_cost.toLocaleString()}
//                   </span>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleBuyNow(land)}
//                   >
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Payment Form Modal */}
//       {showPaymentForm && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Enter Payment Details</h3>
//             <div className="mb-3">
//               <label htmlFor="amount" className="form-label">
//                 Amount
//               </label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="amount"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="phone" className="form-label">
//                 Phone Number
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="d-flex justify-content-between">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setShowPaymentForm(false)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-primary" onClick={handlePaymentSubmit}>
//                 Submit Payment
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetLandDetails;
