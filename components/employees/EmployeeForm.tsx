import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { Designation, EmployeeCreate, Manager } from "@/types"; // Adjust the path as needed

interface EmployeeFormProps {
  onSubmit: (data: EmployeeCreate) => void;
  onCancel: () => void;
  designations: Designation[];
  managers: Manager[];
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  onCancel,
  designations,
  managers,
}) => {
  const { control, handleSubmit } = useForm<EmployeeCreate>({
    defaultValues: {
      emp_name: "",
      designation_id: 0,
      manager_id: 0,
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Controller
          name="emp_name"
          control={control}
          render={({ field }) => (
            <Form.Control
              type="text"
              {...field}
              required
              placeholder="Enter name"
            />
          )}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Designation</Form.Label>
        <Controller
          name="designation_id"
          control={control}
          render={({ field }) => (
            <Form.Control as="select" {...field} required>
              <option value="">Select Designation</option>
              {/* Populate with actual designations */}
              {designations.map((designation) => (
                <option
                  key={designation.designation_id}
                  value={designation.designation_id}
                >
                  {designation.designation_name}
                </option>
              ))}
            </Form.Control>
          )}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Manager</Form.Label>
        <Controller
          name="manager_id"
          control={control}
          render={({ field }) => (
            <Form.Control as="select" {...field} required>
              <option value="">Select Manager</option>
              {/* Populate with actual managers */}
              {managers.map((manager) => (
                <option key={manager.manager_id} value={manager.manager_id}>
                  {manager.manager_name}
                </option>
              ))}
            </Form.Control>
          )}
        />
      </Form.Group>
      <div className="d-flex gap-2 mt-3">
        <Button type="submit" variant="outline-primary">
          Add Employee
        </Button>
        <Button variant="outline-danger" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EmployeeForm;
