export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    // `exp` is in seconds, Date.now() returns ms
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedPayload.exp > currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};
