import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authCheckLoader, getUserToken } from "../../../config/auth";
const JoinGroupWithInvite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const inviteCode = searchParams.get("code");

  useEffect(() => {
    const token = getUserToken();
    if (inviteCode) {
      const joinGroup = async () => {
        try {
          const response = await fetch(
            `http://localhost:8253/group/join/invite?code=${inviteCode}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            alert("Successfully joined the group.");
            navigate("/mypage");
          } else {
            const errorText = await response.text();
            console.error("Error joining group:", errorText);
            alert("Failed to join the group. Please try again.");
          }
        } catch (error) {
          console.error("Error joining group:", error);
          alert("An error occurred. Please try again.");
        }
      };

      joinGroup();
    }
  }, [inviteCode, navigate]);

  return <div>Joining group...</div>;
};

export default JoinGroupWithInvite;
