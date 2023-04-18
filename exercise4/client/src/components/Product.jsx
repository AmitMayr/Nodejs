import React from 'react'

export default function Product(props) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between" ,border:"1px solid red"}}>
            <h1>id:{props.id}</h1>
            <div >
                <p>name:{props.name}</p>
                <p>price:{props.price}</p>
                <p>sale price:{props.salePrice}</p>
            </div>
        </div>
    )
}
