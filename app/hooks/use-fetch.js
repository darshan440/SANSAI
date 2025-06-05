const { UndoIcon } = require("lucide-react");
const { useState } = require("react");
const { useFormState } = require("react-hook-form");
const { toast } = require("sonner");

const useFetch = (cb) => {
  const [data, setData] = useFormState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const fn = async (...args) => {
    setLoading(true);
    setError(true);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };
  return { data, loading, error, fn, setData };
};
