const socket = io();

const _formProduct = document.getElementById("frmProduct");

if(_formProduct){
    _formProduct.addEventListener("submit", (event)=>{
        event.preventDefault();

        const _title = document.getElementById("title");
        const _description = document.getElementById("description");
        const _price = document.getElementById("price");
        const _thumbnail = document.getElementById("thumbnail");
        const _stock = document.getElementById("stock");
        const _category = document.getElementById("category");
        const _code = document.getElementById("code");
        socket.emit('message', {title:_title.value, description:_description.value, price:_price.value, thumbnail:_thumbnail.value,
            stock:_stock.value, category:_category.value, code:_code.value });

        _title.value = "";
        _description.value = "";
        _price.value = "";
        _thumbnail.value ="";
        _stock.value="";
        _category.value="";
        _code.value="";
    })
}
socket.on('init', (data)=>{
    console.log('event init', data);
    renderTable(data);
});
socket.on('real-time-products', (data)=>{
    console.log('event real-time-products', data);
    renderTable(data);
});


const renderTable = (data)=>{
    let tbodyProducts = document.getElementById('tbodyProducts');

    if(tbodyProducts){
        tbodyProducts.innerHTML="";
        data.products.map((value, index) => {
            const row = document.createElement("tr");
            const th = document.createElement("th");
            th.innerText = value.id;
            row.appendChild(th);
            let td = document.createElement("td");
            td.innerText = value.product.title;
            row.appendChild(td);

            td = document.createElement("td");
            td.innerText = value.product.description;
            row.appendChild(td);

            td = document.createElement("td");
            td.innerText = value.product.price;
            row.appendChild(td);

            td = document.createElement("td");
            td.innerText = value.product.thumbnail;
            row.appendChild(td);

            td = document.createElement("td");
            td.innerText = value.product.code;
            row.appendChild(td);

            td = document.createElement("td");
            td.innerText = value.product.stock;
            row.appendChild(td);

            td = document.createElement("td");
            td.innerText = value.product.category;
            row.appendChild(td);

            td = document.createElement("td");
            var btn = document.createElement("button");
            btn.innerHTML = "eliminar";
            btn.addEventListener("click", (event)=>{
                console.log('click en boton # ' , value.id);
                socket.emit('delete', {id:value.id});
            })
            td.appendChild(btn);
            row.appendChild(td);
            tbodyProducts.appendChild(row);
        });
    }
}
