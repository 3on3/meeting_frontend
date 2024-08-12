import { useState } from "react";
import { CHATROOM_URL, MYPAGEMATCHING_URL } from "../config/host-config";
import { useNavigate } from "react-router-dom";

export const useFetchRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const requestFetch = async (payload , setIsChanged) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${MYPAGEMATCHING_URL}/createRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(payload);
      if (response.ok) {
        setIsChanged(true);

      } else {
        const errorText = await response.text();
        setError(errorText);

      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const alarmFetch = async (responseGroupId) => {
    console.log(responseGroupId);

    const payload = {
      responseGroupId: responseGroupId,
    }

    const response = await fetch(`${MYPAGEMATCHING_URL}/alarm`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // console.log(response)

    const data = await response.json();

    return data;


  }

  const processFetch = async (requestUrl, payload, setIsChanged) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${MYPAGEMATCHING_URL}/${requestUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setIsChanged(true);
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        setError(errorText);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createFetch = async (payload, setIsChanged) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${CHATROOM_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData:", responseData.id);

        setIsChanged(true);
        navigate(`/chatroom/${responseData.id}`);
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        setError(errorText);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return {
    alarmFetch,
    requestFetch,
    processFetch,
    createFetch,
    isLoading,
    error,
  };
};
