import { useEffect, useState } from "react"
import UserLinks from "./UserLinks"
import "./UserStyling.css"
import axios from "axios"

function ViewUser() {
    let [users, setUsers] = useState([])
    let [userId, setUserId] = useState({})
    let [allUsers, setAllUsers] = useState([])

    const getUsers = (e) => {
        let value = e.target.value;
        if (value == "All") {
            setUserId({})
        } else {
            setUserId({ _id: value })
        }
    }
    const Users = () => {
        fetch("http://localhost:8000/api/getusers")
            .then(result => result.json())
            .then(json => {
                setUsers(json.allUsers)
                setAllUsers(json.allUsers)
            })
    }
    useEffect(() => {
        Users()
    }, [])

    const getData = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            params: {
                userId
            }
        }
        axios.get("http://localhost:8000/api/getusers", config).then(response => {
            setUsers(response.data.selectedUser)
        })
    }
    console.log(userId)
    return (
        <div className="main">
            <header className="header" >
                <div className="user-pages">
                    <UserLinks />
                </div>
                <div className="dropdown">
                    <label htmlFor="users">Search Users:</label>
                    <select name="users" id="users" onChange={getUsers} title="choose any name to search">
                        <option value="All">All</option>
                        {
                            allUsers.map(user => {
                                return (
                                    <option value={user._id}>{user.name}</option>
                                )
                            })
                        }
                    </select>
                    <i className="fa fa-search search_icon" aria-hidden="true" onClick={getData} title="click to search"></i>
                </div>
            </header>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Cell #</th>
                            <th>Created at</th>
                            <th>Isdeleted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                return (
                                    <tr>
                                        <th>{user._id}</th>
                                        <th>{user.name}</th>
                                        <th>{user.email}</th>
                                        <th>{user.cell_no}</th>
                                        <th>{new Date(user.created_at).toLocaleDateString()}</th>
                                        <th>{user.isDeleted ? "true" : "false"}</th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewUser