import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Loader} from './Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import {AlertContext} from '../context/alert/alertContext'
import $ from "jquery";

export const Table = ({request, onDelete=null, extraButtons=null}) =>{

  const [servData, setDataServ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyTable, setEmptyTable] = useState(false);
  const alert = useContext(AlertContext)

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
    setLoading(true)
    await axios.get(onDelete + id, 
    {
      headers:{
        "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
    }}).then(response => {
      alert.show('Successfully deleted!', 'success')
      setLoading(false)
  }, error =>{
      alert.show(error.response.data.errorText, 'danger')
      setLoading(false)
  })
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

const search = (text)=>{
  // eslint-disable-next-line
  $("#myTable tr").filter(function() {
    text = text.toLowerCase()
    $(this).toggle($(this).text().toLowerCase().indexOf(text) > -1)
  });
}

    return(
      emptyTable?<div className="container" style={{display: "flex", alignItems: "center", justifyContent: "center"}}><span><b>Table is empty</b></span></div> : 
      (loading ? <Loader /> :
        <div>
          <div className="divFooter"></div>
          <div className="divHeader" style={{margin: "auto", width: "200px", fontSize: "30px"}}><p><b>{(window.location.href).substr(window.location.href.lastIndexOf('/')+1).replace('_', ' ')}</b></p></div>
          
          <div style={{width: "300px", margin: "auto"}} id="mySearchField">
        <input className="form-control" id="myInput" type="text" placeholder="Search..." onChange={e =>search(e.target.value)}></input> 
        </div>
        <button style={{float: "right", marginTop: "-35px"}} onClick={() => window.print()} type="button" className="btn btn-secondary myButtonsCol">Print</button>
        
      <table className="table" id="myTableReact" style={{marginTop: "30px"}}>
     
  <thead>
    <tr>
    {Object.keys(servData[0]).map(x =>(
            <th key={x.toString()} scope="col">
                {x.replace("_", " ")}
            </th>
        ))}
    {
      extraButtons!=null ? extraButtons.map(x =>(<th key={x['name']} scope="col" className="myButtonsCol">{x['name']}</th>)) : null
    }
    {
        onDelete!=null ? 
    (<th key={"onDelete"} scope="col" className="myButtonsCol">delete  
    </th>) : null
    }
    </tr>
  </thead>
  <tbody id="myTable">
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
          extraButtons!=null ? extraButtons.map(x=>(<td key={x['name']} className="myButtonsCol">
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
          onDelete!=null ? <td className="myButtonsCol">
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

</div>
      )
    )
}