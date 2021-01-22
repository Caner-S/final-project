import React, {Component} from "react";
import './NavBar.css';
import firebase from "../../../config/firebase";



class NavBar extends Component {


    render() {
        const renderAuthButton = ()=>{
            if(this.props.auth){
                return <li className="NavLi" style={{float: 'right'}}><a href="admin">Admin</a></li>
            }
        }
        return (
            <ul className="NavUl">
                <li className="NavLi"><a href="/">Home</a></li>
                <li className="NavLi"><a href="mybookings">My Bookings</a></li>
                <li className="NavLi"><a href="stats">Stats</a></li>
                <li className="NavLi" style={{float: 'right'}}><a onClick={() => firebase.auth().signOut()}>Sign Out</a></li>
                {renderAuthButton()}
            </ul>
        );
    }
}

export default NavBar;