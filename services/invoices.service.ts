import { useMutation } from "@tanstack/react-query";
import { ApiResponseType } from "./apitypes";
import { Post } from "@/lib/action";
import { useFetcher } from "@/lib/generic.service";

import { ContactFormValues } from "./contact.service";
import { InvoiceFormValues } from "@/components/Accounting/CreateInvoice";

export type InvoiceType = {
  amount: number;
  contact: ContactFormValues;
  createdAt: string;
  discount: number;
  due_date: string;
  invoice_date: string;
  invoice_number: string;
  items: Array<{
    description: string;
    quantity: number;
    price: number;
    amount: number;
    _id: string;
  }>;
  length: number;
  note: string;
  payment_method: string;
  status: string;
  subtotal: number;
  tax: number;
  updatedAt: string;
  _id: string;
};

export const useCreateInvoices = () => {
  return useMutation<
    ApiResponseType<InvoiceFormValues>,
    any,
    InvoiceFormValues
  >({
    mutationKey: ["createInvoices"],
    mutationFn: (data: InvoiceFormValues) =>
      Post<InvoiceFormValues, ApiResponseType<InvoiceFormValues>>({
        url: "/client_api/invoice/add",
        data: data,
      }),
  });
};

export const useGetInvoices = () => {
  return useFetcher<ApiResponseType<InvoiceType[]>>(
    "invoices",
    null,
    "/client_api/invoice",
  );
};

export const useGetSingleInvoice = (id: string) => {
  return useFetcher<ApiResponseType<InvoiceType>>(
    ["singleInvoices", id],
    null,
    `/client_api/invoice/${id}`,
  );
};
