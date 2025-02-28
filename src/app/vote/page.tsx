"use client"
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TranslationProvider } from "@/hooks/useTranslation";
import { ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

interface VoteSite {
  name: string;
  url: string;
  icon: string;
  reward: string;
}

const Vote = () => {
  const [voted, setVoted] = useState<Record<string, boolean>>({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    // Lấy trạng thái đã vote từ localStorage (trong ứng dụng thực tế, nên lấy từ server)
    const savedVotes = localStorage.getItem("playerVotes");
    if (savedVotes) {
      setVoted(JSON.parse(savedVotes));
    }

    // Hiệu ứng nền động
    const moveBackgroundItems = () => {
      const items = document.querySelectorAll(".floating-bg-item");
      items.forEach((item) => {
        const el = item as HTMLElement;

        // Di chuyển ngẫu nhiên theo hướng chuyển động hiện tại
        const currentTransform = el.style.transform || "translate(0px, 0px)";
        const match = currentTransform.match(
          /translate\((-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px\)/
        );

        let x = 0;
        let y = 0;

        if (match) {
          x = parseFloat(match[1]);
          y = parseFloat(match[2]);
        }

        // Thêm một chút ngẫu nhiên vào chuyển động
        const speed = parseFloat(el.dataset.speed || "1");
        const deltaX = (Math.random() - 0.5) * speed;
        const deltaY = (Math.random() - 0.5) * speed;

        // Kiểm tra ranh giới màn hình và đổi hướng nếu cần
        const rect = el.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Đảm bảo khối không đi quá xa khỏi màn hình
        if (rect.right + deltaX > windowWidth + 100) x -= Math.abs(deltaX) * 2;
        if (rect.left + deltaX < -100) x += Math.abs(deltaX) * 2;
        if (rect.bottom + deltaY > windowHeight + 100)
          y -= Math.abs(deltaY) * 2;
        if (rect.top + deltaY < -100) y += Math.abs(deltaY) * 2;

        x += deltaX;
        y += deltaY;

        el.style.transform = `translate(${x}px, ${y}px)`;
      });

      requestAnimationFrame(moveBackgroundItems);
    };

    requestAnimationFrame(moveBackgroundItems);
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

    // Giả lập xác nhận vote thành công (trong thực tế, server sẽ xác nhận)
    setTimeout(() => {
      const newVoted = { ...voted, [site.name]: true };
      setVoted(newVoted);
      localStorage.setItem("playerVotes", JSON.stringify(newVoted));

      // Hiển thị thông báo thành công
      setNotificationMessage(
        `Cảm ơn bạn đã vote trên ${site.name}! Bạn đã nhận được ${site.reward}`
      );
      setNotificationType("success");
      setShowNotification(true);

      // Tự động ẩn thông báo sau 5 giây
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }, 2000);
  };

  const handleCheckStatus = (username: string) => {
    if (!username.trim()) {
      setNotificationMessage("Vui lòng nhập tên người chơi");
      setNotificationType("error");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return;
    }

    // Giả lập kiểm tra trạng thái vote
    setNotificationMessage(
      `Đang kiểm tra trạng thái vote cho người chơi ${username}...`
    );
    setNotificationType("success");
    setShowNotification(true);

    setTimeout(() => {
      setNotificationMessage(
        `Người chơi ${username} đã vote trên 3/5 trang trong 24 giờ qua.`
      );
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }, 2000);
  };

  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <Navbar />

        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 opacity-80"></div>

        {/* Floating background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Floating Minecraft-like blocks in background */}
          <div
            className="floating-bg-item absolute top-20 left-10 w-16 h-16 bg-green-500/10 rounded-lg rotate-12"
            data-speed="0.5"
          ></div>
          <div
            className="floating-bg-item absolute top-40 right-20 w-12 h-12 bg-blue-500/10 rounded-lg -rotate-12"
            data-speed="0.7"
          ></div>
          <div
            className="floating-bg-item absolute bottom-40 left-20 w-14 h-14 bg-purple-500/10 rounded-lg rotate-45"
            data-speed="0.6"
          ></div>
          <div
            className="floating-bg-item absolute bottom-60 right-[10%] w-10 h-10 bg-yellow-500/10 rounded-lg -rotate-20"
            data-speed="0.8"
          ></div>
          <div
            className="floating-bg-item absolute top-1/3 left-1/3 w-20 h-20 bg-cyan-500/10 rounded-lg rotate-30"
            data-speed="0.3"
          ></div>

          {/* Particles */}
          <div className="absolute inset-0 opacity-40 dark:opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
        </div>

        <main className="pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Vote cho CraftWorld
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
                            disabled={voted[site.name]}
                          >
                            {voted[site.name] ? (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                <span>Đã vote</span>
                              </>
                            ) : (
                              <>
                                <ExternalLink className="h-3 w-3" />
                                <span>Vote ngay</span>
                              </>
                            )}
                          </button>
                          {voted[site.name] && (
                            <span className="text-xs text-green-500 dark:text-green-400">
                              Đã nhận thưởng
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Kiểm tra trạng thái vote */}
              <div className="glass-card p-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-700">
                <h2 className="text-xl font-bold mb-4">
                  Kiểm tra trạng thái vote
                </h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    id="username"
                    placeholder="Nhập tên người chơi Minecraft"
                    className="flex-1 bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() =>
                      handleCheckStatus(
                        (
                          document.getElementById(
                            "username"
                          ) as HTMLInputElement
                        ).value
                      )
                    }
                    className="minecraft-btn py-2 md:px-6"
                  >
                    Kiểm tra
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thông báo */}
          {showNotification && (
            <div
              className={`fixed bottom-20 right-4 max-w-md p-4 rounded-lg shadow-lg animate-in slide-in-from-right-10 duration-300 ${
                notificationType === "success"
                  ? "bg-green-500/90"
                  : "bg-red-500/90"
              } text-white`}
            >
              <div className="flex items-start gap-3">
                {notificationType === "success" ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                )}
                <p>{notificationMessage}</p>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default Vote;
