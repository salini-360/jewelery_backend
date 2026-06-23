let lastOrderCount = 0;

async function loadOrders() {

    const res = await fetch(
        "https://jewelery-backend.onrender.com/api/orders"
    );

    const data = await res.json();

    // New Order Notification
    if(lastOrderCount > 0 && data.length > lastOrderCount){

        const audio = new Audio("notification.mp3");
        audio.play();

        document.body.insertAdjacentHTML(
            "beforeend",
            `
            <div id="notificationPopup"
            style="
            position:fixed;
            top:20px;
            right:20px;
            background:#28a745;
            color:white;
            padding:15px 25px;
            border-radius:10px;
            box-shadow:0 5px 20px rgba(0,0,0,.3);
            z-index:99999;
            font-weight:bold;
            ">
            🔔 New Order Received!
            </div>
            `
        );

        setTimeout(() => {
            const popup =
            document.getElementById("notificationPopup");

            if(popup){
                popup.remove();
            }
        },3000);
    }

    lastOrderCount = data.length;

    let html = "";

    data.forEach(order => {

        html += `
        <div class="card">

            <span
            class="delete"
            onclick="deleteOrder('${order._id}')">
            ❌
            </span>

            <h3>${order.customerName}</h3>

            <p><b>Phone:</b> ${order.phone}</p>

            <p><b>Email:</b> ${order.email}</p>

            <p><b>Address:</b> ${order.address}</p>

            <p><b>Total:</b> ₹${order.totalAmount}</p>

            <p>
                <b>Status:</b>

                <span class="${order.status.toLowerCase()}">
                    ${order.status}
                </span>
            </p>

            <div class="btns">

                <button
                class="confirm"
                onclick="updateStatus('${order._id}','Confirmed')">
                ✅ Confirm
                </button>

                <button
                class="cancel"
                onclick="updateStatus('${order._id}','Cancelled')">
                ❌ Cancel
                </button>

            </div>

        </div>
        `;
    });

    document.getElementById("orders").innerHTML = html;
}

async function updateStatus(id,status){

    await fetch(
        `https://jewelery-backend.onrender.com/api/orders/${id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({status})
        }
    );

    loadOrders();
}

async function deleteOrder(id){

    if(!confirm("Delete this order?")) return;

    await fetch(
        `https://jewelery-backend.onrender.com/api/orders/${id}`,
        {
            method:"DELETE"
        }
    );

    loadOrders();
}

loadOrders();

setInterval(loadOrders,5000);
