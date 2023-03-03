export const paramsSerializer = (params: any) => {
  const searchParams = new URLSearchParams();
  for (const key of Object.keys(params)) {
    const param = params[key];
    if (Array.isArray(param)) {
      for (const p of param) {
        searchParams.append(key, p);
      }
    } else {
      searchParams.append(key, param);
    }
  }
  return searchParams.toString();
};
