import React from 'react';

export const AccountDataDisplay = ({data, userRole}) =>{
   
   
    const ucFirst = (str) => {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
      }

    return(
        <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title mb-4">
                            <div className="d-flex justify-content-start">
                                <div className="image-container">
                                    <img src="http://placehold.it/150x150" alt="none" id="imgProfile" style={{width: "150px", height: "150px"}} className="img-thumbnail" />
                                    <div style={{marginLeft: "42px", marginTop: "10px"}}>
                                        <input type="button" className="btn btn-primary btn-sm" id="btnChangePicture" value="Change" />
                                    </div>
                                </div>
                                <div className="userData ml-3">
                                    <h2 className="d-block" style={{fontSize: "1.5rem", fontWeight: "bold"}}>{data['name'] + ' ' + data['surname']}</h2>
                                    <h6 className="d-block" style={{color: "#0000FF"}}>{userRole}</h6>  
                                </div>
                                <div className="ml-auto">
                                    <input type="button" className="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <button className="nav-link active" id="basicInfo-tab" >Basic Info</button>
                                    </li>
                                </ul>
                                <div className="tab-content ml-1" id="myTabContent">
                                    <div className= "tab-pane fade active show" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">
                                        
                                        {Object.keys(data).map(x =>( x!=="phones" ?
                                            <div key={x}>
                                            <div className="row">
                                            <div className="col-sm-3 col-md-2 col-5">
                                                <label style={{fontWeight: "bold"}}>{ucFirst(x.replace('_', ' '))}</label>
                                            </div>
                                            <div className="col-md-8 col-6">
                                                {data[x]}
                                            </div>
                                            </div> 
                                            <hr />
                                            </div> : 

                                            <div key={x}>
                                            <div className="row">
                                            <div className="col-sm-3 col-md-2 col-5">
                                                <label style={{fontWeight: "bold"}}>{ucFirst(x.replace('_', ' '))}</label>
                                            </div>
                                            <div className="col-md-8 col-6">
                                                {data[x].map(p =>(<p>{p['phone']}<br/></p>))}
                                            </div>
                                            </div> 
                                            <hr />
                                            </div>
                                        )) }
                                        

                                    </div>
                                    <div className = "tab-pane fade" id="connectedServices" role="tabpanel" aria-labelledby="ConnectedServices-tab">
                                        Facebook, Google, Twitter Account that are connected to this account
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    </div>
     )
}