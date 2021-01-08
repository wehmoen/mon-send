const fetch = require("node-fetch");
const apiKey = process.argv[2] || "";
const apiHost = process.argv[3] || "https://mon.wehmoen.dev/api/report";
const si = require('systeminformation');

(async () => {

    const system = await si.system();
    const bios = await si.bios();
    const baseboard = await si.baseboard();
    const cpu = await si.cpu();
    const cpuCurrentSpeed = await si.cpuCurrentspeed();
    const cpuTemperature = await si.cpuTemperature()
    const memory = await si.mem();
    const memoryLayout = await si.memLayout();
    const battery = await si.battery();
    const graphics = await si.graphics()
    const os = await si.osInfo();
    const uuid = await si.uuid();
    const versions = await si.versions();
    const users = await si.users();
    const currentLoad = await si.currentLoad();
    const processes = await si.processes();
    const services = await si.services("*")
    const diskLayout = await si.diskLayout();
    const blockDevices = await si.blockDevices();
    const fsSize = await si.fsSize();
    const networkInterfaces = await si.networkInterfaces();
    const networkInterfaceDefault = await si.networkInterfaceDefault();
    const networkGatewayDefault = await si.networkGatewayDefault();
    const networkStats = await si.networkStats();
    const networkConnections = await si.networkConnections();
    const inetChecksite = await si.inetChecksite("https://google.com")
    const inetLatency = await si.inetLatency();
    const wifiNetworks = await si.wifiNetworks();
    const dockerInfo = await si.dockerInfo();
    const dockerAll = await si.dockerAll()

    const COMPUTER_DATA = {
        system,
        bios,
        baseboard,
        cpu,
        cpuCurrentSpeed,
        cpuTemperature,
        currentLoad,
        memory,
        memoryLayout,
        battery,
        graphics,
        os,
        uuid,
        versions,
        users,
        processes,
        services,
        diskLayout,
        blockDevices,
        fsSize,
        networkInterfaces,
        networkInterfaceDefault,
        networkGatewayDefault,
        networkStats,
        networkConnections,
        inetChecksite,
        inetLatency,
        wifiNetworks,
        dockerInfo,
        dockerAll
    }

    await fetch(`${apiHost}?apiKey=${apiKey}`, {
        method: 'post',
        body:    JSON.stringify(COMPUTER_DATA),
        headers: { 'Content-Type': 'application/json' },
    })

})().catch(e => {
    console.log(e);
    process.exit(1)
})
