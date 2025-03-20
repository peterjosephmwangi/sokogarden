import axios from 'axios';
import {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'

const MakePayment = () => {
    const {land: product} = useLocation().state || {};
    // console.log("product" , product)
    //Hooks to Hold Phone Number and success Message
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")

    const submit = async (e) =>{
        e.preventDefault()
        setMessage("Please wait as we process")
        const data = new FormData()
        data.append("phone", phone)
        data.append("amount", product.product_cost)
        const response = await axios.post(
            "https://modcom2.pythonanywhere.com/api/mpesa_payment",
            data
          );

          setMessage("Please Complete Payment on Your Phone")
    }

  return (
    <div className='row justify-content-center mt-5'>
        {/* <Link to="/" className=''>Get Products</Link> */}
           <h1 className='text-center'>Make Payment - Lipa NA MPESA</h1>
           <div className="col-md-6 card shadow p-4">
               <p className='text-info'>Product Name :{product.product_name} </p>
               <p className="text-warning fw-bolder">Product Cost: {product.product_cost}</p>

              <form  onSubmit={submit}>
                <input type="text" className="form-control" placeholder='Enter phone 254XXXXXXXXXXX' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                <br />
                <button className='btn btn-dark' type='submit'>
                       Make Payment
                    </button>
              </form>
           </div>

    </div>
  )
}

export default MakePayment