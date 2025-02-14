// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import axios from "axios";

// const GetLandDetails = () => {
//   const [lands, setLands] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product
//   const [phone, setPhone] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//     const navigate = useNavigate(); // For redirection
  

  

//   useEffect(() => {
//     const fetchLandDetails = async () => {
//       try {
//         const response = await axios.get(
//           "https://modcom2.pythonanywhere.com/api/get_product_details"
//         );
//         setLands(response.data.reverse());
//         console.log("response?.data", response?.data)
//       } catch (error) {
//         console.error("Error fetching land details:", error);
//       }
//     };

//     fetchLandDetails();
//   }, []);

//   const handleShowPaymentForm = (product) => {
//     const user = JSON.parse(localStorage.getItem("user")); // Check if user exists

//     if (!user) {
//       // router.push("/signin"); // Redirect to sign-in page
//       navigate("/signin");

//       return;
//     }

//     setSelectedProduct(product); // Set selected product details
//     setIsSubmitted(false);
//   };

 
//   const handlePaymentSubmit = async () => {
//     if (!lands) {
//       alert("No land selected!");
//       return;
//     }

//     setIsLoading(true);
//     setIsSubmitted(false);

//     const formData = new FormData();
//     formData.append("amount", lands.product_cost);
//     formData.append("phone", phone);

//     try {
//       const response = await axios.post(
//         "https://modcom2.pythonanywhere.com/api/mpesa_payment",
//         formData
//       );
//       console.log("Payment response:", response);

//       setTimeout(() => {
//         setIsSubmitted(true);
//         setIsLoading(false);
//       }, 2000); // Simulate processing delay
//     } catch (error) {
//       console.error("Error making payment:", error);
//       alert("Payment Failed, please try again!");
//       setIsLoading(false);
//     }
//   };

//   console.log("lands", lands)
//   return (
//     <div className="container-fluid mt-4">
//       {/* Banner Image */}
//       <div className="text-center mb-4">
//         <img
//           src="/banner1.webp"
//           alt="Land Banner"
//           className="img-fluid rounded shadow"
//           style={{ maxHeight: "350px", width: "100%", objectFit: "cover" }}
//         />
//       </div>
//       <div className="row">
//         {lands.map((land) => (
//           <div key={land.land_id} className="col-md-3 mb-4">
//             <div className="card shadow-lg h-100">
//               <img
//                 src={`https://modcom2.pythonanywhere.com/static/images/${land?.product_photo}`}
//                 className="card-img-top"
//                 alt={land.land_description}
//                 style={{ height: "200px", objectFit: "contain" }}
//               />
//               <div className="card-body d-flex flex-column">
//                 <h5 className="card-title">{land?.product_name}</h5>
//                 <h5 className="card-title small flex-grow-1">
//                   {land.product_description.length > 50
//                     ? `${land.product_description.slice(0, 50)}...`
//                     : land.product_description}
//                 </h5>
//                 <div className="d-flex justify-content-between align-items-center mt-auto">
//                   <span className="text-success fw-bold">
//                     Ksh {land.product_cost.toLocaleString()}
//                   </span>
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     data-bs-toggle="modal"
//                     data-bs-target="#staticBackdrop"
//                     onClick={() => handleShowPaymentForm(land)}
//                   >
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Payment Modal */}
//       <div
//         className="modal fade"
//         id="staticBackdrop"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="staticBackdropLabel">
//                 Buy Product
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>

//             <div className="modal-body">
//               {isSubmitted ? (
//                 <div className="text-center">
//                   <h4 className="text-success">Request is being processed...</h4>
//                   <p>Please wait for payment confirmation.</p>
//                 </div>
//               ) : (
//                 selectedProduct && (
//                   <div className="modal-content">
//                     <h3>Enter Payment Details</h3>
//                     <div className="mb-3">
//                       <label htmlFor="amount" className="form-label">
//                         Amount
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         id="amount"
//                         value={selectedProduct.product_cost}
//                         readOnly
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="phone" className="form-label">
//                         Phone Number
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="phone"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div className="d-flex justify-content-between">
//                       <button
//                         type="button"
//                         className="btn btn-secondary"
//                         data-bs-dismiss="modal"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         className="btn btn-primary"
//                         onClick={handlePaymentSubmit}
//                         disabled={isLoading}
//                       >
//                         {isLoading ? "Submitting..." : "Submit Payment"}
//                       </button>
//                     </div>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetLandDetails;



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const GetLandDetails = () => {
  const [lands, setLands] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await axios.get(
          "https://modcom2.pythonanywhere.com/api/get_product_details"
        );
        setLands(response.data.reverse());
      } catch (error) {
        console.error("Error fetching land details:", error);
      }
    };

    fetchLandDetails();
  }, []);

  const handleShowPaymentForm = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/signin");
      return;
    }

    setSelectedProduct(product);
    setIsSubmitted(false);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedProduct) {
      alert("No land selected!");
      return;
    }

    setIsLoading(true);
    setIsSubmitted(false);

    const formData = new FormData();
    formData.append("amount", selectedProduct.product_cost);
    formData.append("phone", phone);

    try {
      await axios.post("https://modcom2.pythonanywhere.com/api/mpesa_payment", formData);
      setTimeout(() => {
        setIsSubmitted(true);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error making payment:", error);
      alert("Payment Failed, please try again!");
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid mt-4">
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
              <img
                src={`https://modcom2.pythonanywhere.com/static/images/${land?.product_photo}`}
                className="card-img-top"
                alt={land.land_description}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{land?.product_name}</h5>
                <h5 className="card-title small flex-grow-1">
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
                    onClick={() => handleShowPaymentForm(land)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Buy Product</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProduct(null)}
                ></button>
              </div>

              <div className="modal-body">
                {isSubmitted ? (
                  <div className="text-center">
                    <h4 className="text-success">Request is being processed...</h4>
                    <p>Please wait for payment confirmation.</p>
                  </div>
                ) : (
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
                        value={selectedProduct.product_cost}
                        readOnly
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
                        onClick={() => setSelectedProduct(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handlePaymentSubmit}
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Submit Payment"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetLandDetails;
