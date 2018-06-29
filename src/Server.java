import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.Collection;
import java.util.concurrent.BrokenBarrierException;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class Server extends WebSocketServer {

	public Server(int port) throws UnknownHostException {
		super(new InetSocketAddress(port));
	}

	@Override
	public void onClose(WebSocket arg0, int arg1, String arg2, boolean arg3) {

	}

	@Override
	public void onError(WebSocket arg0, Exception arg1) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onMessage(WebSocket arg0, String arg1) {
		// TODO Auto-generated method stub
		System.out.println("Received message: " + arg1);
		System.out.println("Broadcasting to all connected clients...");
		for (WebSocket client : this.connections()) {
			if (client != arg0) {
				client.send(arg1);
				System.out.println("Sent update to cleint " + client.toString());
			}
		}

	}

	@Override
	public void onOpen(WebSocket arg0, ClientHandshake arg1) {
		// TODO Auto-generated method stub
		System.out.println("Client connected " + arg1);

	}

}
