import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.LinkedList;
import java.util.Queue;

import javax.swing.SwingUtilities;

import uk.co.caprica.vlcj.discovery.NativeDiscovery;

public class Main {
	static File file = new File("queue.txt");
	static int port = 3333;
	static Queue<String> queue = new LinkedList<>();

	static Status status = Status.stopped;
	public static void main(String[] args) throws UnknownHostException, InterruptedException {
		/*Initialize VLC interface*/
		System.out.println("Init VLC");
        new NativeDiscovery().discover();
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new VLC(args);
            }
        });
        Thread.sleep(1000);//hacky code
		Server server = new Server(port);
		server.start();
		System.out.println("Web socket started on port " + port);

		try {
			if (file.createNewFile()) {
				System.out.println("File created!");
			} else {
				System.out.println("File already exists");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		readFileToQueue(file, queue);
		if(!queue.isEmpty() && status == Status.stopped) {
			VLC.play(queue.remove());
		}
		
		System.out.println(queue);
	}
	
	public static void readFileToQueue(File file, Queue<String> queue) {
		try {
			BufferedReader reader = new BufferedReader(new FileReader(file));
			String line;
			while ((line = reader.readLine()) != null) {
				queue.add(line);
			}
			reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
	
	public static void writeFile(File file, String line, boolean append) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(file, append));
			writer.write(line);
			writer.newLine();
			System.out.println("File written succesfully");
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void changeState (Status newState) {
		status = newState;
		if(status == Status.stopped && !queue.isEmpty()) {
			next(queue);
		}
	}
	public static void next(Queue<String> queue) {
		if (Main.queue.size() > 1) {
			String song = queue.remove();
			Main.queue.forEach(item -> {
				if (item == queue.peek()) {
					writeFile(file, item, false);
				} else {
					writeFile(file, item, true);
				}
			});
			System.out.println("queue: " + queue);
			System.out.println("call VLC's play song method with: " + song);
			VLC.play(song);
		} else if(!Main.queue.isEmpty()){
			String song = queue.remove();
			Main.writeFile(file, "", false);
			System.out.println("queue: " + queue);
			System.out.println("call VLC's play song method with: " + song);
			VLC.stop();
			VLC.play(song);
		} else {
			System.out.println("queue empty");
			System.out.println(Main.queue);			
		}
	}
}
