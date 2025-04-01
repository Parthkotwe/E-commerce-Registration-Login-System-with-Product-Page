import React,{useState} from "react";
import { useForm } from "react-hook-form";
import pexels from "./pexels.jpg";
import { Link,useNavigate } from "react-router-dom";

const Registration = () => {

    const [showPassword, setShowPassword] = useState(false);
    const {register, handleSubmit, formState: { errors },} = useForm();
    const Navigate = useNavigate();

    const onSubmit=(data)=>{
      alert("You are Register sucessfully");
      Navigate('/');
      console.log("Form Submitted",data);
    }

    return (
      <div className="relative flex items-center justify-center bg-cover bg-center h-screen" style={{ backgroundImage: `url(${pexels})` }}>
          <div className="flex flex-col justify-center items-center border border-gray-300 bg-gray-900 bg-opacity-80 shadow-lg absolute px-10 py-8 rounded-lg text-white w-auto">
            <h2 className="text-2xl font-semibold mb-6">Registration</h2>
    
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              {/* First & Last Name */}
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block mb-1 text-left">First Name:</label>
                  <input 
                  className="w-full px-4 py-2 text-black bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                   name="firstName" type="text" placeholder="Enter First Name"
                   {...register("firstName", { required: "firstName is required",minLength: {
                    value: 4,
                    message: "firstName must have at least 4 characters",
                   },validate: (value) =>!/\s/.test(value) || "No spaces allowed in username", })}
                   />
                   {errors.firstName && (<small className="text-red-500">{errors.firstName.message}</small>)}
                </div>
                <div className="w-1/2">
                  <label className="block mb-1 text-left">Last Name:</label>
                  <input className="w-full px-4 py-2 text-black bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  name="lastName" type="text" placeholder="Enter Last Name"
                  {...register("lastName", { required: "lastName is required",minLength: {
                    value: 4,
                    message: "lastName must have at least 4 characters",
                   },validate: (value) =>!/\s/.test(value) || "No spaces allowed in lastName", })}
                  />
                  {errors.lastName && (<small className="text-red-500">{errors.lastName.message}</small>)}
                </div>
              </div>
    
              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1 text-left">Email:</label>
                <input className="w-full px-4 py-2 text-black bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                name="email" type="email" placeholder="Enter Your Email"
                {...register("email", { required: "email is required",minLength: {
                    value: 4,
                    message: "lastName must have at least 4 characters",
                   },validate: (value) =>!/\s/.test(value) || "No spaces allowed in email", })}
                />
                {errors.email && (<small className="text-red-500">{errors.email.message}</small>)}
              </div>
    
              {/* Phone Number */}
              <div className="mb-4">
                <label className="block mb-1 text-left">Phone No:</label>
                <input className="w-full px-4 py-2 text-black bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 name="phoneNumber" type="tel" placeholder="Enter Your Phone Number"
                {...register("phoneNumber", { required: "phoneNumber is required",minLength: {
                    value: 10,
                    message: "phoneNumber must have at least 10 characters",
                },validate: (value) =>!/\s/.test(value) || "No spaces allowed in phoneNumber", })}
                />
                {errors.phoneNumber && (<small className="text-red-500">{errors.phoneNumber.message}</small>)}
              </div>
    
              {/* Password with Show/Hide */}
              <div className="mb-6 relative">
                <label className="block mb-1 text-left">Password:</label>
                <input className="w-full px-4 py-2 text-black bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password" type={showPassword ? "text" : "password"} placeholder="Enter Your Password"
                {...register("password", { required: "password is required",minLength: {
                    value: 4,
                    message: "password must have at least 4 characters",
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
                Register
              </button>
              <Link to="/"><a className="text-center">Login Page</a></Link>
              </div>
            </form>
          </div>
        </div>
      );
    };

export default Registration;
