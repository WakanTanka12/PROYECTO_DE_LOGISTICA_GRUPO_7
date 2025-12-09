import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-primary text-white mt-auto py-3 shadow-sm">
            <div className="container text-center small">
                <span>©{new Date().getFullYear()} Property Rights - Wakan Tanka</span>
            </div>
        </footer>
    );
};

export default Footer

