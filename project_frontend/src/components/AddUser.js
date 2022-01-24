import { useState } from "react"
import { useHistory } from "react-router-dom"
import UserLinks from "./UserLinks"
import "./UserStyling.css"

function AddUser() {
    const history = useHistory()
    let [state, setState] = useState({
        name: "", email: "", age: 18, cell_no: ""
    })
    let url = "http://localhost:8000/api/adduser"

    onchange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    console.log(state)
    const postData = async (e) => {
        e.preventDefault()

        const { name, email, age, cell_no } = state
        const res = await fetch("http://localhost:8000/api/addnewuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, age, cell_no
            })
        })

        const data = await res.json()
        console.log(data)
        if (data.status == 409) {
            window.alert(data.message)
        } else if (data.status == 200) {
            window.alert("User add successfully")
            history.push("/viewusers")
        } else {
            window.alert(data.error)
        }
    }

    return (
        <div className="main">
            <header className="adduser_header">
                <UserLinks />
            </header>
            <div className="form">
                <form method="post" action={url}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" maxLength={30} minLength={3} required />
                    <label htmlFor="email">Email:</label>
                    <input name="email" id="email" pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" required />
                    <label htmlFor="age">Age:</label>
                    <input type="number" min={18} max={60} id="age" name="age" required />
                    <label htmlFor="cell">Cell no:</label>
                    <input type="text" id="cell" name="cell_no" required />
                    <button type="submit" onClick={postData} className="adduser_btn">Add User</button>
                </form>
            </div>
        </div>
    )
}

export default AddUser