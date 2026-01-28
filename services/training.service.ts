import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";
import { EmployeeType } from "./employee.service";
import { TrainingFormValues } from "@/components/HRM/Training/AddTraining";

export type TrainingType = {
  _id?: string;
  type: string;
  description: string;
  status: "active" | "inactive";
};

export type TrainerType = {
  _id?: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  phone: string;
  description: string;
  status: "active" | "inactive";
};

export type Training = {
  _id?: string;
  training_type: TrainingType;
  trainer: TrainerType;
  employees: EmployeeType[];
  training_cost: number;
  start_date: string;
  end_date: string;
  description: string;
  status: "active" | "inactive";
};

export const useGetTrainingType = () => {
  return useFetcher<ApiResponseType<TrainingType[]>>(
    "trainingType",
    null,
    `/client_api/training/training_types`,
  );
};
export const useGetSingleTrainingType = ({ id }: { id: string }) => {
  return useFetcher<ApiResponseType<TrainingType>>(
    ["singleTrainingType", id],
    null,
    `/client_api/training/training_types/${id}`,
  );
};
export const useCreateTrainingType = () => {
  return useMutation<ApiResponseType<TrainingType>, any, TrainingType>({
    mutationKey: ["createTrainingType"],
    mutationFn: (data: TrainingType) =>
      Post<TrainingType, ApiResponseType<TrainingType>>({
        url: `/client_api/training/add_training_type`,
        data: data,
      }),
  });
};
export const useGetTrainers = () => {
  return useFetcher<ApiResponseType<TrainerType[]>>(
    "trainers",
    null,
    `/client_api/training/trainers`,
  );
};
export const useGetSingleTrainer = ({ id }: { id: string }) => {
  return useFetcher<ApiResponseType<TrainerType>>(
    ["singleTrainer", id],
    null,
    `/client_api/training/trainers/${id}`,
  );
};
export const useCreateTrainer = () => {
  return useMutation<ApiResponseType<TrainerType>, any, TrainerType>({
    mutationKey: ["createTrainer"],
    mutationFn: (data: TrainerType) =>
      Post<TrainerType, ApiResponseType<TrainerType>>({
        url: `/client_api/training/add_trainer`,
        data: data,
      }),
  });
};
export const useGetTraining = () => {
  return useFetcher<ApiResponseType<Training[]>>(
    "training",
    null,
    `/client_api/training`,
  );
};
export const useGetSingleTraining = ({ id }: { id: string }) => {
  return useFetcher<ApiResponseType<Training>>(
    ["singleTraining", id],
    null,
    `/client_api/training/${id}`,
  );
};
export const useCreateTraining = () => {
  return useMutation<
    ApiResponseType<TrainingFormValues>,
    any,
    TrainingFormValues
  >({
    mutationKey: ["createTraining"],
    mutationFn: (data: TrainingFormValues) =>
      Post<TrainingFormValues, ApiResponseType<TrainingFormValues>>({
        url: `/client_api/training/add_training`,
        data: data,
      }),
  });
};
