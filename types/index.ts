export interface Employee {
  emp_id: number;
  emp_name: string;
  designation: Designation | null;
  manager: Manager | null;
}

export interface Manager {
  manager_id: number;
  manager_name: string;
}

export interface Designation {
  designation_id: number;
  designation_name: string;
}

export interface EmployeeCreate {
  emp_name: string;
  designation_id: number;
  manager_id: number;
}

export interface EmployeeUpdate {
  emp_name: string;
  designation_id: number;
  manager_id: number;
}
