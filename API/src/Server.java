import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.Queue;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Server extends WebSocketServer {
	
	public Server(int port) throws UnknownHostException {
		super(new InetSocketAddress(port));
	}

	@Override
	public void onClose(WebSocket arg0, int arg1, String arg2, boolean arg3) {
		System.out.println("Client disconnected: " + arg0 + arg1 + arg2);
	}

	@Override
	public void onError(WebSocket arg0, Exception arg1) {
		arg0.send("error");
	}

	
//	EXAMPLE JSON PLAY COMMAND: { "command":"play", "p1":"https://www.youtube.com/watch?v=RmibkOh25uY" }
//	EXAMPLE JSON QUEUE COMMAND: { "command":"queue", "p1": [ "https://www.youtube.com/watch?v=RmibkOh25uY", "https://www.youtube.com/watch?v=RmibkOh25uY" ] }
	@Override
	public void onMessage(WebSocket arg0, String arg1) {
		System.out.println("Received message: " + arg1);
		
		JSONParser parser = new JSONParser();
		
		try {
			Object obj = parser.parse(arg1);
			JSONObject jsonObject = (JSONObject)obj;
			
			if (jsonObject.get("command").equals("play")) {
				System.out.println("call play command to VLC");
				if(Main.status == Status.paused) {
					VLC.resume();
				}
				sendEveryone(arg0, arg1);
			} else if (jsonObject.get("command").equals("pause")) {
				System.out.println("call pause command to VLC");
				if(Main.status == Status.playing) {
					VLC.pause();
				}
				sendEveryone(arg0, arg1);
			} else if (jsonObject.get("command").equals("add")) {
				if(Main.queue.isEmpty() && Main.status == Status.stopped) {
					VLC.play((String)jsonObject.get("p1"));
				}else {
					System.out.println("add song to playlist");
					Main.queue.add((String)jsonObject.get("p1"));
					Main.writeFile(Main.file, (String)jsonObject.get("p1"), true);
					sendEveryone(arg0, arg1);
				}
			} else if (jsonObject.get("command").equals("queue")) {
				JSONArray jsonQueue = (JSONArray)jsonObject.get("p1");
				Main.queue.clear();
				for (int i = 0; i < jsonQueue.size(); i++) {
					Main.queue.add(jsonQueue.get(i).toString());
					System.out.println(Main.queue);
				}
				Main.queue.forEach(item -> {
					if (item == Main.queue.peek()) {
						Main.writeFile(Main.file, item, false);
					} else {
						Main.writeFile(Main.file, item, true);
					}
				});
				sendEveryone(arg0, arg1);
			} else if (jsonObject.get("command").equals("next")) {
				Main.next(Main.queue);
			} else {
				arg0.send("Invalid command!");
			}
				
		} catch (ParseException e) {
			System.out.println("parse error");
			e.printStackTrace();
		}
	}

	@Override
	public void onOpen(WebSocket arg0, ClientHandshake arg1) {
		System.out.println("Client connected " + arg1);
	}
	
	

	public void sendEveryone(WebSocket sender, String command) {
		for (WebSocket client : this.connections()) {
			if (client != sender) {
				client.send(command);
				System.out.println("Sent update to client " + client.toString());
			}
		}
	}
	
	
	
}
