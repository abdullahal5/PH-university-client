import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data: {
    data: any;
    result?: T;
    meta?: TMeta;
    success: boolean;
    message: string;
  };
  error?: TError;
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export const bloodGroupOptions = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
].map((group) => ({
  value: group,
  label: group,
}));

export const genderOptions = ["male", "female", "others"].map((gender) => ({
  value: gender,
  label: gender.charAt(0).toUpperCase() + gender.slice(1),
}));