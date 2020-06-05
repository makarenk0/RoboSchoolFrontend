import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Loader} from '../../components/Loader'
import {AccountDataDisplay} from '../../components/AccountDataDisplay'


export const Manager_home = () =>{

    const [managerData, setManagerData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
        await axios.get('https://roboschool-api.herokuapp.com/api/manager/get', 
        {
          headers:{
            "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
        }})
          .then(response => {     
                if(!isCancelled){
                  setManagerData(response.data)   
                  setLoading(false);
                }              
          });
        }
        fetchData();
        return () => {    //cleanup if leave the page
          isCancelled = true;
        };
      }, []);

    return(
    <div style={{marginTop: "60px"}}>
        <form>
           {loading ? <Loader /> : <AccountDataDisplay data={managerData} role='Manager'></AccountDataDisplay>}
        </form>
    </div>)
}