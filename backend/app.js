const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Gateway = require("./models/gateway");
const Device = require("./models/device");
const app = express();

mongoose
  .connect(
    "mongodb+srv://root:123@cluster0.tn8j5zo.mongodb.net/test-musiala?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Failed conection to database");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/gateways", (req, res, next) => {
  const gateway = new Gateway({
    serial: req.body.serial,
    name: req.body.name,
    ip: req.body.ip,
    devices: req.body.devices,
  });
  console.log(gateway);
  gateway.save().then((createdGateway) => {
    res.status(201).json({
      message: "Gateway added successfuly",
      id: createdGateway._id,
    });
  });
});

app.post("/api/devices", (req, res, next) => {
  const device = new Device({
    uid: req.body.uid,
    vendor: req.body.vendor,
    date_created: req.body.date_created,
    status: req.body.status,
  });
  console.log(device);
  device.save().then((createdDevice) => {
    res.status(201).json({
      message: "Device added successfuly",
      id: createdDevice._id,
    });
  });
});
//-------------------------------------------------------

app.get("/api/gateways", (req, res, next) => {
  Gateway.find().then((documents) => {
    res.status(200).json({
      message: "Gateways fetched succesfully!",
      gateways: documents,
    });
  });
});

app.get("/api/gateways/:serial", (req, res, next) => {
  Gateway.findBySerial(req.params.serial).then((gateway) => {
    if (gateway) {
      res.status(200).json(gateway);
    }else{
      res.status(404).json({message: 'Gateway not found'})
    }
  });
});

app.get("/api/devices", (req, res, next) => {
  Device.find().then((documents) => {
    res.status(200).json({
      message: "Devices fetched succesfully!",
      devices: documents,
    });
  });
});
//--------------------------------------------------------

app.delete("/api/gateways/:id", (req, res, next) => {
  Gateway.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(201).json({
      message: "Gateway deleted",
    });
  });
});

app.delete("/api/devices/:id", (req, res, next) => {
  Device.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(201).json({
      message: "Device deleted",
    });
  });
});
module.exports = app;
