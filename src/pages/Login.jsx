import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BsGoogle } from 'react-icons/bs';
import useTitle from '../hook/useTitle';
import Swal from 'sweetalert2';

const Login = () => {
    useTitle('Login')
    const { login, setUser, googleSignIn } = use(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
    const email2 = useRef();


    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setErrorMessage(' ');

        login(email, password)
            .then((result) => {
                // Signed in 
                setUser(result.user)
                 Swal.fire({
                    title: "You are Logged In Successfully!",
                    icon: "success",
                    draggable: true
                });
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch((error) => {
                const errorMessag = error.code;
                setErrorMessage(errorMessag);
                // toast.error(errorMessage);

            });


    }


    const handleGoogle = e => {
        e.preventDefault();
        googleSignIn()
            .then((result) => {
                // Signed in 
                setUser(result.user)
                Swal.fire({
                    title: "You are Logged In Successfully!",
                    icon: "success",
                    draggable: true
                });
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch((error) => {
                const errorMessag = error.code;
                setErrorMessage(errorMessag);
                // toast.error(errorMessage);

            });
    }

    const handleForgetPass = () => {
        const email = email2.current.value;
        if (!email) {
            toast.warning("Please enter your email.");
            return;
        }
        navigate('/forgetpass', { state: email });

    }

    return (
 <div className="relative min-h-screen flex items-center justify-center px-4">

  {/* Background Image with Opacity */}
  <div
    className="absolute inset-0  bg-contain bg-center opacity-80 -z-10 bg-no-repeat"
    style={{
      backgroundImage: `url('https://i.ibb.co/cmLkFkj/books-isolated-white.jpg')`,
    }}
  ></div>

  

  {/* Login Card */}
  <div className="w-full max-w-sm" data-aos="fade-up">
    <div className="card w-full max-w-sm shrink-0 mx-auto py-5 bg-opacity-20 backdrop-blur-md shadow-2xl p-6 rounded-xl inset-0 bg-black/5">
      <form onSubmit={handleLogin} className="card-body ">
        <h1 className="text-3xl font-bold text-center mb-4">Login your account</h1>

        {/* Email */}
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          ref={email2}
          className="input input-bordered bg-opacity-30 text-black placeholder-black"
          placeholder="Email"
          required
        />

        {/* Password */}
        <label className="label">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="input input-bordered  bg-opacity-30 text-black placeholder-black w-full pr-10"
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-3 z-10 bg-transparent border-none"
          >
            {showPassword ? (
              <FaEyeSlash size={18} color="black" />
            ) : (
              <FaEye size={18} color="black" />
            )}
          </button>
        </div>

        {errorMessage && (
          <p className="text-red-400 mt-2">Error: {errorMessage}</p>
        )}

        <div>
          <a
            onClick={handleForgetPass}
            className="link link-hover text-sm"
          >
            Forgot password?
          </a>
        </div>

        <button type="submit" className="btn btn-secondary mt-4">
          Login
        </button>

        <div className="divider text-black">OR</div>

        <button
          onClick={handleGoogle}
          className="btn btn-accent flex gap-2 items-center"
        >
          <BsGoogle /> Login with Google
        </button>

        <p className="text-center font-semibold mt-5 ">
          Don't Have An Account?{' '}
          <Link to="/register" className="text-secondary underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  </div>
</div>


    );
};

export default Login;