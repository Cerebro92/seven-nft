import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { sevenTokenContract } from "../contract";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: null,
      address: null,
      tokens: [
        { idx: 0, balance: null },
        { idx: 1, balance: null },
        { idx: 2, balance: null },
        { idx: 3, balance: null },
        { idx: 4, balance: null },
        { idx: 5, balance: null },
        { idx: 6, balance: null },
      ],
    };
  }

  async handleMint(event, index) {
    console.log(index);
    await sevenTokenContract.mint(index);
    await this.getBalances();
  }

  async getCurrentAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  }

  async getBalances() {
    const address = await this.getCurrentAccount();

    const balances = await sevenTokenContract.balanceOfBatch(
      [address, address, address, address, address, address, address],
      [0, 1, 2, 3, 4, 5, 6]
    );
    let updatedTokens = this.state.tokens;
    for (let idx = 0; idx <= 6; idx++) {
      updatedTokens[idx]["balance"] = balances[idx].toNumber();
    }
    this.setState({ tokens: updatedTokens });
    console.log(updatedTokens);
  }

  componentDidMount() {
    this.getBalances();
  }

  render() {
    return (
      <React.Fragment>
        <Typography
          sx={{
            color: "white",
            fontWeight: "700",
            fontSize: "1.875rem",
            lineHeight: "2.25rem",
            marginBottom: "0.25rem",
          }}
        >
          Earn NFTs {this.state.endpoint}
        </Typography>
        <Divider sx={{ backgroundColor: "white" }} />
        <Box
          sx={{
            p: 0,
            display: "grid",
            gridTemplateColumns: { md: "1fr 1fr 1fr 1fr 1fr 1fr" },
            gap: 2,
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <Paper
              sx={{
                height: "400px",
                width: "290px",
                backgroundColor: "#5db6e140",
              }}
              elevation={10}
              key={index}
            >
              <img src="https://nft-tailwind.preview.uideck.com/images/auctions/image-02.svg" />
              <Button onClick={(event) => this.handleMint(event, index)}>
                Mint #{index}
              </Button>
              <Typography>
                Current count - {this.state.tokens[index].balance}
              </Typography>
            </Paper>
          ))}
        </Box>
      </React.Fragment>
    );
  }
}

export default Content;
