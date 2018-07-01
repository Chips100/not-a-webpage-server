# not-a-webpage-server
[![Build Status](https://travis-ci.com/Chips100/not-a-webpage-server.svg?branch=master)](https://travis-ci.com/Chips100/not-a-webpage-server)

This is totally just a minimalistic webserver to host not-a-webpage. It is implemented with NodeJS and as of now, it just serves static files from a subdirectory.

## Installation
### Node.JS (w/ ChakraCore)
First, install Node.js with ChakraCore on the Windows 10 IOT device (in my case, a Raspberry PI 3). You can download it [here](https://github.com/nodejs/node-chakracore/releases) and then need to copy the files _node.exe_ and _chakracore.dll_ to the device.

### Deploy not-a-webpage-server
Run `npm run build` to compile the sources to the _dist_ subfolder. Copy those files *as well as the node_modules* folder to the device. You can now start the server by calling node with the _main.js_ file.

### Configure firewall
It might be necessary to open the ports of the server in the firewall configuration. This can be done with the following Powershell commands:

```cmd
netsh advfirewall firewall add rule name="Open Port 80" dir=in action=allow protocol=TCP localport=80
netsh advfirewall firewall add rule name="Open Port 443" dir=in action=allow protocol=TCP localport=443
```

### Configure as startup task
To start the server on startup of the device, you can create a scheduled task. To ensure the correct working folder when run as a scheduled task, you can use a batch file like the following:

```cmd
cd "[FULL PATH TO FOLDER CONTAINING main.js]"
[FULL PATH TO node.exe] main.js
```

Next, to create the scheduled task, the previously created batch can be referenced:

```cmd
SCHTASKS /Create /SC ONSTART /TN WebServer /TR "[FULL PATH TO BAT]" /RU SYSTEM
```
