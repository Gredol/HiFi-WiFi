import java.net.UnknownHostException;

public class Main {
	public static void main(String[] args) throws UnknownHostException {
		int port = 3333;
		Server server = new Server(port);
		server.start();
		System.out.println("Web socket started on port " + port);
	
	}

}
