import { Formik, Form, Field } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import loginService from "../service/login/loginService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";
import { AvatarContext } from "./AvatarContext";
import { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [showFormResetPass, setShowFormResetPass] = useState(false)
    const [showFormEmail, setShowFormEmail] = useState(false)
    const [mail, setMail] = useState('')
    const [countdown, setCountdown] = useState(0);
    const [submit, setSubmit] = useState(false)
    const [showOtpModal, setShowOtpModal] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { setAvatar } = useContext(AvatarContext)
    const handleShowFromEmail = () => {
        setShowFormEmail(true)
    }
    const handleHideEmail = () => {
        setShowFormEmail(false)
    }
    const handleHideOtp = () => {
        setShowOtpModal(false)
    }
    const handleHideResetPass = () => {
        setShowFormResetPass(false)
    }
    const handleAgainSendCode = async () => {
        setSubmit(true)
        try {
            await loginService.forgotPassword({ email: mail })
            setSubmit(false)
            setCountdown(60)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        setAvatar('')
    }, [])
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(countdown => countdown - 1);
        }, 1000);
        if (countdown === 0) {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [countdown]);

    useEffect(() => {
        document.title = "Đăng Nhập"; // Thay đổi title
    }, [])
    return (

        <>
            <Header/>
            <div className="login-body" style={
                showFormEmail || showOtpModal || showFormResetPass ?
                    { opacity: 0.7 } : {}
            }>
                <div className="padding-login">
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        onSubmit={(value) => {
                            const loginUser = async () => {
                                try {
                                    const res = await loginService.login(value)
                                    navigate('/')
                                    localStorage.setItem('token', res.data.token)
                                    localStorage.setItem('role', res.data.roles[0].authority)
                                } catch (error) {
                                    const err = error.response.data;
                                    if (err.username === "Không được bỏ trống") {
                                        document.getElementById("usernameError").innerText = "Không được bỏ trống"
                                    } else if (err.message === "Tài khoản không tồn tại") {
                                        document.getElementById("usernameError").innerText = "Tài khoản không tồn tại"
                                    } else if (err.username === "Tên đăng nhập ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                        document.getElementById("usernameError").innerText = "Tên đăng nhập ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                    } else if (err.username === "Tên đăng nhập không được chứa ký tự đặc biệt") {
                                        document.getElementById("usernameError").innerText = "Tên đăng nhập không được chứa ký tự đặc biệt"
                                    } else {
                                        document.getElementById("usernameError").innerText = ""
                                    }
                                    if (err.password === "Không được bỏ trống") {
                                        document.getElementById("passwordError").innerText = "Không được bỏ trống"
                                    } else if (err.password === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                        document.getElementById("passwordError").innerText = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                    } else if (err === "" || err.status === 403) {
                                        document.getElementById("passwordError").innerText = "Mật khẩu không chính xác"
                                    } else if (err.password === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                        document.getElementById("passwordError").innerText = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                    } else {
                                        document.getElementById("passwordError").innerText = ""
                                    }
                                }
                            }
                            loginUser()
                        }}
                    >
                        <Form className="mt-3">
                            <div className="wrapper bg-white mt-0">
                                <div className="text-center">
                                    <img
                                        width='150px'
                                        src="/logo.png"
                                        alt="" /></div>
                                <div className="h4 text-secondary text-center pt-2">Đăng Nhập</div>
                                <div className="form-group py-2">
                                    <label className="text-register">Tài khoản :</label>
                                    <div className="input-field-1 mt-1">
                                        <Field type="text" className="input-login" placeholder="Nhập tài khoản" name="username" />
                                    </div>
                                    <div>
                                        <span className="text-dieucosmetics " id="usernameError"></span>
                                    </div>
                                </div>
                                <div className="form-group py-1 pb-2">
                                    <label className="text-register">Mật khẩu :</label>
                                    <div className="input-field-1 mt-1">
                                        <Field type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" className="input-login" name="password" />
                                        {
                                            showPassword ? <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                className="bi bi-eye-slash me-2"></span> :
                                                <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                    className="bi bi-eye me-2"></span>
                                        }

                                    </div>
                                    <div>
                                        <span className="text-dieucosmetics" id="passwordError"></span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <a type="button" className="a-login" href="#" id="forgot" onClick={handleShowFromEmail}>Quên mật khẩu?</a>
                                </div>
                                <div className="d-flex justify-content-center mt-2">
                                    <NavLink to='/' className="btn btn-block text-center mx-2">Quay lại</NavLink>
                                    <button type="submit" className="btn btn-block text-center mx-1">Đăng nhập</button>
                                </div>
                                <div className="text-center pt-3 text-muted">Bạn chưa có tài khoản?
                                    <NavLink className="a-login ms-1" to={'/register'}>Đăng ký</NavLink>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div >
            {
                showFormEmail &&
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    onSubmit={(value, { setSubmitting }) => {
                        const sendEmail = async () => {
                            try {
                                const res = await loginService.forgotPassword(value)
                                setMail(res.data)
                                setShowFormEmail(false)
                                setShowOtpModal(true)
                                setSubmitting(false)
                                setCountdown(60)

                            } catch (error) {
                                setSubmitting(false)
                                if (error.response.data.email === "Không được để trống") {
                                    document.getElementById("emailErr").innerHTML = "Không được để trống"
                                } else if (error.response.data.email === "Vui lòng nhập đúng định dạng Email VD: abc123@codegym.com") {
                                    document.getElementById("emailErr").innerHTML = "Vui lòng nhập đúng định dạng Email VD: abc123@codegym.com"
                                } else if (error.response.data.message === "Không tìm thấy email") {
                                    document.getElementById("emailErr").innerHTML = "Email xác nhận không chính xác"
                                } else {
                                    document.getElementById("emailErr").innerHTML = ""
                                }
                            }
                        }
                        sendEmail()
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div
                                className="modal d-block"
                                id="exampleModal"
                                tabIndex={-1}>
                                <div className="modal-dialog " >
                                    <div className="modal-content" style={{ marginTop: 270 }}>
                                        <div className="modal-header">
                                            <div className="text-center">
                                                <img src="/dieucosmetics-logo.png" style={{ width: 100 }} alt="logo" />
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-close button-buy"
                                                onClick={handleHideEmail}
                                                // data-bs-dismiss="modal"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">

                                            <div>
                                                <label htmlFor="email" className="form-label fw-bold">Xác Nhận Email:</label>
                                            </div>
                                            <div>
                                                <Field className="form-control" name="email" id="email" placeholder="Nhập Email xác nhận..." />
                                            </div>
                                            <div><span className="text-danger" id="emailErr"></span></div>
                                        </div>
                                        {
                                            isSubmitting ?
                                                <div className="d-flex justify-content-end me-3 pb-2">
                                                    <RotatingLines
                                                        strokeColor="grey"
                                                        strokeWidth="5"
                                                        animationDuration="0.75"
                                                        width="30"
                                                        visible={true}
                                                    />
                                                </div> : <div className="modal-footer">
                                                    {/* <button
                                                        type="button"
                                                        className="button-buy"
                                                        onClick={handleHideEmail}
                                                    // data-bs-dismiss="modal"
                                                    >
                                                        Hủy
                                                    </button> */}
                                                    <button type="submit" className="button-buy">
                                                        Xác nhận
                                                    </button>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            }
            {
                showOtpModal && <Formik
                    initialValues={{
                        code: '',
                        email: mail
                    }}
                    onSubmit={(value) => {
                        const sendOtp = async () => {
                            try {
                                await loginService.checkOtp(value)
                                setShowOtpModal(false)
                                setShowFormResetPass(true)
                            } catch (error) {
                                console.log(error);
                                if (error.response.data.message === "Mã OTP không chính xác") {
                                    document.getElementById("codeErr").innerHTML = "Mã OTP không chính xác hoặc đã hết hạn"
                                } else if (error.response.data.code === "Không được để trống") {
                                    document.getElementById("codeErr").innerHTML = "Không được để trống"
                                } else if (error.response.data.code === "Vui lòng nhập đúng định dạng OTP VD:XXXXXX (X là chữ số)") {
                                    document.getElementById("codeErr").innerHTML = "Vui lòng nhập đúng định dạng OTP VD:XXXXXX (X là chữ số)"
                                } else {
                                    document.getElementById("codeErr").innerHTML = ""
                                }
                            }
                        }
                        sendOtp()

                    }}
                >

                    <Form>
                        <div
                            className="modal d-block"
                            tabIndex={-1}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content" style={{
                                    marginTop: 270
                                }}>
                                    <div className="modal-header">
                                        <div className="text-center">
                                            <img src="/dieucosmetics-logo.png" style={{ width: 100 }} alt="logo" />
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-close button-buy"
                                            onClick={handleHideOtp}
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">

                                        <div >
                                            <label htmlFor="code" className="form-label fw-bold">Xác Nhận Mã OTP:</label>
                                        </div>
                                        <div>
                                            <Field className="form-control" name="code" placeholder="Nhập mã OTP....." />
                                        </div>
                                        {

                                            submit ?
                                                <div className="mt-2 d-flex justify-content-end">
                                                    <RotatingLines
                                                        strokeColor="grey"
                                                        strokeWidth="5"
                                                        animationDuration="0.75"
                                                        width="30"
                                                        visible={true}
                                                    />
                                                </div>
                                                : <div className="mt-2">
                                                    <span className="text-danger" id="codeErr"></span>
                                                    {
                                                        countdown === 0 ?
                                                            <div className="mt-2">
                                                                <a href="" className="float-end text-black text-decoration-none  bg-forgot-password"
                                                                    onClick={handleAgainSendCode}>Gửi lại mã</a>
                                                            </div>
                                                            :
                                                            <div className="mt-2">
                                                                <span className="float-end text-muted"
                                                                > ({countdown}) Gửi lại mã</span>
                                                            </div>

                                                    }
                                                </div>
                                        }

                                    </div>


                                    <div className="modal-footer">
                                        {/* <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleHideOtp}
                                        >
                                            Hủy
                                        </button> */}
                                        <button type="submit" className=" button-buy">
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            }
            {
                showFormResetPass && <Formik
                    initialValues={{
                        newPassword: '',
                        confirmPassword: '',
                        email: mail
                    }}
                    onSubmit={(value) => {
                        const resetPassword = async () => {
                            try {
                                await loginService.resetPassword(value)
                                setShowFormResetPass(false)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Thay đổi mật khẩu thành công',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } catch (error) {
                                const err = error.response.data
                                if (err.newPassword === "Không được bỏ trống") {
                                    document.getElementById("newPasswordErr").innerHTML = "Không được bỏ trống"
                                } else if (err.newPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                    document.getElementById("newPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                } else {
                                    document.getElementById("newPasswordErr").innerHTML = ""
                                }
                                if (err.message === "Mật khẩu xác nhận không trùng khớp") {
                                    document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu xác nhận không trùng khớp"
                                } else if (err.confirmPassword === "Không được bỏ trống") {
                                    document.getElementById("confirmPasswordErr").innerHTML = "Không được bỏ trống"
                                } else if (err.confirmPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                    document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                } else {
                                    document.getElementById("confirmPasswordErr").innerHTML = ""
                                }
                            }
                        }
                        resetPassword()
                    }}
                >
                    <Form>
                        <div
                            className="modal d-block"
                            tabIndex={-1}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content" style={{
                                    marginTop: 270
                                }}>
                                    <div className="modal-header">
                                        <div className="text-center">
                                            <img src="/dieucosmetics-logo.png" style={{ width: 100 }} alt="logo" />
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-close button-buy"
                                            onClick={handleHideResetPass}
                                            aria-label="Close"
                                        />
                                    </div>

                                    <div className="modal-body">
                                        <div className="mt-2">
                                            <label htmlFor="newPassword" className="fw-bold form-label">Mật khẩu mới:</label>
                                        </div>
                                        <div className="position-relative">
                                            <Field type={showNewPassword ? "text" : "password"}
                                                id="newPassword"
                                                className="form-control"
                                                name="newPassword" placeholder="Nhập mật khẩu mới" />
                                            {
                                                showNewPassword
                                                    ?
                                                    <i type="button" onClick={() => { setShowNewPassword(!showNewPassword) }} className={`bi bi-eye-slash me-2 position-absolute top-50 translate-middle-y end-0`}></i>
                                                    :
                                                    <i type="button" onClick={() => { setShowNewPassword(!showNewPassword) }} className={`bi bi-eye me-2 position-absolute top-50 translate-middle-y end-0`}></i>
                                            }
                                        </div>
                                        <div >
                                            <span className="text-danger" id="newPasswordErr"></span>
                                        </div>
                                        <div className="mt-2">
                                            <label htmlFor="confirmPassword" className="fw-bold form-label">Xác nhận mật khẩu:</label>
                                        </div>
                                        <div className="position-relative">
                                            <Field type={showConfirmPassword ? "text" : "password"}
                                                id="confirmPassword" className="form-control" name="confirmPassword" placeholder="Xác nhận mật khẩu mới" />
                                            {
                                                showConfirmPassword
                                                    ?
                                                    <i type="button" onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} className={`bi bi-eye-slash me-2 position-absolute top-50 translate-middle-y end-0`}></i>
                                                    :
                                                    <i type="button" onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} className={`bi bi-eye me-2 position-absolute top-50 translate-middle-y end-0`}></i>
                                            }
                                        </div>
                                        <div>
                                            <span className="text-danger" id="confirmPasswordErr"></span>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="button-buy">
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            }
            <Footer/>
        </>
    )
}