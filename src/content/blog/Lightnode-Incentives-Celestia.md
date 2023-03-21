---
title: Hướng Dẫn Chạy Light nodes & Submit Task Trên Celestia
author: Sat Naing
pubDatetime: 2023-03-15T16:55:12.000+00:00
postSlug: lightnode-Iicentives-celestia
featured: true
draft: false
tags: ["lightnode", "celestia", "incentives", "airdrop", "node"]
ogImage: ""
description:
  "Guide này sẽ hướng dẫn bạn cách thiết lập Light nodes Celestia nhận reward từ phần thưởng khuyến khích của celestia"
---

## Overview of light nodes (Tổng quan light nodes)

Light nodes ExtendedHeaders, thông báo cho các nút Celestia về khối mới và siêu dữ liệu DA có liên quan.
Họ thực hiện lấy mẫu tính khả dụng của dữ liệu (DAS) trên các tiêu đề nhận được

## Hardware requirements

- <strong>Bộ nhớ</strong>: RAM 2GB
- <strong>CPU</strong>: 1 core
- <strong>Disc</strong>: Bộ nhớ tối thiểu SSD 5GB
- <strong>Băng thông (Bandwidth)</strong>: 56 Kbps download/56 Kbps upload

### 1. Setup the dependencies

```
sudo apt update && sudo apt upgrade -y 
```
```
sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential git make ncdu -y
```

Check machine ARM or AMD

### 2. Install Golang

2.1 Check your machine ARM or AMD
```
dpkg --print-architecture
```

2.2 Install
```
//for Ubuntu (AMD)
ver="1.19.1" 
cd $HOME 
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" 
sudo rm -rf /usr/local/go 
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" 
rm "go$ver.linux-amd64.tar.gz" 
```

```
//for Ubuntu (ARM)
ver="1.19.1" 
cd $HOME 
wget "https://golang.org/dl/go$ver.linux-arm64.tar.gz" 
sudo rm -rf /usr/local/go 
sudo tar -C /usr/local -xzf "go$ver.linux-arm64.tar.gz" 
rm "go$ver.linux-arm64.tar.gz" 
```

2.3 Add the /usr/local/go/bin directory to $PATH:

```
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
```

### 3. Install celestia-node
3.1. Install Celestia Node
Installing <code>celestia-node</code> for the blockspacerace testnet means installing a specific version to be compatible with the network.

```
cd $HOME 
rm -rf celestia-node 
git clone https://github.com/celestiaorg/celestia-node.git 
cd celestia-node/ 
git checkout tags/v0.7.0 
make build 
make install 
make cel-key 
```

Check version Celestia Node
```
celestia version 
```

3.2. Initialize the light node
```
celestia light init --p2p.network blockspacerace

```
Output look like: 

```
$ celestia light init
2022-12-19T21:45:24.591Z        INFO    node    nodebuilder/init.go:19  Initializing Light Node Store over '/root/.celestia-light-blockspacerace'
2022-12-19T21:45:24.591Z        INFO    node    nodebuilder/init.go:50  Saving config   {"path": "/root/.celestia-light-blockspacerace/config.toml"}
2022-12-19T21:45:24.592Z        INFO    node    nodebuilder/init.go:51  Node Store initialized
```

3.3. Start the light node
Run the node with port <strong>9090</strong>. With your ip addresss: your VPS ip address:
```
celestia light start --p2p.network blockspacerace --core.ip --core.grpc.port --gateway --gateway.addr <ip-address> --gateway.port 9090
```

### 4. Setup & commandline WALLET Celestia-LightNode

4.1 Add new wallet
```
./cel-key add wallet --keyring-backend test --node.type light --p2p.network blockspacerace
```
4.2 Restore wallet
```
./cel-key add wallet --recover --keyring-backend test --node.type light --p2p.network blockspacerace
```
4.3 Check your wallet run light node
```
./cel-key list --node.type light --keyring-backend test --p2p.network blockspacerace

```

### 5. Start Light Node

5.1 Option 1 
```
celestia light start --core.ip <ip-address> --keyring.accname <key_name> --gateway --gateway.addr <ip-address> --gateway.port <port> --p2p.network blockspacerace
```
5.2 Option 2 (Recommended)
Run celestia on background
```
sudo tee <<EOF >/dev/null /etc/systemd/system/celestia-lightd.service
[Unit]
Description=celestia-lightd Light Node
After=network-online.target

[Service]
User=$USER
ExecStart=$HOME/go/bin/celestia light start --core.ip <ip-address>
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF
```

Start service light node
```
sudo systemctl enable celestia-lightd
sudo systemctl start celestia-lightd
```
Check log & Real time
```
sudo journalctl -u celestia-lightd.service -f
```

*Now, the Celestia Light Node will start syncing headers. After sync is finished, Light Node will do Data Availability Sampling (DAS) from the Bridge Node.*

*(Bây giờ, Celestia Light Node sẽ bắt đầu đồng bộ hóa các Header node. Sau khi đồng bộ hóa xong, Light Node sẽ thực hiện Lấy mẫu tính khả dụng của dữ liệu (DAS) từ Bridge Node.)*
