import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import pexels from "./pexels.jpg";
import { Link, useNavigate } from 'react-router-dom';
// import {Navigate} from 'react-router-dom';

const Login = () => {
    const backgroundStyle ={backgroundImage:`url(${pexels})`,backgroundSize:"cover",backgroundPosition:"center",height: "100vh"}
    const [showPassword, setShowPassword] = useState(false);
    const [loading ,setLoading]=useState(false);
    const {register,handleSubmit,formState: { errors }} = useForm();
    const Navigate = useNavigate();

    const onSubmit= async(data)=>{
        setLoading(true);
        try {
            const response = await axios.post("https://dummyjson.com/auth/login",{
                username:data.username,
                password:data.password
            }) 
            console.log(response);
            if(response.status === 200){
                const token = response?.data?.accessToken;
                localStorage.setItem('AuthToken',JSON.stringify(token));
                Navigate('/dashboard');
                alert("Login Successful!");
              }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
        }
        finally{
            setLoading(false);
        }
    };
   
  return (
    <div>
         <div className="relative flex items-center justify-center" style={backgroundStyle}>
          <div className="flex flex-col justify-center items-center border border-gray-300 bg-gray-900 bg-opacity-80 shadow-lg absolute px-10 py-8 rounded-lg text-white w-auto">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
    
            <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
              {/* First & Last Name */}
              <div className="flex gap-4 mb-4">
                <div className="w-full">
                  <label className="block mb-1 text-left">username:</label>
                  <input 
                  className="w-full px-4 py-2 text-black bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                   name="username"
                   type="text" placeholder="Enter First Name"
                   {...register("username", { required: "username is required",minLength: {
                    value: 4,
                    message: "username must have at least 4 characters",
                   },validate: (value) =>!/\s/.test(value) || "No spaces allowed inusername", })}
                   />
                   {errors.username && (<small className="text-red-500">{errors.username.message}</small>)}
                </div>
              </div>

              {/* Password with Show/Hide */}
              <div className="mb-6 relative">
                <label className="block mb-1 text-left">Password:</label>
                <input className="w-full px-4 py-2 text-black bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password" type={showPassword ? "text" : "password"} placeholder="Enter Your Password"
                {...register("password", { required: "password is required",minLength: {
                    // value: 4,
                    // message: "lasphoneNumber must have at least 4 characters",
                },validate: (value) =>!/\s/.test(value) || "No spaces allowed in password", })}
                />
                {errors.password && (<small className="text-red-500">{errors.password.message}</small>)}
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-600 hover:text-gray-800">
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <div className="mb-6 flex justify-between">
                {/* Submit Button */}
              <button className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded" type="submit">
              {loading ? "Logging in..." : "Login"}
              </button>
              <Link to="/registration"><a className="text-center">Registration Page</a></Link>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login;