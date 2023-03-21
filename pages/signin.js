import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import Cookie from "js-cookie";
import { useRouter } from 'next/router';

const Signin = () => {
	const initialState = { email: "", password: "" };
	const [userData, setUserData] = useState(initialState);
	const { email, password } = userData;
  	const router = useRouter();
	const {state, dispatch} = useContext(DataContext);
  	const {auth} = state;
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} })
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch({ type: "NOTIFY", payload: { loading: true }});
		const res = await postData("auth/login", userData);
		if (res.err) return dispatch({type: "NOTIFY", payload: {error: res.err }});
    	dispatch({ type: "NOTIFY", payload: { success: res.msg,loading: false }});
		dispatch({type: "AUTH", payload: { 
          token:res.access_token,
          user:res.user,
        }
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path:'api/auth.accessToken',
      expires:7,
    });
    localStorage.setItem("firsLogin", true);
  };
  
  useEffect(()=>{
      if(Object.keys(auth).length !== 0){
        router.push("/")
      }
  },[auth])

	return (
		<div className='container w-50'>
			<Head>Sign In Page</Head>
			<form className='mx-auto my-4' onSubmit={handleLogin}>
				<div className='mb-3'>
					<label htmlFor='exampleInputEmail1' className='form-label'>
						Email address
					</label>
					<input
						type='email'
            			name="email"
						className='form-control'
						id='exampleInputEmail1'
						aria-describedby='emailHelp'
						value={email}
						onChange={handleChange}
					/>
					<div id='emailHelp' className='form-text'>
						We'll never share your email with anyone else.
					</div>
				</div>
				<div className='mb-3'>
					<label htmlFor='exampleInputPassword1' className='form-label'>
						Password
					</label>
					<input
						type='password'
            			name="password"
						className='form-control'
						id='exampleInputPassword1'
						value={password}
						onChange={handleChange}
					/>
				</div>
				<button type='submit' className='btn btn-dark w-100 '>
					LogIn
				</button>
				<p className='my-2'>
					You don't have an account?
					<Link href='/register' legacyBehavior>
						<a className='mx-2' style={{ color: "crimson" }}>
							Register
						</a>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Signin;
