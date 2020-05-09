import React from 'react';


export const Table = ({obj, onDelete=null}) =>{


    return(
        <table className="table">
  <thead>
    <tr>
    {Object.keys(obj[0]).map(x =>(
            <th key={x.toString()} scope="col">
                {x}
            </th>
        ))}

    {
        onDelete!=null? 
    (<th key={"onDelete"} scope="col">delete  
    </th>) : null
    }
    </tr>
  </thead>
  <tbody>
    {
    obj.map(element =>(
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
                                onClick={() => onDelete(element[Object.keys(element)[0]])}
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