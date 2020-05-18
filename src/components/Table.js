import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Loader} from './Loader'


export const Table = ({request, onDelete=null}) =>{

  const [servData, setDataServ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyTable, setEmptyTable] = useState(false);

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
              if(response.data.length!==0){
                console.log(response)
                setDataServ(response.data) 
              }
              else{ 
                setEmptyTable(true)
              }   
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
    if(servData.length===1) {setEmptyTable(true)}
    setDataServ(servData.filter(row => row[Object.keys(row)[0]]!==id));
    
    await axios.get(onDelete + id, 
    {
      headers:{
        "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
    }})
  }
    return(
      emptyTable?<div className="container" style={{display: "flex", alignItems: "center", justifyContent: "center"}}><span><b>Table is empty</b></span></div> : 
      (loading ? <Loader /> :<table className="table">
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
          Array.isArray(element[cell])? 
          <td key={cell}>
            <table className="table table-bordered">
            <thead>
            <tr>
                 {Object.keys(element[cell][0]).map(x =>(
                    <th key={x.toString()} scope="col">
                     {x}
                    </th>
                  ))}
           </tr>
            </thead>
            <tbody>
                {element[cell].map(inArrayelem => (<tr key = {element[cell].indexOf(inArrayelem)}>{Object.keys(inArrayelem).map(field =>(<td key={field}>{inArrayelem[field]}</td>))}</tr>)   ) }
            </tbody>
            </table>
  
          </td>
          :
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
    )
}