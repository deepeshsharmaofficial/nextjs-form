"use client"
import { useEffect, useState } from "react";
import { useUser } from "./context/userContext";

const Home = () => {

  const { getAllData, addAllData, formData, isLoading } = useUser();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState([
    {name: "Deepesh", email: "deepesh@gmail.com", phone: "+918810477701", address: "Dwarka Sector 14, Delhi-110078" },
    {name: "Rohan", email: "rohan@gmail.com", phone: "+916610433701", address: "Dwarka Sector 14, Delhi-110078" },
    {name: "Mohan", email: "mohan@gmail.com", phone: "+917710400701", address: "Dwarka Sector 14, Delhi-110078" },
    {name: "Sohan", email: "sohan@gmail.com", phone: "+919910411701", address: "Dwarka Sector 14, Delhi-110078" },
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addAllData({name, email, phone, address});
    
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    getAllData();
  }

  useEffect(() => {
    getAllData();  
  }, [])

  return (
    <>
    <div className="max-w-sm mx-auto">

      <div className="bg-gray-100 p-4 rounded-lg my-5 border border-gray-300">
        <h1 className="text-gray-700 font-bold text-lg mt-4 mb-6 uppercase">Submitted Your Detail</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" id="text" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="" required />
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="" required />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
            <input name="phone" value={phone} onChange={(e)=> setPhone(e.target.value)} type="tel" id="phone" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="" required />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
            <textarea value={address} onChange={(e)=> setAddress(e.target.value)} name="address" id="address" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="" rows={4} required />
          </div>

          <button type="submit" className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            
            {isLoading ? (
                <>
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Loading...  
              </>
            ) : (
              "Submit"                          
            )}

            </button>
        
        </form>
      </div>

      <div className="my-5">
        <h1 className="text-gray-700 font-bold text-lg uppercase">Submitted Data</h1>
        <ul>
          {
            formData.length < 1 ? 
            (
              <li className="text-gray-800 text-sm font-normal">No Data</li>
            ) :
            (
              formData.map((data, index) => {
                return (
                  <li key={index}>
                    <div className="bg-gray-100 p-5 rounded-lg my-3 border border-gray-300" >
                      <p className="text-gray-800 text-sm font-semibold">{data.name}</p>
                      <p className="text-gray-800 text-sm font-normal">{data.email}</p>
                      <p className="text-gray-800 text-sm font-normal">{data.phone}</p>
                      <p className="text-gray-800 text-sm font-normal">{data.address}</p>
                    </div>
                  </li>
                )
              })
            )
          }
        </ul>
      </div>

    </div>
    </>
  );
}

export default Home;