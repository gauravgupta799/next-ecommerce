import React, {useContext, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlineShoppingCart} from 'react-icons/ai'
import { FaUserAlt} from 'react-icons/fa';
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";

const Navbar = () => {
	const [state, dispatch] = useContext( DataContext);
	const {auth} = state;
	const router= useRouter();

	const isActive =(path)=>{
		if(path === router.pathname){
			return " active"
		}
	}

	const handleLogout =()=>{
		Cookie.remove('refreshtoken', {
			path:'api/auth/accessToken'
		});
		localStorage.removeItem("firstLogin");
		dispatch({
			type:'AUTH', payload:{}
		})
		dispatch({
			type:"NOTIFY", 
			paylod:{
				success:"Logged Out!"
			}
		})
	}

	useEffect(()=>{
		if(Object.keys(auth).length === 0){
		  router.push("/signin")
		}
	},[auth])

	const loggedRouter= ()=>{
		return (
			<div className="dropdown my-2">
				<div className="dropdown-container" data-bs-toggle="dropdown">
					<img src= {auth.user.avatar} 
						aria-expanded="false"
						style={{borderRadius:"50%", width:"30px", height:"30px"}}
					/>
					<strong>{auth.user.name}</strong>
				</div>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					<Link href="/profile" legacyBehavior>
						<a className='dropdown-item'>
							Profile
						</a>
					</Link>
					<button className='dropdown-item' onClick={handleLogout}>
						Logout
					</button>
				</ul>
			</div>
		)
	}
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light px-3'>
			<Link href="/" legacyBehavior >
                <a className='navbar-brand'>
                    FashionBazaar
                </a>
            </Link>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarNavDropdown'
				aria-controls='navbarNavDropdown'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon' />
			</button>
			<div 
            className='collapse navbar-collapse justify-content-end'
             id='navbarNavDropdown'>
				<ul className='navbar-nav'>
					<li className="nav-item">
                        <Link href="/cart" legacyBehavior>
                            <a className={` nav-link ${isActive('/cart')}`}>
                            <AiOutlineShoppingCart/>
                                Cart		
                            </a>
                        </Link>
					</li>
					{
						Object.keys(auth).length === 0 ?
							<li className='nav-item '>
								<Link href="/signin" legacyBehavior>
									<a className={`nav-link ${isActive('/signin')}`}>
									<FaUserAlt/>
										SignIn
									</a>
								</Link>
							</li>
							: loggedRouter()
					}					
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
