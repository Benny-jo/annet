import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface AudioBook {
  id: string;
  title: string;
  author: string;
  audioUrl: string;
  coverImage: string;
  duration: string;
}

export const AudioBooks = () => {
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const books: AudioBook[] = [
    {
      id: '1',
      title: 'रामायण',
      author: 'वाल्मीकि',
      audioUrl: '/audio/ramayana.mp3',
      coverImage: '/covers/ramayana.jpg',
      duration: '45:30'
    },
    {
      id: '2',
      title: 'महाभारत',
      author: 'वेद व्यास',
      audioUrl: '/audio/mahabharat.mp3',
      coverImage: '/covers/mahabharat.jpg',
      duration: '52:15'
    },
    {
      id: '3',
      title: 'पंचतंत्र की कहानियां',
      author: 'विष्णु शर्मा',
      audioUrl: '/audio/panchatantra.mp3',
      coverImage: '/covers/panchatantra.jpg',
      duration: '38:45'
    }
  ];

  useEffect(() => {
    audioRef.current = new Audio();
    
    const handleEnded = () => setPlaying(null);
    const handleError = () => {
      toast({
        title: "Audio Error",
        description: "There was an error playing this audiobook. Please try again.",
        variant: "destructive"
      });
      setPlaying(null);
    };

    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('error', handleError);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('error', handleError);
      }
    };
  }, []);

  const togglePlay = async (book: AudioBook) => {
    if (!audioRef.current) return;

    try {
      if (playing === book.id) {
        audioRef.current.pause();
        setPlaying(null);
      } else {
        if (playing) {
          audioRef.current.pause();
        }
        audioRef.current.src = book.audioUrl;
        await audioRef.current.play();
        setPlaying(book.id);
      }
    } catch (error) {
      console.error('Playback error:', error);
      toast({
        title: "Playback Error",
        description: "Unable to play this audiobook. Please try again.",
        variant: "destructive"
      });
      setPlaying(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Hindi Audiobooks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <Card key={book.id} className="p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <img 
                src={book.coverImage} 
                alt={book.title}
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="text-xs text-muted-foreground mt-1">Duration: {book.duration}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => togglePlay(book)}
                className={`h-12 w-12 rounded-full transition-all duration-300 ${playing === book.id ? 'bg-primary text-primary-foreground' : ''}`}
              >
                {playing === book.id ? 
                  <Pause className="h-6 w-6 animate-pulse" /> : 
                  <Play className="h-6 w-6" />
                }
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AudioBooks;