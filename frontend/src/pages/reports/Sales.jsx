import React from "react";

export const Sales = () => {
  const salesData = [];
  return (
    <div>
      <h2>Sales Report</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Purchase ID</th>
            <th>Purchase Date</th>
            <th>Total Amount</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.purchaseId}>
              <td>{sale.userId}</td>
              <td>{sale.userName}</td>
              <td>{sale.email}</td>
              <td>{sale.role}</td>
              <td>{sale.purchaseId}</td>
              <td>{sale.purchaseDate}</td>
              <td>{sale.totalAmount}</td>
              <td>{sale.productId}</td>
              <td>{sale.productName}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
              <td>{sale.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
