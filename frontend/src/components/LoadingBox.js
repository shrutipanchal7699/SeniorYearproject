import React from 'react'

// Sending a loading message to AJAX server before displaying the products
export default function LoadingBox(){
    return (
        <div className ="loading">

           {/* defining a simple loading component  */}
           <i className="fa fa-spinner fa-spin">Wait... Loading...</i>
        </div>
    )
}