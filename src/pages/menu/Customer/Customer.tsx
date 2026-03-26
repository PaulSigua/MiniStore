import { useUser } from "../../../core/hooks/user.hook";
import { getCustomers } from "./customer.config";
import { useEffect, useState } from "react";
import type { User } from "../../../core/utils/user.auth";

export const Customer = () => {
  const { user } = useUser();
  const [customers, setCustomers] = useState<User[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await getCustomers(user);
      setCustomers(customers);
    };
    fetchCustomers();
  }, [user]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold color-text">Clientes</h1>
      <table className="table-container">
        <thead >
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.username}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};