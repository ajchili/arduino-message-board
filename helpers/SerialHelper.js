const SerialPort = require("serialport");

let arduinoPort;

module.exports = {
  init: () => {
    return new Promise((resolve, reject) => {
      SerialPort.list((err, ports) => {
        if (err) {
          reject(err);
        } else {
          ports.forEach((port) => {
            if (port.manufacturer && port.manufacturer.includes("Arduino")) {
              arduinoPort = new SerialPort(port.comName, {
                baudRate: 9600
              }, err => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            }
          });
        }
      });
    });
  },
  writeMessage: (message) => {
    return new Promise((resolve, reject) => {
      arduinoPort.write(message, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};