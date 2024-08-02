import api from "./api";
import { Employee, EmployeeCreate, EmployeeUpdate } from "@/types";

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get<Employee[]>("/api/employees");
  return response.data;
};

export const createEmployee = async (
  employeeData: EmployeeCreate
): Promise<Employee> => {
  const response = await api.post<Employee>("/api/employees", employeeData);
  return response.data;
};

export const updateEmployee = async (
  emp_id: number,
  employeeData: EmployeeUpdate
): Promise<Employee> => {
  const response = await api.put<Employee>(
    `/api/employees/${emp_id}`,
    employeeData
  );
  return response.data;
};

export const deleteEmployee = async (emp_id: number): Promise<void> => {
  await api.delete(`/api/employees/${emp_id}`);
};
