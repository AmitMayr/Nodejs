import React from 'react'

export default function Store(props) {
    let items = props.items.map((item) =>
    (
        <div
        key={item.id}>
            id:{item.id}
            name:{item.name}
            price:{item.price}
            sale price:{item.salePrice}
        </div>
    ));
    return (
        <div style={{ display: "grid", gridTemplateColumns:"1fr 1fr 1fr" ,border:"1px solid red"}}>
            <h1>id:{props.id}</h1>
            <div >
                <p>name:{props.name}</p>
                <p>city:{props.city}</p>

            </div>
            <div>
                <div>items:{items}</div>

            </div>
        </div>
    )
}
