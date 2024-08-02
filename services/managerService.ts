import api from "./api";
import { Manager } from "@/types";

export const getManagers = async (): Promise<Manager[]> => {
  const response = await api.get<Manager[]>("/api/managers");
  return response.data;
};
