import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

import { adminLogin } from "../../Services/loginService";

import "./login.css";

function Login(props) {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmitForm = (event) => {
        event.preventDefault();
        if (!loginData.username || !loginData.password) {
            toast("Fields must be entered", { type: "error" });
            return;
        }
        setLoading(true);
        onSubmitLogin();
    }

    const onSubmitLogin = async () => {
        const response = await adminLogin(loginData);
        if (response.data) {
            toast(response.message, { type: "success" });
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } else {
            toast(response.message, { type: "error" });
        }
        setLoading(false);
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        const updatedLoginData = {
            ...loginData,
            [name]: value,
        }
        setLoginData(updatedLoginData);
    }

    return (
        <div className="LoginContainer">
            <form onSubmit={handleSubmitForm} className="LoginForm">
                <div className="LoginFormContainer">
                    <div className="LoginTitle">Venue Admin Login</div>
                    <div className="UsernameFieldContainer">
                        <input
                            className="InputField"
                            type="text"
                            name="username"
                            placeholder="username"
                            value={loginData.username}
                            onChange={handleFieldChange}
                        />
                    </div>
                    <div className="PasswordFieldContainer">
                        <input
                            className="InputField"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="password"
                            value={loginData.password}
                            onChange={handleFieldChange}
                        />
                        {(showPassword) ? (
                            <EyeSlashFill
                                className="PasswordEyeIcon"
                                size={18}
                                color="white"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <EyeFill
                                className="PasswordEyeIcon"
                                size={18}
                                color="white"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    <button
                        className="NormalSaveBtn"
                        type="submit"
                        disabled={loading}>
                        Sign In
                    </button>
                    <div className="RegisterBtn">New Registration ?</div>
                </div>
            </form>
        </div>
    )
}

export default Login;