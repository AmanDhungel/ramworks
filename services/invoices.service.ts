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
  currency: string;
  date_of_birth: string;
  email: string;
  industry: string;
  job_title: string;
  language: string;
  name: string;
  phone: string;
  rating: string;
  secondary_phone: string;
  social_accounts: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    whatsapp: string;
  };
  source: string;
  tags: string[];
  discount: number;
  due_date: string;
  invoice_date: string;
  invoice_number: string;
  items: Array<{
    amount: number;
    description: string;
    price: number;
    quantity: number;
    _id: string;
  }>;
  note: string;
  payment_method: string;
  status: string;
  subtotal: number;
  tax: number;
  updatedAt: string;
  __v: number;
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

export const useGetSingleActivity = (id: string) => {
  return useFetcher<ApiResponseType<InvoiceFormValues>>(
    ["singleInvoices", id],
    null,
    `/client_api/invoice/${id}`,
  );
};
