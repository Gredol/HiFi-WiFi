import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.LinkedList;
import java.util.Queue;

public class Main {
	static File file = new File("D:\\Users\\Ziga\\queue.txt");
	static int port = 3333;
	static Queue<String> queue = new LinkedList<>();
	
	public static void main(String[] args) throws UnknownHostException {
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
}
