import React, { Fragment } from 'react';
import {RouteButton} from '../components/RouteButton';

//import axios from 'axios';

export const Home = () =>{

    // const [data, setData] = useState({ hits: [] });
 
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const result = await axios(
    //       'https://localhost:44354/api/manager/all/0',
    //     );
   
    //     setData(result.data);
    //     console.log(result.data);
    //   };
   
    //   fetchData();
    // }, []);


    const btnClick = userType => (
      window.location.assign(`/signIn/${userType}`)
    )

    return (
        <Fragment>
            <div className="container text-center user-choosing">
                <ul>
                    <li><RouteButton action = {btnClick} text = {'Sign in as Manager'} userType = {'manager'}></RouteButton></li>
                    <li><RouteButton action = {btnClick} text = {'Sign in as Teacher'} userType = {'teacher'}></RouteButton></li>
                    <li><RouteButton action = {btnClick} text = {'Sign in as Administartor'} userType = {'admin'}></RouteButton></li>
                </ul>
            </div>
        </Fragment>
    )
}



