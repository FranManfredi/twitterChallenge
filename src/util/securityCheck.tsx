import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setUser } from "../redux/user";
import { useEffect } from "react";

export const CheckSecurity = () => {
  // Retrieve the token from local storage (you can use the appropriate method for your application)
  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.user.query);
  const service = useHttpRequestService();

  const handleSetUser = async () => {
    try {
      const user = await service.me();
      //const data = await service.getPosts(query);
      dispatch(setUser(user));
      //dispatch(updateFeed(data));
    } catch (e) {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    handleSetUser().then();
  }, []);

  // Check if the token exists and is not expired
  if (token) {
    const tokenData = parseToken(token); // You'll need to implement this function to parse your token
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (!tokenData) {
      // Token is invalid
      return <Navigate to="/sign-in" replace />;
    } else if (tokenData.exp > currentTime) {
      // Token is not expired
      return <Outlet />;
    }
  }

  // Token is missing or expired, deny access
  return <Navigate to="/sign-in" replace />;
};

const parseToken = (token: string) => {
  try {
    // Split the token into header, payload, and signature
    const [, payload] = token.split(".").slice(0, 2);

    // Decode the base64-encoded header and payload
    const decodedPayload = atob(payload);

    // Parse the decoded JSON data
    const payloadData = JSON.parse(decodedPayload);

    return payloadData; // You can also return headerData if needed
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
};
