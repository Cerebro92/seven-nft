import React from "react";
import { Box, Divider, Typography } from "@mui/material";

function Rules() {
  return (
    <Box>
      <Divider sx={{ backgroundColor: "white", margin: "1.5rem 0rem" }} />
      <Typography
        sx={{
          color: "white",
          fontWeight: "700",
          fontSize: "1.875rem",
          lineHeight: "2.25rem",
          marginBottom: "0.25rem",
          paddingLeft: "1rem",
        }}
      >
        Rules
      </Typography>
      <Box>
        <ul>
          <li>
            We have a total of 7 tokens within the collection with id from 0 to
            6.
          </li>
          <li>There is no supply limit for each token.</li>
          <li>
            Anyone can mint tokens [0-2], but there is a 1minute cooldown
            between mints. These are free to mint except for the gas cost.
          </li>
          <li>Token 3 can be minted by burning token 0 and 1.</li>
          <li>Token 4 can be minted by burning token 1 and 2.</li>
          <li>Token 5 can be minted by burning 0 and 2.</li>
          <li>Token 6 can be minted by burning 0, 1, and 2.</li>
          <li>Tokens [4-6] cannot be forged into other token.</li>
          <li>Tokens [4-6] can be burned but you get nothing back.</li>
          <li>
            You can trade any token for [0-2] by hitting the trade this button.
          </li>
          <li>
            The process of burning and minting is called forging in this
            context.
          </li>
          <li>
            The webapp must tell the user how much matic they have (we wil use
            the polygon network for cost savings).
          </li>
          <li>The webapp must tell the user how much of eah token they have</li>
          <li>Provide a link to the OpenSea page somewhere.</li>
        </ul>
      </Box>
    </Box>
  );
}
export default Rules;
