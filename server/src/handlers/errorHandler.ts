const tryCatchWrapper =
  (handleError: unknown) =>
  (reqFn: any) =>
  (...args: any[]) =>
    reqFn(...args).catch(handleError);

const handleError = (err: unknown) => console.log(`Error! ${err}`);

export const errorHandlerWrapper = tryCatchWrapper(handleError);
