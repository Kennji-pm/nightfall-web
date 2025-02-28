export const musicTracks = [
    { 
      id: "1", 
      title: "Acoustic Meditation", 
      artist: "Ambient Sounds",
      src: "https://cdn.pixabay.com/audio/2022/08/23/audio_5e6a9bc929.mp3" 
    },
    { 
      id: "2", 
      title: "Electronic Dreams", 
      artist: "Synthetic Wave",
      src: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" 
    },
    { 
      id: "3", 
      title: "Jazz Coffee", 
      artist: "Smooth Quartet",
      src: "https://cdn.pixabay.com/audio/2022/10/14/audio_946bc4fbd3.mp3" 
    },
    { 
      id: "4", 
      title: "Piano Reflections", 
      artist: "Classic Keys",
      src: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0c6ff1ebd.mp3" 
    },
    { 
      id: "5", 
      title: "Summer Vibes", 
      artist: "Beach Sounds",
      src: "https://cdn.pixabay.com/audio/2022/03/15/audio_73351c1de9.mp3" 
    },
    { 
      id: "6", 
      title: "Forest Ambience", 
      artist: "Nature Recordings",
      src: "https://cdn.pixabay.com/audio/2022/05/16/audio_7502d6340f.mp3" 
    },
    { 
      id: "7", 
      title: "Lofi Study", 
      artist: "Chill Beats",
      src: "https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3" 
    },
    { 
      id: "8", 
      title: "Dreamy Pop", 
      artist: "Indie Band",
      src: "https://cdn.pixabay.com/audio/2022/10/25/audio_dbc09b969c.mp3" 
    },
    { 
      id: "9", 
      title: "Cinematic Moment", 
      artist: "Orchestra Sound",
      src: "https://cdn.pixabay.com/audio/2022/03/10/audio_c8b8e91375.mp3" 
    },
    { 
      id: "10", 
      title: "Gentle Guitar", 
      artist: "Acoustic Strings",
      src: "https://cdn.pixabay.com/audio/2021/11/25/audio_be5f54e586.mp3" 
    },
  ];

export const getRandomMusicTrack = () => {
    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    return musicTracks[randomIndex];
};