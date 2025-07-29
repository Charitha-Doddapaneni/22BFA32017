

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Box, Paper } from "@mui/material";
import { logEvent } from "../middleware/logger";

const RedirectPage = () => {
  const { shortcode } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    logEvent("REDIRECT_ATTEMPT", { shortcode });

    // Simulate fetching data from localStorage (or you can replace with API call)
    const allLogs = JSON.parse(localStorage.getItem("appLogs")) || [];

    // Find matching shortcode
    const match = allLogs
      .reverse()
      .find(
        (log) =>
          log.event === "URL_SHORTENED" && log.data.shortcode === shortcode
      );

    if (match) {
      const expiry = new Date(match.data.expiry);
      const now = new Date();

      if (now <= expiry) {
        logEvent("REDIRECT_SUCCESS", { shortcode });
        window.location.href = match.data.longUrl;
      } else {
        setError("This short URL has expired.");
        logEvent("REDIRECT_EXPIRED", { shortcode });
      }
    } else {
      setError("Short URL not found.");
      logEvent("REDIRECT_NOT_FOUND", { shortcode });
    }
  }, [shortcode]);

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {!error ? (
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="body1" mt={2}>
            Redirecting...
          </Typography>
        </Box>
      ) : (
        <Paper elevation={4} sx={{ p: 4, maxWidth: 400 }}>
          <Typography variant="h6">Oops!</Typography>
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default RedirectPage;