"use client";

import { useState, useEffect } from "react";
import { getManagers } from "@/services/managerService";
import { Manager } from "@/types";

const ManagerList = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const data = await getManagers();
        setManagers(data);
      } catch (err) {
        setError("Failed to fetch managers");
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Managers</h2>
      <ul>
        {managers.map((manager) => (
          <li key={manager.manager_id}>{manager.manager_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerList;
