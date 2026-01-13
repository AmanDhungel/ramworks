import { useFetcher, useMutator } from "@/lib/generic.service";
import { ApiResponseType } from "./apitypes";
import { WorkSpaceFormValues } from "@/components/DomainWorkspace/CreateDomainWorkspaceDialog";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/lib/action";
import { useSearchParams } from "next/navigation";

export type WorkspaceType = {
  createdAt: string;
  icon: string;
  image: string; // "/uploads/workspace/69614162750a0fba2d4e31e5/38gsyFf0ovyCh4hbfvd8PMcdWHKcqaO5.png"
  title: string; // "SASDDD"
  updatedAt: string; // "2026-01-09T17:56:50.174Z"
  _id: string; // "69614162750a0fba2d4e31e5"
};

export const useCreateWorkspace = () => {
  return useMutation<
    ApiResponseType<WorkSpaceFormValues>, // Response type
    any, // Error type
    FormData // The type of the argument to mutate
  >({
    mutationKey: ["workspace"],
    mutationFn: (formData: FormData) =>
      Post<FormData, ApiResponseType<WorkSpaceFormValues>>({
        url: formData.get("_id")
          ? `/client_api/workspace/edit_domain_workspace/${formData.get("_id")}`
          : "/client_api/workspace/create_domain_workspace",
        data: formData,
      }),
  });
};

export const useGetWorkspace = () => {
  return useFetcher<ApiResponseType<WorkspaceType[]>>(
    "workspace",
    null,
    "/client_api/workspace"
  );
};

export const useGetSingleWorkSpace = () => {
  const params = useSearchParams();
  const id = params.get("id");
  return useFetcher<ApiResponseType<WorkspaceType>>(
    "singleWorkspace",
    null,
    `/client_api/workspace/domain/${id}`
  );
};
