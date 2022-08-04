import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import Content from "./components/content";
import Rules from "./components/rules";
import Boxes from "./components/boxes";
import PrimaryAppBar from "./components/Appbar";

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>7NFT</title>
        <link rel="canonical" href="http://example.com/example" />
      </Helmet>
      <Box
        sx={{
          backgroundImage: `url("https://images.unsplash.com/photo-1557683316-973673baf926")`,
          minHeight: "100vh",
          backgroundSize: "cover",
          padding: "10px 40px",
        }}
      >
        <PrimaryAppBar />
        {/* <Header /> */}
        {/* <Content /> */}
        <Boxes />
        <Rules />
      </Box>
    </React.Fragment>
  );
}

export default App;
