import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserToken } from "../../../config/auth";

const JoinGroupWithInvite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const inviteCode = searchParams.get("code");

  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      alert("You need to be logged in to join the group.");
      navigate("/login"); // 로그인 페이지로 리디렉션
      return;
    }

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
            navigate("/mypage"); // 성공적으로 가입하면 리디렉션
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