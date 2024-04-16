// import ondc
const ondc = require("ondc-node");
const express = require("express");
// import handlers for the ONDC API calls
const handlers = require("./handlers");
const app = express();
app.use(express.json());
// Use ONDC Middleware to implement ONDC APIs in one line
// You can pass custom APIs handlers
// if handler does not exist a fallback handler will be used
app.use("/ondc", ondc.Middleware(
{
    "on_search": handlers["onSearch"],
    "on_init": handlers[onInit],
}));