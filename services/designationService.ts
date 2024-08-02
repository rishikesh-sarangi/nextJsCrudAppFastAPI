import api from "./api";
import { Designation } from "@/types";

export const getDesignations = async (): Promise<Designation[]> => {
  const response = await api.get<Designation[]>("/api/designations");
  return response.data;
};
