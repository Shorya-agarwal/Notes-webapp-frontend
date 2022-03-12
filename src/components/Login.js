import React, { useState } from 'react'
import axios from 'axios';

export default function Login({ setIsLogin }) {
    const [user, setUser] = useState({ name: '', email: '', password: '' })
    const [err, setErr] = useState('')

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        setErr('')
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/users/register', {
                username: user.name,
                email: user.email,
                password: user.password
            })
            setUser({ name: '', email: '', password: '' })
            setErr(res.data.msg)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/users/login', {
                email: user.email,
                password: user.password
            })
            setUser({ name: '', email: '', password: '' })
            localStorage.setItem('tokenStore', res.data.token)
            setIsLogin(true)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const [onLogin, setOnLogin] = useState(false)
    const style = {
        visibility: onLogin ? "visible" : "hidden",
        opacity: onLogin ? 1 : 0
    }
    const style1 = {
        visibility: onLogin ? "hidden" : "visible",
        opacity: onLogin ? 0 : 1
    }

    return (
        <section className="login-page">
            <h1 className="text-center my-4 heading">Welcome to INotes. Save your Notes On the Cloud</h1>
            <div className="login my-4" style={style1}>
                <form onSubmit={loginSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" required value={user.email} onChange={onChangeInput} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required value={user.password} autoComplete="true" onChange={onChangeInput} />
                    </div>
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p className="form-text">You don't have an account?
                        <span onClick={() => setOnLogin(true)}> Register Here!</span>
                    </p>
                    <h3>{err}</h3>
                </form>
            </div>
            <div className="d-flex align-item-center">
            <div className="register create-note" style={style}>
                <h2>Register</h2>
                <form onSubmit={registerSubmit}>
                    <input type="text" name="name" id="register-name"
                        placeholder="User Name" required value={user.name}
                        onChange={onChangeInput} />

                    <input type="email" name="email" id="register-email"
                        placeholder="Email" required value={user.email}
                        onChange={onChangeInput} />

                    <input type="password" name="password" id="register-password"
                        placeholder="Password" required value={user.password}
                        autoComplete="true" onChange={onChangeInput} />

                    <button type="submit">Register</button>
                    <p>You have an account?
                        <span onClick={() => setOnLogin(false)}> Login Now</span>
                    </p>
                    <h3>{err}</h3>
                </form>
            </div>
            </div>
        </section>
    )
}