import logo from '../../assets/logo3.png'
import { NavLink as Link } from 'react-router-dom';

const Navbar = () => {
    const token = window.localStorage.getItem('token');

    if(!token){
      window.location.href = '/'
    }
  
    function back(){
      window.localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return(
        <>
            <div className="container-xl">
                <div className='d-flex align-items-center justify-content-between mt-2'>
                    <Link to={'/company'}>
                        <img className='bg-transparent rounded-2' src={logo} alt="" width={300} height={90}/>
                    </Link>

                    <ul className='d-flex align-items-center list-unstyled justify-content-between m-0' style={{width: '500px'}}>
                        <li>
                            <Link className={({isActive}) => isActive ? "text-decoration-none text-dark fw-bold" : "text-decoration-none text-dark"} style={{fontSize: '18px'}} to='/company'>
                                Company
                            </Link>
                        </li>
                        <li>
                            <Link className={({isActive}) => isActive ? "text-decoration-none text-dark fw-bold" : "text-decoration-none text-dark"} style={{fontSize: '18px'}} to='/complex'>
                                Complex
                            </Link>
                        </li>
                        <li>
                            <Link className={({isActive}) => isActive ? "text-decoration-none text-dark fw-bold" : "text-decoration-none text-dark"} style={{fontSize: '18px'}} to='/bank'>
                                Bank
                            </Link>
                        </li>
                        <li>
                            <Link className={({isActive}) => isActive ? "text-decoration-none text-dark fw-bold" : "text-decoration-none text-dark"} style={{fontSize: '18px'}} to='/room'>
                                Room
                            </Link>
                        </li>
                    </ul>
                    <div>
                        <button className='text-decoration-none btn btn-secondary' onClick={back}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;