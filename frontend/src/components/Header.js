import { useEffect, useState } from 'react'
import customerService from "../service/login/customer/customerService"
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AvatarContext } from './AvatarContext';
import { QuantityContext } from './QuantityContext';
export default function Header() {
  const token = localStorage.getItem('token')
  const [customerDetail, setCustomerDetail] = useState()
  const [avatarDetail, setAvatarDetail] = useState('https://firebasestorage.googleapis.com/v0/b/quannla.appspot.com/o/files%2Fanh-avatar-trang-fb-mac-dinh.jpg?alt=media&token=10a4447c-33df-4390-a5fb-0ccc5d97069a')
  const navigate = useNavigate()
  const { avatar, setAvatar } = useContext(AvatarContext);
  const { iconQuantity, setIconQuantity } = useContext(QuantityContext);
  const [searchInput, setSearchInput] = useState('');


  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
    setIconQuantity(0)
    setAvatar('')
  }
  const handleSearch = (event) => {
    const keyword = event.target.value;
    setSearchInput(keyword);
  };

  useEffect(() => {
    const detail = async () => {
      try {
        const res = await customerService.detail()
        setCustomerDetail(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    detail()

  }, [token])

  

  useEffect(() => {
    setIconQuantity(customerDetail?.cartSet.length)
  }, [customerDetail?.cartSet.length])

  useEffect(() => {
    setAvatarDetail(customerDetail?.avatar)
  }, [customerDetail])

  const handleSearchProduct = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate(`/product?search=${searchInput}`)
    }
  }
  if(avatarDetail===undefined){
    setAvatarDetail('https://firebasestorage.googleapis.com/v0/b/quannla.appspot.com/o/files%2Fanh-avatar-trang-fb-mac-dinh.jpg?alt=media&token=10a4447c-33df-4390-a5fb-0ccc5d97069a')
  }
  return (
    
    <>
      <header className=''>
        <nav className="header-fixed border-bottom border-color">
          <div
            style={{ backgroundColor: "#fff" }}
            className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 header-shadow"
          >
            <NavLink
              to='/'
              className="d-flex align-items-center ms-5 col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
              style={{ marginRight: "-220px" }}>
              <img
                width='150px'
                src="https://inkythuatso.com/uploads/thumbnails/800/2021/12/logo-dai-hoc-phuong-dong-inkythuatso-01-22-16-55-42.jpg"
                height='100px'
                alt="" />
            </NavLink>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink
                  to='/'
                  className="nav-link  px-4  text-secondary  text-hover "
                >
                  TRANG CHỦ
                </NavLink>
              </li>
              <li>
                <a
                  href="https://phuongdong.edu.vn/Gioi-thieu/Gioi-thieu-chung.html#:~:text=%C4%90%E1%BA%A1i%20h%E1%BB%8Dc%20Ph%C6%B0%C6%A1ng%20%C4%90%C3%B4ng%20l%C3%A0,ng%C3%A0y%2016%2F8%2F1994."
                  className="nav-link  px-4  text-secondary text-hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GIỚI THIỆU
                </a>
              </li>
              <li>
                <NavLink
                  to={'/product'}
                  className="nav-link  px-4  text-secondary text-hover"
                >
                  SẢN PHẨM
                </NavLink>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/phuongdonguniversity"
                  className="nav-link  px-4  text-secondary text-hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FANPAGE
                </a>
              </li>
              
            </ul>

            <div className="fs-5 search-container">
              <i className="bi bi-search">
                <span className='ms-2 position-absolute' style={{
                  bottom: '3px'
                }}>|</span>
              </i>
              <input type='text' className='form-control search-product' value={searchInput} onKeyDown={handleSearchProduct} onChange={handleSearch} placeholder='Tìm kiếm sản phẩm' />
            </div>
            <div className="me-5 fs-4 ">
              <div className='float-start'>
                {
                  token === null ?
                    <NavLink to={'/login'} type="button" className=" ms-5 bi bi-person ">
                    </NavLink> :
                    <div className=" ms-5">
                      <div className="dropdown">
                        <a
                          className="dropdown-toggle d-flex align-items-center hidden-arrow"
                          id="navbarDropdownMenuAvatar"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div className='fs-6' style={{
                            width: '40px',
                            height: '40px'
                          }} >
                            <img
                              src={avatar === '' ? avatarDetail : avatar}
                              className="rounded-circle border border-2 border-color"
                              alt="avatar"
                              width={'100%'}
                              height={'100%'}
                            />
                          </div>
                        </a>
                        <ul
                          className="dropdown-menu p-0"
                          aria-labelledby="navbarDropdownMenuAvatar"
                        >
                          <li>
                            <NavLink to='/customer/detail' className="dropdown-item button-buy">
                              Thông tin cá nhân
                            </NavLink>
                          </li>
                          <li>
                            <button onClick={handleLogout} className="dropdown-item button-buy" href="#">
                              Đăng xuất
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                }

              </div>
              <div className='float-end cart-container'>
                <NavLink to={'/cart'} className=" ms-3 me-5 pe-5 bi bi-cart3 ">
                </NavLink>
                <span className='me-5 pe-5 cart-number'>{iconQuantity === 0 ? '' : iconQuantity}</span>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}