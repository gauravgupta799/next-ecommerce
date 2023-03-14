import React from "react";
import Link from "next/link";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlineShoppingCart} from 'react-icons/ai'
import { FaUserAlt} from 'react-icons/fa'

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
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
					<li className='nav-item active'>
                        <Link href="/cart" legacyBehavior>
                            <a className='nav-link'>
                            <AiOutlineShoppingCart/>
                                Cart
                            </a>
                        </Link>
					</li>
					<li className='nav-item active'>
                        <Link href="/signin" legacyBehavior>
                            <a className='nav-link '>
                            <FaUserAlt/>
                                SignIn
                            </a>
                        </Link>
					</li>
					{/* <li className='nav-item dropdown'>
						<a
							className='nav-link dropdown-toggle'
							id='navbarDropdownMenuLink'
							data-toggle='dropdown'
							aria-haspopup='true'
							aria-expanded='false'
						>
							Username
						</a>
						<div
							className='dropdown-menu'
							aria-labelledby='navbarDropdownMenuLink'
						>
                         <Link href="/profile" legacyBehavior>
							<a className='dropdown-item'>
								Profile
							</a>
                        </Link>
                        <Link href="/logout" legacyBehavior>
							<a className='dropdown-item'>
								Logout
							</a>
                        </Link>
						</div>
					</li> */}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
