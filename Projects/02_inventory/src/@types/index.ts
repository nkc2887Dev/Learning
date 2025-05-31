export interface Iresponse {
  flag: boolean;
  msg?: string;
  data?: Object;
}

export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}
