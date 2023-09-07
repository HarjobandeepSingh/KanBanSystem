import React from "react"; 
import { Link } from "react-router-dom";
import "../App.css"



export default function Home(){
    return(
        <>
        <nav>
            <div className="container">
                <p className="logo">
                    TaskVortex
                </p>
                <ol>
                <li><Link to={"/Login" } style={{
                color:"white",
               }}> Login Now </Link></li>
                </ol>
            </div>
        </nav>
        <div className="htext">
            <p>Seamless Task Management:</p> 
               Empower Your Workflow
             <button
               style={{
                fontSize:"1.4vw",
                border:"2px solid ",
                borderRadius:"0.8rem",
                padding:"2px 9px 4px 9px",
                background:"white",
                fontWeight:"500"
               }}
               >  <Link to={"/Register" } 
               style={{
                color:"black",
               }}>Sign Up Now</Link></button>
        </div>

           
        
        </>
    );
}