import React, {useState, useEffect} from 'react'
import {getAllOrders, deleteOrder} from "../../services/OrderService.js";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

const OrderList = () => {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await getAllOrders();
            setOrders(response.data);
        } catch (error) {
            console.error("Error getting orders", error);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Confirm delete',
            text: "Are you sure you want to delete this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                    await deleteOrder(id);
                    Swal.fire("Deleted!", "Order removed successfully", "success" );
                    loadOrders();
                } catch (error) {
                    console.error("Error deleteing order", error);
                    Swal.fire("Error", "Failed to delete order", "error");
                }
            }
        });
    };

    return (
        <div className= "container mt-4">

        </div>
    )
}