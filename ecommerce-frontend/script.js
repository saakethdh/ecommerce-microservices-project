const API_BASE_URL = "http://localhost:8080";

let stockChart;
let priceChart;

function showOutput(data) {
    document.getElementById("output").textContent =
        typeof data === "string"
            ? data
            : JSON.stringify(data, null, 2);
}

function getProducts() {
    fetch(API_BASE_URL + "/products")
        .then(response => response.json())
        .then(data => {
            showOutput(data);

            const tableBody = document.getElementById("productTableBody");
            tableBody.innerHTML = "";

            data.forEach(product => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.stock}</td>
                        <td>
                            <button onclick="deleteProduct(${product.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });

            drawStockChart(data);
            drawPriceChart(data);
        })
        .catch(error => showOutput("Error : " + error));
}

function addProduct() {
    const product = {
        name: document.getElementById("productName").value,
        price: Number(document.getElementById("productPrice").value),
        stock: Number(document.getElementById("productStock").value)
    };

    fetch(API_BASE_URL + "/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        showOutput(data);
        getProducts();
    })
    .catch(error => showOutput("Error : " + error));
}

function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) {
        return;
    }

    fetch(API_BASE_URL + "/products/" + id, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        showOutput(data);
        getProducts();
    })
    .catch(error => showOutput("Error : " + error));
}

function checkInventory() {
    const productId = document.getElementById("checkProductId").value;
    const quantity = document.getElementById("checkQuantity").value;

    fetch(API_BASE_URL + "/inventory/check/" + productId + "/" + quantity)
        .then(response => response.text())
        .then(data => showOutput(data))
        .catch(error => showOutput("Error : " + error));
}

function placeOrder() {
    const order = {
        productId: Number(document.getElementById("orderProductId").value),
        quantity: Number(document.getElementById("orderQuantity").value),
        totalPrice: Number(document.getElementById("orderTotalPrice").value)
    };

    fetch(API_BASE_URL + "/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(data => showOutput(data))
    .catch(error => showOutput("Error : " + error));
}

function drawStockChart(products) {
    const ctx = document.getElementById("stockChart");

    const names = products.map(product => product.name);
    const stocks = products.map(product => product.stock);

    if (stockChart) {
        stockChart.destroy();
    }

    stockChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: names,
            datasets: [{
                label: "Stock Quantity",
                data: stocks
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function drawPriceChart(products) {
    const ctx = document.getElementById("priceChart");

    const names = products.map(product => product.name);
    const prices = products.map(product => product.price);

    if (priceChart) {
        priceChart.destroy();
    }

    priceChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: names,
            datasets: [{
                label: "Product Price",
                data: prices
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}