# Everything related to networking in Linux

https://www.journaldev.com/34113/opening-a-port-on-linux


### TCP/UDP

### About IPs, Ports and Sockets
Network sockets can either be connected or waiting for a connection. The connections use networking protocols like Transport Control Protocol (TCP) or User Datagram Protocol UDP. They use Internet Protocol addresses and network ports to establish connections.

The netstat command lets you discover which sockets are connected and which sockets are listening. Meaning, it tells you which ports are in use and which processes are using them. It can show you routing tables and statistics about your network interfaces and multicast connections.

*sockets*
A software construct used to handle one end of a network data connection. It has (basically) 2 states: `connected` and `listening`

### Inspecting

*COMMAND: netstat*
    - The Linux netstat command gives you a treasure-trove of information about your network connections, the ports that are in use, and the processes using them. 
    - (how to use)[https://www.howtogeek.com/513003/how-to-use-netstat-on-linux/]
    - listing all sockets `netstat -a | less`
    results:
    - The “Active Internet” section lists the connected external connections and local sockets listening for remote connection requests. That is, it lists the network connections that are (or will be) established to external devices.
    - show all listening TCP sockets: `netstat -tl | less`
    - see statistics `netstat -st|less`
    - showing process ID flag `netstat -tlp | less`
    - showing numeric address `netstat -tlpn | less`
    - routing table: `netstat -r`
    - showing the network interfaces `netstat -i`

*COMMAND: ss*
    - investigates sockets
    - show all listening sockets of type TCP and their processes and memory `ss -lmtp`
    - show all established TCP connections `ss -tp`

*COMMAND: host*
    - checks the ip address from a hostname or get hostname from ip address
    - get ip address of hostname `host "noodles.dev`

*COMMAND: lsof*
    - shows all opened files
    - all internet and network files `lsof -i`
    - `lsof -p {PID}`
    - which program is using a port `lsof -i :80`; port range `lsonf -i :1-1024`
    - 

*Network Status*
    `ss -lmtp`
    `netstat -s|less`
    `netstat -rn`
*Opened Ports*
    `netstat -aln|less`
    `nmap {ip}`
*Who is using which opened port*
    `netstat -alpn|grep ":xx"`

### Port Management

*Close*
    - just use `ufw` but sometimes it's bad
    - seems to have a problem with docker
*Open*
    - can listen for a TCP/IP connection using netcat `netcat -l {port}`
*Redirect*

### Something wrong

This [ifconfig guide](https://www.computerhope.com/unix/uifconfi.htm)

- `ifconfig` to see all network adapters
- restart each one to see if it fixes the issue