import React, {useState} from 'react'
import axios from 'axios';
import './login.css'
export default function Login({setIsLogin}) {
  const [user, setUser] = useState({
    name: ' ',
    email: ' ',
    password: ''
  })
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
  return (
    <div className="container">
      <section>
        <div className="login my-4">
          <form onSubmit={loginSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" value={user.email} onChange={onChangeInput} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={user.password} autoComplete="true" onChange={onChangeInput} />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <p className="form-text">You don't have an account?
              <span onClick={() => setOnLogin(true)}> Register Here!</span>
            </p>
            <h3>{err}</h3>
          </form>
        </div>
        <div className="register my-4" style={style}>
          <section >
            <div className="mask d-flex align-items-center h-75">
              <div className="container h-75">
                <div className="row d-flex justify-content-center align-items-center h-75">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" style={{ borderRadius: " 15px", boxShadow: '10px 10px 5px 12px lightblue' }}>
                      <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                        <form onSubmit={registerSubmit}>

                          <div className="form-outline mb-4">
                            <input type="text" id="form3Example1cg" className="form-control form-control-lg" value={user.name} onChange={onChangeInput} />
                            <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                          </div>

                          <div className="form-outline mb-4">
                            <input type="email" id="form3Example3cg" className="form-control form-control-lg" value={user.email} onChange={onChangeInput} />
                            <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                          </div>

                          <div className="form-outline mb-4">
                            <input type="password" id="form3Example4cg" className="form-control form-control-lg" value={user.password} onChange={onChangeInput} />
                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                          </div>

                          <div className="form-outline mb-4">
                            <input type="password" id="form3Example4cdg" className="form-control form-control-lg" value={user.password} onChange={onChangeInput} />
                            <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                          </div>

                          <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3cg"
                            />
                            <label className="form-check-label" htmlFor="form2Example3g">
                              I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                          </div>

                          <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!" className="fw-bold text-body"><u onClick={() => setOnLogin(false)}>Login here</u></a></p>
                          <h3>{err}</h3>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}


// className="vh-75 bg-image" style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}