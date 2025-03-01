"use client"
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TranslationProvider } from "@/hooks/useTranslation";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ContactPopup } from "@/components/ContactPopup";

interface VoteSite {
  name: string;
  url: string;
  icon: string;
  reward: string;
}

const Vote = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Initialize background particles
    const createParticles = () => {
      const container = document.querySelector('.particles-container');
      if (!container) return;
      
      // Clear existing particles
      container.innerHTML = '';
      
      // Generate new particles
      for (let i = 0; i < 50; i++) { // Increased particle count
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size (small to medium)
        const size = Math.random() * 15 + 5;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random opacity
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 40 + 20;
        
        // Random delay
        const delay = Math.random() * 10;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity.toString();
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add to container
        container.appendChild(particle);
      }
    };
    
    createParticles();
    
    // Recreate particles on window resize for better distribution
    window.addEventListener('resize', createParticles);
    
    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);

  const voteSites: VoteSite[] = [
    {
      name: "MinecraftMP",
      url: "https://minecraft-mp.com/vote-example",
      icon: "https://source.unsplash.com/random/100x100/?minecraft,logo,1",
      reward: "5 Diamonds",
    },
    {
      name: "TopG",
      url: "https://topg.org/vote-example",
      icon: "https://source.unsplash.com/random/100x100/?minecraft,logo,2",
      reward: "10 Gold Ingots",
    },
    {
      name: "MinecraftServers",
      url: "https://minecraftservers.org/vote-example",
      icon: "https://source.unsplash.com/random/100x100/?minecraft,logo,3",
      reward: "1 Enchanted Book",
    },
    {
      name: "PlanetMinecraft",
      url: "https://planetminecraft.com/vote-example",
      icon: "https://source.unsplash.com/random/100x100/?minecraft,logo,4",
      reward: "20 Experience Levels",
    },
    {
      name: "ServerPact",
      url: "https://serverpact.com/vote-example",
      icon: "https://source.unsplash.com/random/100x100/?minecraft,logo,5",
      reward: "1 Random Rare Item",
    },
  ];

  const handleVote = (site: VoteSite) => {
    // Mở trang vote trong tab mới
    window.open(site.url, "_blank");
  };

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1
  //     }
  //   }
  // };

  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       type: "spring",
  //       stiffness: 100,
  //       damping: 10
  //     }
  //   }
  // };


  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <Navbar />

        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 opacity-80"></div>
        {/* Particles container with improved animation */}
        <div className="particles-container fixed inset-0 z-0"></div>
        {/* Floating background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-40 dark:opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
        </div>

        {/* Floating cubes with improved animation */}
        <div className="cube-decoration fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="cube cube-1 bg-primary/10 w-32 h-32 rounded-lg absolute top-[10%] left-[5%]"
            animate={{
              y: [0, 20, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="cube cube-2 bg-primary/5 w-40 h-40 rounded-lg absolute top-[40%] right-[10%] rotate-12"
            animate={{
              y: [0, -30, 0],
              rotate: [12, 17, 12],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="cube cube-3 bg-primary/5 w-24 h-24 rounded-lg absolute bottom-[15%] left-[15%] -rotate-12"
            animate={{
              y: [0, 15, 0],
              rotate: [-12, -20, -12],
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="cube cube-4 bg-primary/10 w-20 h-20 rounded-lg absolute bottom-[30%] right-[25%] rotate-45"
            animate={{
              y: [0, -20, 0],
              rotate: [45, 60, 45],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>


        <main className="pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Vote cho Nightfall Assault
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Ủng hộ máy chủ chúng tôi bằng cách vote hàng ngày và nhận phần
                  thưởng giá trị trong game!
                </p>
              </div>

              {/* Hướng dẫn vote */}
              <div className="glass-card p-6 mb-10 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                <h2 className="text-xl font-bold mb-4">Cách vote:</h2>
                <ol className="space-y-2 ml-5 list-decimal">
                  <li>Nhấp vào liên kết vote bên dưới để mở trang vote</li>
                  <li>Nhập tên người chơi Minecraft của bạn trên trang vote</li>
                  <li>Hoàn thành captcha (nếu có)</li>
                  <li>Xác nhận vote của bạn</li>
                  <li>Đăng nhập vào máy chủ để nhận phần thưởng tự động</li>
                </ol>
                <div className="mt-4 text-sm text-muted-foreground">
                  <strong>Lưu ý:</strong> Bạn có thể vote trên mỗi trang một lần
                  mỗi 24 giờ. Phần thưởng vote tích lũy nếu bạn vote trên nhiều
                  trang!
                </div>
              </div>

              {/* Danh sách trang vote */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {voteSites.map((site, index) => (
                  <div
                    key={site.name}
                    className={`glass-card p-4 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-5`}
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={site.icon}
                          alt={site.name}
                          className="w-full h-full object-cover"
                          width={256}
                          height={256}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{site.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Phần thưởng: {site.reward}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <button
                            onClick={() => handleVote(site)}
                            className="minecraft-btn py-1 px-3 text-sm flex items-center gap-1"
                          >
                              <>
                                <ExternalLink className="h-3 w-3" />
                                <span>Vote ngay</span>
                              </>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <ContactPopup />
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default Vote;
