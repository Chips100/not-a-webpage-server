# not-a-webpage-server
[![Build Status](https://travis-ci.com/Chips100/not-a-webpage-server.svg?branch=master)](https://travis-ci.com/Chips100/not-a-webpage-server)

This is totally just a minimalistic webserver to host not-a-webpage. It is implemented with NodeJS and as of now, it just serves static files from a subdirectory.

## Installation
### Node.JS (w/ ChakraCore)
First, install Node.js with ChakraCore on the Windows 10 IOT device (in my case, a Raspberry PI 3). You can download it [here](https://github.com/nodejs/node-chakracore/releases) and then need to copy the files _node.exe_ and _chakracore.dll_ to the device.

### Deploy not-a-webpage-server
Run `npm run build` to compile the sources to the _dist_ subfolder. Copy those files *as well as the node_modules* folder to the device. You can now start the server by calling node with the _main.js_ file.

### Configure firewall
It might be necessary to open the port of the server in the firewall configuration. This can be done with the following Powershell command:

```cmd
netsh advfirewall firewall add rule name="Open Port 80" dir=in action=allow protocol=TCP localport=80
```
