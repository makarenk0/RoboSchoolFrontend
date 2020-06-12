import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Loader} from './Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'

export const Table = ({request, onDelete=null, extraButtons=null}) =>{

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
  }, [request, loading]);


  const deleteItem = async(id) => {
    if(servData.length===1) {setEmptyTable(true)}
    setDataServ(servData.filter(row => row[Object.keys(row)[0]]!==id));
    
    await axios.get(onDelete + id, 
    {
      headers:{
        "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
    }})
  }
  
  const extraButtonAction = async(id, request) => {
    setLoading(true);
    await axios.get(request + id, 
    {
      headers:{
        "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
    }})
    .then( response =>{
      setLoading(false);
    }
    );
  }

  const isTrue =(value) =>{
    return value===true
  }

  const enablingButtons = (left, right) =>{
    if(right.charAt(0)==='!'){
      return left !== right.slice(1)
    }
    else{
      return left === right
    }
  }



    return(
      emptyTable?<div className="container" style={{display: "flex", alignItems: "center", justifyContent: "center"}}><span><b>Table is empty</b></span></div> : 
      (loading ? <Loader /> :<table className="table">
  <thead>
    <tr>
    {Object.keys(servData[0]).map(x =>(
            <th key={x.toString()} scope="col">
                {x.replace("_", " ")}
            </th>
        ))}
    {
      extraButtons!=null ? extraButtons.map(x =>(<th key={x['name']} scope="col">{x['name']}</th>)) : null
    }
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
                 {element[cell].length!==0 ? Object.keys(element[cell][0]).map(x =>(
                    <th key={x.toString()} scope="col">
                     {x.replace("_", " ")}
                    </th>
                  )) : null}
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
          extraButtons!=null ? extraButtons.map(x=>(<td key={x['name']}>
                               <button
                               type="button"
                               className="btn btn-outline-primary btn-sm"
                               onClick={() => extraButtonAction(element[Object.keys(element)[0]], x['request'])} 
                               disabled={ (x['enable'].map(field =>(enablingButtons(element[Object.keys(field)[0]], field[Object.keys(field)[0]])))).every(isTrue) ? false : true}
                              >   <FontAwesomeIcon icon={x['icon']}/>
                              </button>
                              </td>)) : null
        }
        {
          onDelete!=null ? <td>
                                <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => deleteItem(element[Object.keys(element)[0]])}
                                >   <FontAwesomeIcon icon={faTimes}/>
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