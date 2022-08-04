import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { sevenTokenContract } from "../contract";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Paper
      elevation={10}
      sx={{
        bgcolor: "#5db6e140",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        minHeight: "10rem",
        ...sx,
      }}
      {...other}
    />
  );
}

class Boxes extends React.Component {
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
    await this.refreshTokenCount();
  }

  async getCurrentAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  }

  async refreshTokenCount() {
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
    this.refreshTokenCount();
  }

  render() {
    return (
      <div style={{ width: "100%", paddingTop: "2rem" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <Item key={index}>
              <Typography variant="h1">{index}</Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "2rem",
                }}
              >
                <div>Count # {this.state.tokens[index].balance}</div>
                <button onClick={(event) => this.handleMint(event, index)}>
                  Mint
                </button>
              </div>
            </Item>
          ))}
        </Box>
      </div>
    );
  }
}

export default Boxes;
