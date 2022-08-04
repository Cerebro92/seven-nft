import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BlurCircularIcon from "@mui/icons-material/BlurCircular";
import { provider } from "../contract";

const ConnectButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

export default function PrimaryAppBar() {
  const [address, setAddress] = React.useState("");
  const [reload, setReload] = React.useState(false);

  async function fetchCurrentAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAddress(accounts[0]);
  }

  async function setCorrectNetwork() {
    const network = await provider.getNetwork();
    console.log(network);
    if (network.chainId != 4) {
      setReload(true);
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x4",
          },
        ],
      });
    } else {
      if (reload) {
        window.location.reload();
        setReload(false);
      }
    }
  }

  React.useEffect(() => {
    fetchCurrentAccount();
    setCorrectNetwork();

    // https://medium.com/singapore-blockchain-dapps/detecting-metamask-account-or-network-change-in-javascript-using-web3-1-2-4-2020-a441ebfda318
    window.ethereum.on("networkChanged", function (networkId) {
      console.log("networkChanged", networkId);
      setCorrectNetwork();
    });
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <BlurCircularIcon />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, paddingLeft: "0.2rem" }}
          >
            7NFT
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Typography sx={{ paddingRight: "0.5rem" }}>{address}</Typography>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <ConnectButton
              variant="contained"
              startIcon={<AccountBalanceWalletIcon />}
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
              }}
            >
              {address ? "Wallet Connected" : "Wallet Connect"}
            </ConnectButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
