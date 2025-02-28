import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2, Music, Volume1 } from "lucide-react";
import Image from "next/image";

interface Song {
  title: string;
  artist: string;
  duration: number; // in seconds
  cover: string;
  url: string;
}

export function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Danh sách nhạc mẫu
  const playlist: Song[] = [
    {
      title: "Endless Path",
      artist: "Vanguard Sound Studio",
      duration: 349,
      cover: "https://i.ytimg.com/vi/ECNVDsBv3uc/default.jpg",
      url: "/audio/Endless_Path.mp3" // Trong dự án thực, bạn sẽ thay thế bằng URL thực
    },
    {
      title: "Sweden",
      artist: "C418",
      duration: 210,
      cover: "/images/2.jpg",
      url: "#"
    },
    {
      title: "Wait",
      artist: "C418",
      duration: 190,
      cover: "/images/3.jpg",
      url: "#"
    }
  ];
  
  const currentSong = playlist[currentSongIndex];
  
  useEffect(() => {
    // Thiết lập audio
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Thêm các event listeners
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleSongEnd);
    }
    
    // Hiển thị player button sau một khoảng thời gian ngắn
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    // Xử lý clean up khi component unmount
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }
    };
  }, []);
  
  // Cập nhật khi thay đổi bài hát
  useEffect(() => {
    if (audioRef.current) {
      // Trong dự án thực, bạn sẽ sử dụng URL thực của bài hát
      audioRef.current.src = currentSong.url;
      
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Could not play audio:", e));
      }
    }
  }, [currentSongIndex]);
  
  // Cập nhật khi thay đổi trạng thái phát
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Could not play audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  // Cập nhật khi thay đổi volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleSongEnd = () => {
    nextSong();
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (newVolume === 0) {
      setIsMuted(true);
    }
  };
  
  const prevSong = () => {
    setCurrentSongIndex(prev => 
      prev === 0 ? playlist.length - 1 : prev - 1
    );
    setCurrentTime(0);
  };
  
  const nextSong = () => {
    setCurrentSongIndex(prev => 
      prev === playlist.length - 1 ? 0 : prev + 1
    );
    setCurrentTime(0);
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!progressBarRef.current || !audioRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    
    const percentage = Math.min(Math.max(0, offsetX / width), 1);
    const newTime = percentage * currentSong.duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={18} />;
    if (volume < 50) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      {/* Nút mở/thu nhỏ player khi chưa mở rộng */}
      <div className={`transition-all duration-500 ${
        isExpanded 
          ? 'w-80 md:w-96 h-auto scale-100 opacity-100 shadow-xl' 
          : 'w-14 h-14 scale-100 opacity-100 hover:scale-110'
      }`}>
        {!isExpanded && (
          <button 
            onClick={toggleExpanded}
            className="glass-card w-14 h-14 rounded-full flex items-center justify-center text-primary hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-500 animate-bounce-light"
            aria-label="Open music player"
          >
            <Music className="h-5 w-5" />
          </button>
        )}
        
        {/* Music player khi đã mở rộng */}
        {isExpanded && (
          <div className="glass-card rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Minecraft Music</span>
              </div>
              <button 
                onClick={toggleExpanded}
                className="hover:bg-black/10 rounded-full p-1 transition-colors duration-200"
                aria-label="Minimize player"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>
            
            {/* Album art and song info */}
            <div className="p-4 flex gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 animate-in fade-in-50 duration-700 delay-100">
                <Image 
                  src={currentSong.cover} 
                  alt={currentSong.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  width={"256"}
                  height={"256"}
                  loading="lazy"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center overflow-hidden animate-in fade-in-50 duration-700 delay-200">
                <div className="font-medium truncate">{currentSong.title}</div>
                <div className="text-sm text-muted-foreground truncate">{currentSong.artist}</div>
                
                {/* Progress bar */}
                <div className="mt-2">
                  <div 
                    ref={progressBarRef}
                    className="w-full h-1 bg-secondary rounded-full overflow-hidden cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(currentSong.duration)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="px-4 pb-4 flex items-center justify-between gap-2 animate-in fade-in-50 duration-700 delay-300">
              <div className="flex items-center gap-1">
                <button 
                  onClick={toggleMute}
                  className="p-1 rounded-full hover:bg-secondary transition-colors duration-200"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  <VolumeIcon />
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 accent-primary bg-secondary rounded-full"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevSong}
                  className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                  aria-label="Previous song"
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors duration-200 hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? 
                    <Pause className="h-5 w-5" /> : 
                    <Play className="h-5 w-5 ml-0.5" />
                  }
                </button>
                <button 
                  onClick={nextSong}
                  className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                  aria-label="Next song"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>
              
              <div className="w-[72px]"></div> {/* Spacer để căn giữa */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}