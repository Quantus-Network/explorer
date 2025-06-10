const extractErrMsg = (
  error: any,
  query?: { meta?: { errorMessage?: string } }
): string => {
  if (error.response?.data.error) {
    return error.response.data.error;
  }

  if (error.response?.data.errors?.[0]) {
    return error.response.data.errors[0].message;
  }

  if (query && query.meta?.errorMessage) {
    return query.meta.errorMessage;
  }

  return error.message;
};

export default extractErrMsg;
