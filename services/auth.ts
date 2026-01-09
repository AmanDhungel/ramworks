import { Post } from "@/lib/action";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiResponseLogin } from "./apitypes";
import { LoginFormValues } from "@/app/page";
import { useMutator } from "@/lib/generic.service";

export const useLogin = () => {
  return useMutator<ApiResponseLogin<LoginFormValues>, LoginFormValues>(
    "/client_api/auth/signin"
  );
};
