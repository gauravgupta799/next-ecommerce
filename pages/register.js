import React,{useState, useContext} from "react";
import Link from "next/link";
import valid from "../utils/valid";
import {DataContext} from "../store/GlobalState";
import {postData} from "../utils/fetchData";

const Register = () => {
	const initialState ={name:"", email:"", password:"", conf_password:""}
	const [userData, setUserData] = useState(initialState);
    const {name, email, password, conf_password} = userData;
	
	const [state, dispatch] = useContext(DataContext)
	
	const handleChange=(e)=>{
		const { name ,value} = e.target;
		setUserData({...userData, [name]:value});
	}

	const handleRegister = async(e)=>{
		e.preventDefault();
		const errMsg = valid(name, email, password, conf_password)
		if(errMsg) return dispatch({
			type:"NOTIFY",
			payload:{ error: errMsg}
		})
		dispatch({
			type:"AUTH",
			payload:{loading: true}
		})
		const res = await postData("auth/register", userData)
		if(res.err){
			return dispatch({ type: 'NOTIFY', payload:{
				error:res.err
			}})
		}
		return dispatch({
			type:"AUTH",
			payload:{ success:res.msg, loading: false}
		})
	}

	return (
		<div className="container w-50">
			<form className='mx-auto my-4' onSubmit={handleRegister}>
				<div className='mb-3'>
					<label htmlFor='InputText' className='form-label'>
						Enter Your Name
					</label>
					<input
						type='text'
						name= "name"
						value={name}
						className='form-control'
						id='exampleInputEmail1'
						// aria-describedby='emailHelp'
						onChange={handleChange}
					/>
					<label htmlFor='exampleInputEmail1' className='form-label'>
						Email address
					</label>
					<input
						type='email'
						name="email"
						className='form-control'
						id='exampleInputEmail1'
						// aria-describedby='emailHelp'
						onChange={handleChange}
						value={email}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='exampleInputPassword1' className='form-label'>
						Password
					</label>
					<input
						type='password'
						name="password"
						className='form-control'
						id='password'
						onChange={handleChange}
						value={password}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='exampleInputPassword1' className='form-label'>
						Confirm Password
					</label>
					<input
						type='password'
						name="conf_password"
						className='form-control'
						id='confirm-password'
						onChange={handleChange}
						value={conf_password}
					/>
				</div>
				<button type='submit' className='btn btn-dark w-100 '>
                    Register
				</button>
				<p className='my-2'>
					Already have an account?
					<Link href='/signin' legacyBehavior>
						<a className='mx-2' style={{ color: "crimson" }}>
							SignIn
						</a>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
