import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { purple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { provider } from "../contract";
import { ethers } from "ethers";

const ConnectButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function Header() {
  const [balance, setBalance] = useState("");
  useEffect(() => {
    async function getCurrentAccount() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    }

    async function getAccountBalance() {
      const address = await getCurrentAccount();
      const balance = await provider.getBalance(address);
      console.log(ethers.utils.formatEther(balance));
      setBalance(ethers.utils.formatEther(balance));
    }

    // getAccountBalance();

    async function changeNetwork() {
      const network = await provider.getNetwork();
      console.log(network);
      if (network.chainId != 4) {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x4",
            },
          ],
        });
      }
    }

    // changeNetwork();
  });
  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <Typography>{balance}</Typography>
      <ConnectButton
        variant="contained"
        startIcon={<AccountBalanceWalletIcon />}
        sx={{ backgroundColor: "black", color: "white" }}
      >
        Wallet Connect
      </ConnectButton>
    </Box>
  );
}

export default Header;
