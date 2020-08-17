import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import { AuthContext } from "../../utils/auth-context";
import { httpGetAllItems } from "../../utils/httpFetch";

import Orders from "./Orders";
import Card from './Card'

export default function Accounts() {
                const auth = useContext(AuthContext);
                const { isLoggedIn } = auth;
                 return (
                     isLoggedIn ? <Link to={"/orders"}>
                       <Card hoverable />
                     </Link> : "Please Login to View this page" 
                 );
               }
