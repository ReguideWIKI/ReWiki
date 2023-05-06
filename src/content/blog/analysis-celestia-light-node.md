---
title: Understanding about Data availability & Analysis A Celestia Light Node
author: Reguide Author
pubDatetime: 2023-04-01T14:14:12.000+00:00
postSlug: analysis-celestia-light-node
featured: true
draft: false
tags: ["celestia", "reviews", "airdrop"]
ogImage: "https://raw.githubusercontent.com/ReguideWIKI/ReWiki/master/public/uploads/celestia/lightnode-l.png"
description:
  "Light clients conduct data availability sampling on the Data Availability network."
---

## Types of Data availability: 

- Bridge Node: This node bridges blocks between the Data 3hhhhhh Availability network and the Consensus network include: Validator Node & Consensus Full Node: A Celestia-App Full Node to sync blockchain history.

- Full Storage Node: This node stores all the data but does not connect to Consensus.
- Light Node: Light clients conduct data availability sampling on the Data Availability network.

## Understand Light Node before running a node

![Light Node processing](https://raw.githubusercontent.com/ReguideWIKI/ReWiki/master/public/uploads/celestia/lightnode-l.png)

The most common way to interact with the Celestia network is ensure data availability

- Light Nodes listen for ExtendedHeaders, wrapped “raw” headers, that notify Celestia nodes of new block headers and relevant DA metadata.
- Light Nodes perform data availability sampling (DAS) on the received headers
- Light Nodes receive block shares, headers, and fraud proofs from Full Storage.

## Hardware requirements

> 4 vCPU Cores.
> 8 GB RAM.
> 50 GB NVMe.

This hardware recommend running lightnode smooth with uptime >92 - 99% that I am running at this time

## Task the Blockspace Race for lightnode

When we see opened tasks on dashboard, It very clear checklist for all user already selected.
It is a job challenge for newbies or someone with experience, this job is completely simple

Each phase of the Blockspace Race has tasks related to each participant’s role, with participants scored based on the completion of tasks and performance. The testnet boasts new features, including IBC transfers, more efficient syncing, and an improved API for interacting with Celestia DA nodes.

For lightnode which phase im sharing very simple:

- Maintain High Node Uptime.
- Restart Your Node With Metrics Flags for Tracking Uptime.	
- Deploy Light Node.

But bonus task is the Good contribute to project, may be other people can try this one to understand celetia project.

- Create a UI for Submitting PayForBlob Transactions.
- Deploy a Sovereign Rollup.
- Create Toolings for the Celestia Network.
- Conduct Performance Analysis of Your Node.

## These normal task doing on lightnode
### Part 1. Deploy Light Node

Good option, Im running underground base on machine with service. 
1. Setup the dependencies
2. Install Golang
3. Install celestia-node
4. Start Light Node

All of these step: We can see old blog guide [Here](https://reguide.wiki/posts/lightnode-iicentives-celestia)
Or see original blog guide of celestia lightnode:
[https://docs.celestia.org/nodes/light-node/](https://docs.celestia.org/nodes/light-node/)

5. Get ID and Wallet address and submit for celestia task
After running the light-node, we can find the id with this cmd:

```
AUTH_TOKEN=$(celestia light auth admin --p2p.network blockspacerace)

curl -X POST \
     -H "Authorization: Bearer $AUTH_TOKEN" \
     -H 'Content-Type: application/json' \
     -d '{"jsonrpc":"2.0","id":0,"method":"p2p.Info","params":[]}' \
     http://localhost:26658
```

And result so clear: IT WILL BE RETURN RESULT ADDRESS ID when we run the node successed

### Part 2. Make Metrics Flags for Tracking Uptime

I'm recommend who read this blog, just run services and leave it running underground

```
#Create Services 

sudo tee <<EOF >/dev/null /etc/systemd/system/celestia-lightd.service
[Unit]
Description=celestia-lightd Light Node
After=network-online.target

[Service]
User=$USER
ExecStart=/usr/local/bin/celestia light start --core.ip https://rpc-blockspacerace.pops.one --core.rpc.port 26657 --core.grpc.port 9090 --keyring.accname my_celes_key --metrics.tls=false --metrics --metrics.endpoint otel.celestia.tools:4318 --gateway --gateway.addr localhost --gateway.port 26659 --p2p.network blockspacerace
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF

#End create service
```

If RPC not working or bad uptime, just try replace RPC at: [https://docs.celestia.org/nodes/blockspace-race/#rpc-endpoints](https://docs.celestia.org/nodes/blockspace-race/#rpc-endpoints)

Final: Enable and start celestia-lightd daemon:

```
sudo systemctl enable celestia-lightd
sudo systemctl start celestia-lightd

#Check daemon logs in real time:
sudo journalctl -u celestia-lightd.service -f
```

### Part 3. Maintain High Node Uptime.

![Light Node uptime](https://raw.githubusercontent.com/ReguideWIKI/ReWiki/master/public/uploads/celestia/uptime-lightnode-l.jpg)

The last normal task. Follow your machine uptime above 85%. (Stay machine uptime sync all block help celestia working good).

Check it out ID lightnode: [https://tiascan.com/light-node/12D3KooWSpqdd5Y1kjpaqp6wstsyiDhb52dLFNjdVv4LGDyFBEgq](https://tiascan.com/light-node/12D3KooWSpqdd5Y1kjpaqp6wstsyiDhb52dLFNjdVv4LGDyFBEgq)

<strong>I'm request change new ID machine LIGHTNODE (UPTIME 99.9%: [https://tiascan.com/light-node/12D3KooWQvYU7hpn1U7SnsAKzA8SM8mxu7aFakB8REP8Yuy8R3HR](https://tiascan.com/light-node/12D3KooWQvYU7hpn1U7SnsAKzA8SM8mxu7aFakB8REP8Yuy8R3HR)</strong>

<strong>Other bonus task review will be update soon when I have done ...</strong>
