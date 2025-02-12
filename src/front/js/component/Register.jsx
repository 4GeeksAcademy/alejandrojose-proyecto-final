import React from "react"
import { useState, useContext } from "react"
import { Context } from "../store/appContext"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../../styles/reg-log.css"

export function Register() {
    const { actions } = useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange({ target }) {
        setUser({
            ...user,
            [target.name]: target.value
        })
        console.log(user)
    }
    async function handleSubmit(event) {
        event.preventDefault()
        if (user.name.trim() == "" || user.email.trim() == "" || user.password == "") {
            alert("All credentials are required")
        }
        else {
            const response = await actions.register(user)
            if (response == 201) {
                alert("User created")
                navigate("/login")
            }
            if (response == 409) {
                alert("User already exists")
            }
            if (response == 400) {
                alert("Error registering")
            }
        }
    }
    return (
        <div>
        <button className="btn btn-secondary mt-2 go-back-button" onClick={() => navigate(-1)}>
            <i class="fa-solid fa-rotate-left"></i>
                &nbsp; Go Back</button>
        <div className="container justify-content-center align-items-center col-4 pt-5">
            <h1 className="text-center">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" type="text" onChange={handleChange} className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>
            <NavLink to="/login">Already have an account?</NavLink>
        </div>
        </div>
    )
}