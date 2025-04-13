import React, {FC, useState} from 'react';
import '../styles/AuthForm.css'
import {Link, NavLink} from "react-router-dom";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

interface ILoginProps {
    title: string;
}

const AdminForm: FC<ILoginProps> = ({title}) => {
    const [formLoginData, setFormLoginData] = useState({
        username: "",
        password: "",
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormLoginData((prev) => ({
            ...prev, [name]: value})
        );
    };

    return (
        <div className="contact-wrapper">
            <header className="login-cta">
                <h2>{title}</h2>
            </header>
            <form>
                <MyInput title={"Имя пользователя"}
                         type="text"
                         name="username"
                         required={true}
                         value={formLoginData.username}
                         onChange={handleChange}
                />
                <MyInput title={"Пароль"}
                         type="password"
                         name="password"
                         required={true}
                         value={formLoginData.password}
                         onChange={handleChange}

                />
                <MyButton type="submit" style={{marginTop: "12px"}}>Войти</MyButton>
            </form>
            <div className="auth__links" style={{justifyContent: "center"}}>
                <Link to={''}>Забыли пароль?</Link>
            </div>
        </div>
    );
};

export default AdminForm;