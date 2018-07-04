import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;

public class Main {
	static File file = new File("D:\\Users\\Ziga\\queue.txt");
	static int port = 3333;
	static ArrayList<String> queue = new ArrayList<String>();
	
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
		
		readFileToArrayList(file, queue);
		System.out.println(queue);
	}
	
	public static void readFileToArrayList(File file, ArrayList<String> list) {
		try {
			BufferedReader reader = new BufferedReader(new FileReader(file));
			String line;
			while ((line = reader.readLine()) != null) {
				list.add(line);
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
