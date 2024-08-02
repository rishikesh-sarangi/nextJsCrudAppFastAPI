"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} from "@/services/employeeService";
import { getDesignations } from "@/services/designationService";
import { getManagers } from "@/services/managerService";
import {
  Employee,
  EmployeeCreate,
  EmployeeUpdate,
  Designation,
  Manager,
} from "@/types";
import {
  Container,
  Table,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Pencil, Save, Trash, X } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import ResuseableModal from "../common/ReuseableModal";
import EmployeeForm from "./EmployeeForm";
import DeleteConfirmationModal from "./DeleteEmployee";
import DeleteConfirmationContent from "./DeleteEmployee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { control, handleSubmit, reset, setValue, getValues } =
    useForm<EmployeeCreate>({
      defaultValues: {
        emp_name: "",
        designation_id: 0,
        manager_id: 0,
      },
    });

  const fetchData = async () => {
    try {
      const [employeesData, designationsData, managersData] = await Promise.all(
        [getEmployees(), getDesignations(), getManagers()]
      );
      setEmployees(employeesData);
      setDesignations(designationsData);
      setManagers(managersData);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateEmployee = async (data: EmployeeCreate) => {
    try {
      await createEmployee(data);
      toast.success("Employee created successfully");
      setModalShow(false);
      fetchData();
      reset();
    } catch (err) {
      toast.error("Failed to create employee");
      setError("Failed to create employee");
    }
  };

  const handleShowModal = () => setModalShow(true);
  const handleHideModal = () => setModalShow(false);

  const handleEditClick = (employee: Employee) => {
    // Populate form fields with the current employee data
    setValue("emp_name", employee.emp_name);
    setValue("designation_id", employee.designation?.designation_id || 0);
    setValue("manager_id", employee.manager?.manager_id || 0);

    // Set the editing ID to manage state
    setEditingId(employee.emp_id);
  };

  const handleSaveClick = async () => {
    if (editingId !== null) {
      const updatedEmployee: EmployeeUpdate = {
        emp_name: getValues("emp_name"),
        designation_id: getValues("designation_id"),
        manager_id: getValues("manager_id"),
      };

      try {
        await updateEmployee(editingId, updatedEmployee);
        toast.success("Employee updated successfully");
        fetchData();
        setEditingId(null);
        reset(); // Clear form fields
      } catch (err) {
        toast.error("Failed to update employee");
        setError("Failed to update employee");
      }
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
    reset(); // Clear form fields
  };

  const handleDeleteClick = (emp_id: number) => {
    setDeleteId(emp_id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteEmployee(deleteId);
        toast.success("Employee deleted successfully");
        fetchData();
      } catch (err) {
        toast.error("Failed to delete employee");
        setError("Failed to delete employee");
      }
      setShowDeleteModal(false);
    }
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <Container fluid>
      <ToastContainer autoClose={1500} />

      <Button
        variant="outline-primary"
        className="my-3"
        onClick={handleShowModal}
      >
        Add Employee
      </Button>

      <ResuseableModal
        show={modalShow}
        onHide={handleHideModal}
        title="Add Employee"
      >
        <EmployeeForm
          onSubmit={handleCreateEmployee}
          onCancel={handleHideModal}
          designations={designations}
          managers={managers}
        />
      </ResuseableModal>

      {!loading && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Actions</th>
              <th>ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.emp_id}>
                <td>
                  {editingId === employee.emp_id ? (
                    <>
                      <div className="d-flex gap-2">
                        <Button variant="success" onClick={handleSaveClick}>
                          <Save />
                        </Button>
                        <Button variant="secondary" onClick={handleCancelClick}>
                          <X />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="link"
                        onClick={() => handleEditClick(employee)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDeleteClick(employee.emp_id)}
                      >
                        <Trash />
                      </Button>
                      <ResuseableModal
                        show={showDeleteModal}
                        onHide={handleHideDeleteModal}
                        title="Confirm Deletion"
                      >
                        <DeleteConfirmationContent
                          message="Are you sure you want to delete this employee?"
                          onConfirm={confirmDelete}
                          onCancel={handleHideDeleteModal}
                        />
                      </ResuseableModal>
                    </>
                  )}
                </td>
                <td>{index + 1}</td>
                <td>
                  {editingId === employee.emp_id ? (
                    <Controller
                      name="emp_name"
                      control={control}
                      render={({ field }) => (
                        <Form.Control type="text" {...field} />
                      )}
                    />
                  ) : (
                    employee.emp_name
                  )}
                </td>
                <td>
                  {editingId === employee.emp_id ? (
                    <Controller
                      name="designation_id"
                      control={control}
                      render={({ field }) => (
                        <Form.Control as="select" {...field}>
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
                  ) : (
                    employee.designation?.designation_name || "No Designation"
                  )}
                </td>
                <td>
                  {editingId === employee.emp_id ? (
                    <Controller
                      name="manager_id"
                      control={control}
                      render={({ field }) => (
                        <Form.Control as="select" {...field}>
                          {managers.map((manager) => (
                            <option
                              key={manager.manager_id}
                              value={manager.manager_id}
                            >
                              {manager.manager_name}
                            </option>
                          ))}
                        </Form.Control>
                      )}
                    />
                  ) : (
                    employee.manager?.manager_name || "No Manager"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {loading && (
        <div className="d-flex gap-3 justify-content-center align-items-center">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
};

export default EmployeeList;
