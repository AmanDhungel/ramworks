import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";
import { CompanyType } from "./company.service";
import { ContactFormValues } from "./contact.service";
import { useParams } from "next/navigation";
import { VendorFormValues } from "@/components/DomainWorkspace/VendorWorkspace/CreateVendorWorkspaceDialog";

export type ActivityType = {
  _id: string;
  title: string;
  description: string;
  activity_type: string;
  due_date: string;
  owner: ContactFormValues;
  guests: ContactFormValues[];
  deals?: string[];
  contacts: ContactFormValues[];
  companies: CompanyType[];
  createdAt: string;
  updatedAt: string;
};

export type BoardType = {
  _id: string;
  title: string;
  vendor: {
    _id: string;
    title: string;
  };
  background_images: string[];
  background_color: null;
  visibility: string;
  task_lists: {
    _id: string;
    title: string;
    completed: boolean;
    locked: boolean;
    tasks: {
      _id: string;
      title: string;
      description: string;
      completed: boolean;
      priority: string;
      contacts: {
        _id: string;
        name: string;
        email: string;
        phone: string;
      }[];
      deadline: string;
      attachments: {
        filename: string;
        uploaded_on: string;
      }[];
      invoices: {
        _id: string;
        invoice_number: string;
        contact: {
          _id: string;
          name: string;
          email: string;
          phone: string;
        };
        amount: number;
        invoice_date: string;
        due_date: string;
        status: string;
        items: {
          description: string;
          quantity: number;
          price: number;
        }[];
        payment_method: string;
        discount: number;
        tax: number;
        subtotal: number;
        note: string;
      }[];
      comments: {
        _id: string;
      };
      checklists: {
        _id: string;
        title: string;
        items: {
          text: string;
          completed: boolean;
        }[];
      };
      custom_fields: {
        field_name: string;
        field_type: string;
        field_value: string;
        field_options: string[];
      }[];
    };
  }[];
};

export type TaskListProps = {
  _id: string;
  title: string;
  completed: boolean;
  locked: boolean;
  tasks: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: string;
    contacts: {
      _id: string;
      name: string;
      email: string;
      phone: string;
    }[];
    deadline: string;
    attachments: {
      filename: string;
      uploaded_on: string;
    }[];
    invoices: {
      _id: string;
      invoice_number: string;
      contact: {
        _id: string;
        name: string;
        email: string;
        phone: string;
      };
      amount: number;
      invoice_date: string;
      due_date: string;
      status: string;
      items: {
        description: string;
        quantity: number;
        price: number;
      }[];
      payment_method: string;
      discount: number;
      tax: number;
      subtotal: number;
      note: string;
    }[];
    comments: {
      _id: string;
    };
    checklists: {
      _id: string;
      title: string;
      items: {
        text: string;
        completed: boolean;
      }[];
    };
    custom_fields: {
      field_name: string;
      field_type: string;
      field_value: string;
      field_options: string[];
    }[];
  };
};

export const useCreateBoard = () => {
  return useMutation<ApiResponseType<VendorFormValues>, any, VendorFormValues>({
    mutationKey: ["createBoard"],
    mutationFn: (data: VendorFormValues) =>
      Post<VendorFormValues, ApiResponseType<VendorFormValues>>({
        url: "/client_api/board/create_board",
        data: data,
      }),
  });
};

export const useGetBoard = (id: string) => {
  return useFetcher<ApiResponseType<BoardType[]>>(
    ["board", id],
    null,
    `/client_api/board/vendor_boards/${id}`,
  );
};
export const useGetDNDBoard = (id: string) => {
  return useFetcher<ApiResponseType<BoardType>>(
    "dndboard",
    null,
    `/client_api/board/${id}`,
  );
};
// /api/board/add_tasklist/:board_id
export const useCreateTaskList = (id: string) => {
  return useMutation<ApiResponseType<VendorFormValues>, any, { title: string }>(
    {
      mutationKey: ["createTaskList"],
      mutationFn: (data: { title: string }) =>
        Post<{ title: string }, ApiResponseType<VendorFormValues>>({
          url: "/client_api/board/add_tasklist/" + id,
          data: data,
        }),
    },
  );
};

export const useCreateTasks = (id: string) => {
  const param = useParams();
  const BoardId = param?.board;
  return useMutation<ApiResponseType<VendorFormValues>, any, { title: string }>(
    {
      mutationKey: ["createTaskList"],
      mutationFn: (data: { title: string }) =>
        Post<{ title: string }, ApiResponseType<VendorFormValues>>({
          url: `/client_api/board/add_task/${BoardId}/${id}`,
          data: data,
        }),
    },
  );
};

export const useGetSingleBoard = (id: string) => {
  return useFetcher<ApiResponseType<ActivityType>>(
    ["singleBoard", id],
    null,
    `/client_api/activity/${id}`,
  );
};

type TaskListType = {
  source_tasklist_id: string;
  destination_tasklist_id: string;
  source_index: number;
  destination_index: number;
};

export const useDragDropTask = (id: string) => {
  return useMutation<
    ApiResponseType<VendorFormValues>,
    any,
    {
      source_tasklist_id: string;
      destination_tasklist_id: string;
      source_index: number;
      destination_index: number;
    }
  >({
    mutationKey: ["dragNDropTask"],
    mutationFn: (data: TaskListType) =>
      Post<TaskListType, ApiResponseType<VendorFormValues>>({
        url: `/client_api/board/move_task/${id}`,
        data: data,
      }),
  });
};
