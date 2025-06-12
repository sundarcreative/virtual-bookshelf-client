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
        <div className='my-5' data-aos="fade-up">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto py-5">
                <form onSubmit={handleLogin} className="card-body">
                    <h1 className="text-3xl font-semibold text-center">Login your account</h1>
                    <fieldset className="fieldset">
                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" name='email' required ref={email2} />
                        {/* password */}
                        <label className="label">Password</label>
                        <div className='relative'>
                            <input type={showPassword ? 'text' : 'password'} className="input py-5" placeholder="Password" name='password' required />
                            <button
                                //toggle eye icon
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='btn btn-xs absolute p-2 rounded-full top-2 right-6 z-10 bg-white shadow-none'>

                                {
                                    showPassword ? <FaEyeSlash size={18} color='black' /> : <FaEye size={18} color='black' />
                                }
                            </button>
                        </div>
                        {
                            errorMessage && <h1 className='text-red-500'>Error: {errorMessage}</h1>
                        }
                        <div ><a onClick={handleForgetPass} className="link link-hover">Forgot password?</a></div>

                        <button type='submit' className="btn btn-neutral mt-4">Login</button>
                        <button onClick={handleGoogle} className="btn btn-secondary ">
                            <BsGoogle></BsGoogle> Login with Google
                        </button>

                    </fieldset>
                    <p className='text-black text-center font-semibold mt-5'>Don't Have An Account ? <Link to='/register' className='text-secondary underline'>Register</Link> </p>
                </form>
            </div>
        </div>
    );
};

export default Login;