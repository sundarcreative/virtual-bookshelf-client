import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { BsGoogle } from 'react-icons/bs';
import useTitle from '../hook/useTitle';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Register = () => {
    useTitle("Register")
    const { createUser, setUser, updateUser, googleSignIn } = use(AuthContext)
    const [passError, setPassError] = useState(" ")
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(name, password, email, photoURL);

        const isValidPassword = (password) => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
            return regex.test(password);
        };
        if (!isValidPassword(password)) {
            setPassError("Password must include uppercase, lowercase, and be at least 6 characters.");
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                updateUser({ displayName: name, photoURL: photoURL }).then(() => {
                    setUser({ ...user, displayName: name, photoURL: photoURL });
                    Swal.fire({
                        title: "Registered Successfully!",
                        icon: "success",
                        draggable: true
                    });
                    navigate('/')
                }).catch((error) => {
                    console.log(error);
                    setUser(user)
                });

            })
            .catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage);
            });

    }
    const handleGoogle = e => {
        e.preventDefault();
        googleSignIn()
          .then((result) => {
                    // Signed in 
                    setUser(result.user)
                    Swal.fire({
                        title: "Registered Successfully!",
                        icon: "success",
                        draggable: true
                    });
                    navigate(`${location.state ? location.state : '/'}`);
                })
                .catch((error) => {
                    const errorMessag = error.code;
                    toast.error(errorMessag);
                    
                });
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

        <div className='my-5' data-aos="fade-up">
            <div className="card  w-full max-w-sm shrink-0 mx-auto py-5 bg-opacity-20 backdrop-blur-md shadow-2xl p-6 rounded-xl inset-0 bg-black/5">
                <form onSubmit={handleRegister} className="card-body">
                    <h1 className="text-3xl font-semibold text-center">Register your account</h1>
                    <fieldset className="fieldset">
                        {/* name */}
                        <label className="label">Name</label>
                        <input type="text" className="input" placeholder="Name" name='name' required />
                        {/* photo url */}
                        <label className="label">Photo URL</label>
                        <input type="text" className="input" placeholder="Photo URL" name='photoURL' required />
                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" name='email' required />
                        {/* password */}
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" name='password' required />
                        {
                            passError && <h1 className='text-red-500'>{passError}</h1>
                        }
                        <button type='submit' className="btn btn-secondary mt-4">Register</button>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogle} className="btn btn-accent ">
                            <BsGoogle></BsGoogle> Login with Google
                        </button>
                    </fieldset>
                    <p className='text-black text-center font-semibold mt-5'>Already Have An Account ? <Link to='/login' className='text-secondary underline'>Login</Link> </p>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Register;