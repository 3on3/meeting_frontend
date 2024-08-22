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
            `${GROUP_URL}/join/invite?code=${inviteCode}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const resultDto = await response.json(); // 서버에서 보낸 InviteResultResponseDto를 받아옴
            navigate("/inviteresult", {
              state: {
                success: true,
                result: resultDto, // 받은 결과 데이터를 함께 전달
              },
            });
          } else {
            const errorText = await response.text();

            navigate("/inviteresult", {
              state: {
                success: false,
                message: errorText,
              },
            });
          }
        } catch (error) {
          console.error("Error joining group:", error);
          navigate("/inviteresult", {
            state: {
              success: false,
              message: error,
            },
          });
        }
      };

      joinGroup();
    }
  }, [inviteCode, navigate]);

  return <div>Joining group...</div>;
};

export default JoinGroupWithInvite;
