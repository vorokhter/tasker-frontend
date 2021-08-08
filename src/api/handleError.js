const defaultError = {
  success: false,
  message: "Что-то пошло не так, повторите попытку позже.",
};

export function handleError(error) {
  const response = error.response;
  if (!response) return defaultError;

  switch (response.status) {
    case 400:
      return { success: false, message: response.data.message };
    case 401: {
      if (
        !["/login", "/registration"].includes(
          window.location.pathname.toLowerCase()
        )
      ) {
        window.location.href = "/login";
      }
      return { success: false, message: response.data.message };
    }
    case 403:
      return { success: false, message: response.data.message };
    default:
      return { defaultError };
  }
}
