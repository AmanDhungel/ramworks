// hooks/use-update-params.ts
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useUpdateParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const removeParam = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const getParam = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get(name);
  };

  return { setParam, removeParam, getParam };
}
