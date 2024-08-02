"use client";

import { useState, useEffect } from "react";
import { getDesignations } from "@/services/designationService";
import { Designation } from "@/types";

const DesignationList = () => {
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const data = await getDesignations();
        setDesignations(data);
      } catch (err) {
        setError("Failed to fetch designations");
      } finally {
        setLoading(false);
      }
    };

    fetchDesignations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Designations</h2>
      <ul>
        {designations.map((designation) => (
          <li key={designation.designation_id}>
            {designation.designation_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DesignationList;
