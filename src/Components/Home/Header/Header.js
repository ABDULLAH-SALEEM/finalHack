import React from 'react'
import './Header.css'
import axios from 'axios'
import logo from '../../../Assets/Images/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
    // axios.get("https://graph.facebook.com/5115639745184268/feed?limit=5&amp;access_token=EAAG5y99XyZCwBAHUFedTGkZCMzpBUxJzrZAhMb5w3eaOvJtZA44HaXhOJA0ZClLH0q4cXZCmymYHZAXceu7VS9TmEI3VuGcHphi0lkrB3xEUwxKIH6UdbqqyTKUIhTTmamZAvaxi1PSgVxjLe7LJsTSsdwk43w2q8Njh0RybA1ddZBVzEnWPVyeep0A464i2e8krtnO54rDpc4GZBa9UzHHTSXGBOFxLvwB30D8evRByKmZB4hvlEp8S1JSx71R4rDzGo4UfogjbJ8HvQZDZD")
    // .then(res=>{
    //     console.log(res.data);
    // })
    return (
        <div><div class="navbar">
            <div class="logo"><img className='logoImg' src={logo} /></div>
            <input type="checkbox" id="check" />
            <label for="check">
                <span class="toggle-button">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </span>
            </label>

            <div class="components">
                <ul>

                    <li>
                        <Link to="/" className="link">Home</Link>
                    </li>
                    <li>
                        <Link to="/course" className="link">New Courses</Link>
                    </li>
                    <li>
                        <Link to="/login" className="link"><button class="loginButton">Login</button></Link>
                    </li>
                </ul>
            </div>
            <div></div>
        </div></div>
    )
}

export default Header