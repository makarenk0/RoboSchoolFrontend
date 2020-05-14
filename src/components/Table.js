import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Loader} from './Loader'


export const Table = ({request, onDelete=null}) =>{

  const [servData, setDataServ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
    await axios.get(request, 
    {
      headers:{
        "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
    }})
      .then(response => {     
            if(!isCancelled){
              setDataServ(response.data)       
              setLoading(false);
            }               
      });
    }
    fetchData();
    return () => {    //cleanup if leave the page
      isCancelled = true;
    };
  }, [request]);


  const deleteItem = async(id) => {
    setDataServ(servData.filter(row => row[Object.keys(row)[0]]!==id));
    await axios.get(onDelete + id, 
    {
      headers:{
        "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
    }})
  }
    return(
      loading ? <Loader /> :<table className="table">
  <thead>
    <tr>
    {Object.keys(servData[0]).map(x =>(
            <th key={x.toString()} scope="col">
                {x}
            </th>
        ))}

    {
        onDelete!=null ? 
    (<th key={"onDelete"} scope="col">delete  
    </th>) : null
    }
    </tr>
  </thead>
  <tbody>
    {
    servData.map(element =>(
      <tr key={element[Object.keys(element)[0]]}>
        {Object.keys(element).map(cell => (
          <td key={cell}>
            {element[cell]}
          </td>
        ))}
        {
          onDelete!=null ? <td><button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => deleteItem(element[Object.keys(element)[0]])}
                                >&times;
                                </button>
                            </td> : null
        }
      </tr>
    ))
    }

  </tbody>
</table>
    )
}