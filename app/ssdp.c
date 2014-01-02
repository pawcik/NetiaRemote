#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>

int main(void)
{
	int s;

	if ((s = socket(AF_INET, SOCK_DGRAM, 0)) > 0) {
		char buf[] = "M-SEARCH * HTTP/1.1\r\n"\
		"HOST: 239.255.255.250:1900\r\n"\
		"ST: urn:netgem:RemoteControlServer:1\r\n"\
		"MAN: \"ssdp:discover\"\r\n"\
		"MX: 3\r\n";

		struct sockaddr_in srv;
		bzero(&srv, sizeof(srv));
		srv.sin_family = AF_INET;
		srv.sin_port = htons(1900);
    srv.sin_addr.s_addr = htonl((((((239 << 8) | 255) << 8) | 255) << 8) | 250);
    /*srv.sin_addr.s_addr = htonl((((((192 << 8) | 168) << 8) | 1) << 8) | 2);*/

		if (sendto(s, buf, sizeof(buf), 0, (struct sockaddr *) &srv, sizeof(srv)) > 0) {
			char res[1024];
			struct sockaddr_in from;
			socklen_t fromlen = sizeof(struct sockaddr_in);

			if ((recvfrom(s, res, sizeof(res), 0, (struct sockaddr *) &from, &fromlen)) > 0) {
				printf("%s\n", res);
			}
		}
		shutdown(s, 2);
	}
	
	return 0;
}
