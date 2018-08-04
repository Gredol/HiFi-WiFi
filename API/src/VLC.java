import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

import uk.co.caprica.vlcj.binding.internal.libvlc_media_t;
import uk.co.caprica.vlcj.component.EmbeddedMediaPlayerComponent;
import uk.co.caprica.vlcj.player.MediaPlayer;
import uk.co.caprica.vlcj.player.MediaPlayerEventListener;

public class VLC {

    private final JFrame frame;

    public static EmbeddedMediaPlayerComponent mediaPlayerComponent;

    private final JButton pauseButton;

    private final JButton playButton;

    private final JButton stopButton;

    public VLC(String[] args) {
        frame = new JFrame("My First Media Player");
        frame.setBounds(100, 100, 600, 400);
        frame.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                mediaPlayerComponent.release();
                System.exit(0);
            }
        });

        JPanel contentPane = new JPanel();
        contentPane.setLayout(new BorderLayout());

        mediaPlayerComponent = new EmbeddedMediaPlayerComponent();
        contentPane.add(mediaPlayerComponent, BorderLayout.CENTER);

        JPanel controlsPane = new JPanel();
        pauseButton = new JButton("Pause");
        controlsPane.add(pauseButton);
        playButton = new JButton("Play");
        controlsPane.add(playButton);
        stopButton = new JButton("Stop");
        controlsPane.add(stopButton);
        contentPane.add(controlsPane, BorderLayout.SOUTH);

        pauseButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                mediaPlayerComponent.getMediaPlayer().pause();
            }
        });

        playButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                mediaPlayerComponent.getMediaPlayer().play();
            }
        });

        stopButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                mediaPlayerComponent.getMediaPlayer().stop();
            }
        });

        frame.setContentPane(contentPane);
        frame.setVisible(true);

      
        
        mediaPlayerComponent.getMediaPlayer().setPlaySubItems(true);
        //mediaPlayerComponent.getMediaPlayer().playMedia("https://www.youtube.com/watch?v=MwpMEbgC7DA");
   
     
    }
    public static void stop() {
    	mediaPlayerComponent.getMediaPlayer().stop();
    	Main.changeState(Status.stopped);
    }
    public static void pause() {
    	mediaPlayerComponent.getMediaPlayer().pause();
    	Main.changeState(Status.paused);
    }
    public static void resume() {
    	mediaPlayerComponent.getMediaPlayer().play();
    	Main.changeState(Status.playing);
    }
    
    public static boolean play(String url) {
    	Main.changeState(Status.playing);
    	mediaPlayerComponent.getMediaPlayer().setPlaySubItems(true);
    	mediaPlayerComponent.getMediaPlayer().playMedia(url);
    	mediaPlayerComponent.getMediaPlayer().addMediaPlayerEventListener(new MediaPlayerEventListener() {
			
			@Override
			public void volumeChanged(MediaPlayer arg0, float arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void videoOutput(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void titleChanged(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void timeChanged(MediaPlayer arg0, long arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void subItemPlayed(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void subItemFinished(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void stopped(MediaPlayer arg0) {
				// TODO Auto-generated method stub
				Main.changeState(Status.stopped);
			}
			
			@Override
			public void snapshotTaken(MediaPlayer arg0, String arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void seekableChanged(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void scrambledChanged(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void positionChanged(MediaPlayer arg0, float arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void playing(MediaPlayer arg0) {
				// TODO Auto-generated method stub
				Main.changeState(Status.playing);
			}
			
			@Override
			public void paused(MediaPlayer arg0) {
				System.out.println("Video pausiran");
				Main.changeState(Status.paused);
			}
			
			@Override
			public void pausableChanged(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void opening(MediaPlayer arg0) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void newMedia(MediaPlayer arg0) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void muted(MediaPlayer arg0, boolean arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void mediaSubItemTreeAdded(MediaPlayer arg0, libvlc_media_t arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void mediaSubItemAdded(MediaPlayer arg0, libvlc_media_t arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void mediaStateChanged(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void mediaParsedChanged(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void mediaMetaChanged(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void mediaFreed(MediaPlayer arg0) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void mediaDurationChanged(MediaPlayer arg0, long arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void mediaChanged(MediaPlayer arg0, libvlc_media_t arg1, String arg2) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void lengthChanged(MediaPlayer arg0, long arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void forward(MediaPlayer arg0) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void finished(MediaPlayer arg0) {
				System.out.println("Dej nasednji link");
				Main.changeState(Status.stopped);
			}
			
			@Override
			public void error(MediaPlayer arg0) {
				// TODO Auto-generated method stub
				System.out.println("Error");
			}
			
			@Override
			public void endOfSubItems(MediaPlayer arg0) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void elementaryStreamSelected(MediaPlayer arg0, int arg1, int arg2) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void elementaryStreamDeleted(MediaPlayer arg0, int arg1, int arg2) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void elementaryStreamAdded(MediaPlayer arg0, int arg1, int arg2) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void corked(MediaPlayer arg0, boolean arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void chapterChanged(MediaPlayer arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void buffering(MediaPlayer arg0, float arg1) {
				// TODO Auto-generated method stub
				System.out.println("Buffering at: " + arg1 + "%");
			}
			
			@Override
			public void backward(MediaPlayer arg0) {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void audioDeviceChanged(MediaPlayer arg0, String arg1) {
				// TODO Auto-generated method stub
				
			}
		});
    	return true;
    }
}