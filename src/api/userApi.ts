import type { User } from "../types";
import axiosInstance from "./axiosInstance";

export const getUsers = () => axiosInstance.get<User[]>("/users");
