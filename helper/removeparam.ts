// hooks/use-update-params.ts
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useUpdateParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParams = (params: Record<string, string>) => {
    const queryParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      queryParams.set(key, value);
    });
    router.replace(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  const removeParam = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const removeMultipleParams = (names: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    names.forEach((name) => params.delete(name));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const getParam = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return params.get(name);
  };

  return { setParams, removeParam, getParam, removeMultipleParams };
}
