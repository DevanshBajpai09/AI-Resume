import { useState, useCallback } from "react";
import CustomToast from "../Component/CustomToast";

const useCustomToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (type, message, duration = 3500) => {
      setToast({
        id: Date.now(),
        type,
        message,
        duration,
      });
    },
    []
  );

  const success = useCallback(
    (message, duration) => {
      showToast("success", message, duration);
    },
    [showToast]
  );

  const error = useCallback(
    (message, duration) => {
      showToast("error", message, duration);
    },
    [showToast]
  );

  const warning = useCallback(
    (message, duration) => {
      showToast("warning", message, duration);
    },
    [showToast]
  );

  const info = useCallback(
    (message, duration) => {
      showToast("info", message, duration);
    },
    [showToast]
  );

  const Toast = toast ? (
    <CustomToast
      key={toast.id}
      type={toast.type}
      message={toast.message}
      duration={toast.duration}
      onClose={() => setToast(null)}
    />
  ) : null;

  return {
    success,
    error,
    warning,
    info,
    Toast,
  };
};

export default useCustomToast;