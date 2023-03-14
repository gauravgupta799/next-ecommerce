import React from "react";
import Link from "next/link";

const Register = () => {
	return (
		<div className="container w-50">
			<form className='mx-auto my-4'>
				<div className='mb-3'>
					<label htmlFor='InputText' className='form-label'>
						Enter Your Name
					</label>
					<input
						type='email'
						className='form-control'
						id='exampleInputEmail1'
						aria-describedby='emailHelp'
					/>
					<label htmlFor='exampleInputEmail1' className='form-label'>
						Email address
					</label>
					<input
						type='email'
						className='form-control'
						id='exampleInputEmail1'
						aria-describedby='emailHelp'
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
						className='form-control'
						id='exampleInputPassword1'
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
