import { useState, useEffect } from "react";
import NextImage from "next/image";

interface LoadingProps {
  onFinished: () => void;
}

export function Loading({ onFinished }: LoadingProps) {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const tips = [
    "Nhớ vote hàng ngày để nhận phần thưởng giá trị!",
    "Tham gia Discord của chúng tôi để cập nhật các sự kiện mới nhất.",
    "Hãy giúp người chơi mới làm quen với máy chủ.",
    "Bạn đã khám phá hết 5 thế giới trên máy chủ chưa?",
    "Đề xuất tính năng mới trên diễn đàn của chúng tôi!",
    "Cẩn thận với Creepers vào ban đêm!",
    "Diamond thường được tìm thấy ở độ cao Y=12.",
    "Tham gia các sự kiện hàng tuần để nhận vật phẩm độc quyền.",
  ];

  useEffect(() => {
    // Kiểm tra tất cả các ảnh trên trang đã tải xong chưa
    const preloadImages = () => {
      // Danh sách URL ảnh cần tải trước (có thể thêm nhiều URL nếu cần)
      const imageUrls = [
        "/images/1.jpg",
        "/images/2.jpg",
        "/images/3.jpg",
        "/images/4.jpg",
        "/images/logo.png",
      ];
      
      let loadedCount = 0;
      const totalImages = imageUrls.length;
      
      // Tạo promise cho mỗi ảnh cần tải
      const imagePromises = imageUrls.map(url => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            loadedCount++;
            // Cập nhật tiến độ dựa trên số ảnh đã tải / tổng số ảnh
            setProgress(prev => {
              // Ảnh chiếm 70% tiến độ tải, 30% còn lại là cho hiệu ứng
              const imageProgress = (loadedCount / totalImages) * 70;
              return Math.max(prev, imageProgress);
            });
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            // Cập nhật tiến độ ngay cả khi lỗi
            setProgress(prev => {
              const imageProgress = (loadedCount / totalImages) * 70;
              return Math.max(prev, imageProgress);
            });
            resolve();
          };
        });
      });
      
      // Đợi tất cả ảnh tải xong
      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true);
      });
    };
    
    // Bắt đầu tải ảnh
    preloadImages();

    // Hiệu ứng chuyển đổi tip
    const tipInterval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 3000);
    
    // Hiển thị hiệu ứng tải sau khi ảnh đã tải xong
    let animationStartTime: number | null = null;
    const animationDuration = 1000; // 1 giây để hoàn thành phần còn lại
    
    const updateAnimation = (timestamp: number) => {
      if (!imagesLoaded) {
        requestAnimationFrame(updateAnimation);
        return;
      }
      
      if (animationStartTime === null) {
        animationStartTime = timestamp;
      }
      
      const elapsed = timestamp - animationStartTime;
      
      // Hoàn thành 30% tiến độ còn lại
      const nextProgress = 70 + Math.min(30, (elapsed / animationDuration) * 30);
      setProgress(nextProgress);
      
      if (nextProgress < 100) {
        requestAnimationFrame(updateAnimation);
      } else {
        // Đợi một chút sau khi đã hiển thị 100%
        setTimeout(() => {
          onFinished();
        }, 800);
      }
    };
    
    requestAnimationFrame(updateAnimation);
    
    return () => {
      clearInterval(tipInterval);
    };
  }, [onFinished, tips.length, imagesLoaded]);

  return (
    <div className="text-foreground fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-bounce-light">
          <div className="w-24 h-24 rounded-2xl grid place-items-center">
            <NextImage
                src={"/images/logo.png"}
                alt="Nightfall Assault Logo"
                width={256}
                height={256}
                className="w-full h-full object-cover rounded-2xl"
            ></NextImage>
          </div>
        </div>
        
        {/* Tiêu đề */}
        <h1 className="text-3xl text-center mb-8 font-bold truncate">Nightfall Assault</h1>
        
        {/* Thanh tiến độ */}
        <div className="h-2 w-full bg-secondary rounded-full mb-4 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Phần trăm tải */}
        <div className="flex justify-between text-sm mb-8">
          <span>
            {imagesLoaded ? "Loading..." : "Preparing..."}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        {/* Tip ngẫu nhiên */}
        <div className="h-16 glass-card p-4 flex items-center justify-center text-center">
          <p className="animate-fade-in" key={tipIndex}>{tips[tipIndex]}</p>
        </div>
        
        {/* Hiệu ứng block ngẫu nhiên */}
        <div className="absolute bottom-8 left-8 w-10 h-10 bg-minecraft-green opacity-30 rounded animate-float-slow"></div>
        <div className="absolute top-16 right-8 w-8 h-8 bg-primary opacity-20 rounded animate-float-slow" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-purple-500 opacity-10 rounded-lg animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
      </div>
    </div>
  );
}