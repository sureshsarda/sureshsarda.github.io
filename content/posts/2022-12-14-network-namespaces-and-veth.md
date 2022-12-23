---
date: "2022-12-14"
tags:
  - containers
  - linux kernel
title: Network Namespaces and Veth pairs
type: Essay
pinned: true
---

Containers are a thing now and microservices the new buzz word. But how do containers work? How are containers magically
separated from each other?

VMs require an entire operating system running and therefore consumes memory and CPU. In fact, if I remember correctly,
running a Ubuntu VM requires atleast 500-600mb of memory and at least one CPU core. But containers run in fraction of
resources and provide almost similar features for an application developer. How?

In this post, I'll talk about creating a new namespace and connecting it from the host machine.

Let us begin by creating a new namepsace:

```bash
> ip netns add blue
```

After this, we need to connect this namespace to the host machine. For that we
will use a veth pair. A veth pair is like an ethernet cable with two ends. Whatever
you send from the one end comes out from the other end.

```bash
# create a link calld veth0 of type veth and name the peer (or other end) as veth1
> ip link add veth0 type veth peer name veth1

# verify if it has been created correctly
> ip link show type veth
9: veth1@veth0: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 4a:b7:5f:be:4d:bb brd ff:ff:ff:ff:ff:ff
10: veth0@veth1: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 36:ad:98:c3:06:b7 brd ff:ff:ff:ff:ff:ff
```

The above snippet creates a veth pair with two veth ends - veth0 and veth1.
These are currently assigned to the host VM. Next we need to connect one of the
ends to the new namespaces. We will do this next:

```bash
# connect one end in the blue namespace
> ip link set veth1 netns blue

# since the other end is connect to the namespace it is hidden here
> ip link show type veth
10: veth0@if9: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 36:ad:98:c3:06:b7 brd ff:ff:ff:ff:ff:ff link-netns blue

# but can be seen in the blue namespace
> ip netns exec blue ip link show
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
9: veth1@if10: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 4a:b7:5f:be:4d:bb brd ff:ff:ff:ff:ff:ff link-netnsid 0
```

Let's assign IP addresses and start the devices so that we can send data

```bash
# ip address to the host end
> ip addr add 10.0.0.10/24 dev veth0

# ip address to the blue end
> ip netns exec blue ip addr add 10.0.0.1/24 dev veth1

# enable the devices
> ip link set veth0 up
> ip netns exec blue ip link set veth1 up
> ip netns exec blue ip link set lo up
```

(Note, if we want to execute a command inside a name space we use `ip netns exec <namespace> <command>`)

Let's see if these devices are connected:

```bash
> ping -c1 10.0.0.1
PING 10.0.0.1 (10.0.0.1) 56(84) bytes of data.

--- 10.0.0.1 ping statistics ---
1 packets transmitted, 0 received, 100% packet loss, time 0ms

> ip netns exec blue ping -c1 10.0.0.10
PING 10.0.0.10 (10.0.0.10) 56(84) bytes of data.

--- 10.0.0.10 ping statistics ---
1 packets transmitted, 0 received, 100% packet loss, time 0ms
```

Looks like No. Because although one end is connected to our host VM, it still
doesn't know which traffic should be routed or which network exists on the other
end of the veth. So the host does't send any traffic. The network is unavailable
in other words. Similarly for the endpoint in the blue namespace.

Let's correct this by adding a routes

```bash
# tell blue namespace that any traffic to 10.0.0.10 should go via device veth1
> ip netns exec blue ip route add 10.0.0.10 dev veth1

# tell the host that any traffic to 10.0.0.1 should go via veth0
> ip route add 10.0.0.1 dev veth0
```

After this, the pings are successful:

```bash
> ping -c1 10.0.0.1
PING 10.0.0.1 (10.0.0.1) 56(84) bytes of data.
64 bytes from 10.0.0.1: icmp_seq=1 ttl=64 time=0.021 ms

--- 10.0.0.1 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 0.021/0.021/0.021/0.000 ms

> ip netns exec blue ping -c1 10.0.0.10
PING 10.0.0.10 (10.0.0.10) 56(84) bytes of data.
64 bytes from 10.0.0.10: icmp_seq=1 ttl=64 time=0.021 ms

--- 10.0.0.10 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 0.021/0.021/0.021/0.000 ms
```

This is a very simple example of how networking is taken care of when containers
are deployed. An easy enhancement can be done using bridges. Veths are connected to a bridge and routing is taken care by the bridge. But the concepts of namespaces
remain the same.
