import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2"
import{
    createOrder,
    getOrderById,
    updateOrder,
} from "../../services/OrderService.js";
import {getAllCustomers} from "../../services/CustomerService.js";

const OrderForm = () => {
    const [order, setOrder] = useState({
        orderDate: "",
        price: "",
        details: "",
        customerId: ""
    });

    const [customer, setCustomer] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadCustomers();
        if (id) loadOrder();
        },[id]);

    const loadCustomers = async () => {
        try {
            const response = await getAllCustomers();
            setCustomer(response.data);
        } catch (error) {
            console.error("Error loading customers", error);
            Swal.fire("Error", "Error loading customers.", "error");
        }
    };

    const loadOrder = async () => {
        try {
            const response = await getOrderById(id);
            const data = response.data;
            setOrder({
                orderDate: data.orderDate || "",
                price: data.price || "",
                details: data.details || "",
                customerId: data.customerId || "",
            });
        } catch (error) {
            console.error("Error loading order", error);
            Swal.fire("Error", "Error loading order.", "error");
        }
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setOrder({
            ...order,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            orderDate: order.orderDate,
            price: order.price,
            details: order.details || null,
        };

        try {
            if(id) {
                await updateOrder(id, payload);
                Swal.fire("Updated", "Order successfully updated", "success");
            } else {
                await createOrder(payload);
                Swal.fire("Created", "Order successfully created", "success");
            }
            navigate("/orders");
        } catch (error) {
            console.error("Error loading order", error);
            Swal.fire("Error", "Failed to save Order", "error");
        }
    };

    return (
        <div className = "container mt-4">
            <h2>{id ? "Edit Order" : "Add Order"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Order Date</label>
                    <input
                        type="date"
                        name="orderDate"
                        className="form-control"
                        value={order.orderDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        name="Price"
                        className="form-control"
                        value={order.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Details</label>
                    <input
                        type="text"
                        name="Details"
                        className="form-control"
                        value={order.details || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Customer</label>
                    <select
                        name = "customerId"
                        className="form-select"
                        value={order.customerId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Customer --</option>
                        {customer.map((customer) => (
                            <option key = {customer.id} value = {customer.id}>
                                {customer.firstName} {customer.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <button type = "submit" className="btn btn-success me-2">
                    Save
                </button>
                <button
                type = "button"
                className="btn btn-secondary"
                onClick={() => navigate("/orders")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default OrderForm;