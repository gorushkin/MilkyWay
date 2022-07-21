export const getCallbackData = (action: string, value?: string) => {
  return JSON.stringify({ action, ...(value && { value }) });
};

export const getActionValue = (queryData: string): { action: string; value: string } => {
  const { action, value } = JSON.parse(queryData);
  return { action, value };
};

export const getFlatArray = <T>(target: Array<T>): Array<T> => {
  const res: Array<T> = [];

  const req = (n: T | Array<T>) => {
    if (!Array.isArray(n)) res.push(n);
    else {
      n.forEach(req);
    }
  };

  req(target);
  return res;
};
