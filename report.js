const fetch = require("node-fetch");
const si = require('systeminformation');

const apiKey = process.argv[2] || "";
const apiHost = process.argv[3] || "https://mon.wehmoen.dev/api/report";

const METRICS = [
    "system",
    "bios",
    "baseboard",
    "cpu",
    "cpuCurrentspeed",
    "cpuTemperature",
    "currentLoad",
    "mem",
    "memLayout",
    "battery",
    "graphics",
    "osInfo",
    "uuid",
    "versions",
    "users",
    "processes",
    "services",
    "diskLayout",
    "blockDevices",
    "fsSize",
    "networkInterfaces",
    "networkInterfaceDefault",
    "networkGatewayDefault",
    "networkStats",
    "networkConnections",
    "inetChecksite",
    "inetLatency",
    "wifiNetworks",
    "dockerInfo",
    "dockerAll"
];

async function generateReport() {
    const REPORT = {};
    for (const metric of METRICS) {
        console.log(`Loading: ${metric}`)
        REPORT[metric] = await si[metric]();
    }

    return REPORT;
}

function submit(report) {
    return fetch(`${apiHost}?apiKey=${apiKey}`, {
        method: 'post',
        body:    JSON.stringify(report),
        headers: { 'Content-Type': 'application/json' },
    })
}

(async () => {

    console.log("Generating Report:")

    const REPORT = await generateReport();

    console.log("Submitting Report for " + REPORT.uuid.os)

    await submit(REPORT);

    console.log("Report submitted. Done.")

})().catch(error => {
    console.log(error);
    process.exit(1)
})
