import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000/api/",
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      console.log("Sending request to:", config.url);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Received response from:", response.config.url);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    return () => {
      source.cancel("Component unmounted: Request cancelled.");
    };
  }, []);

  const fetchData = async ({ url, method, data = {}, params = {} }) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        cancelToken: axios.CancelToken.source().token,
      });
      setResponse(result.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled", error.message);
      } else {
        setError(error.response ? error.response.data : error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
