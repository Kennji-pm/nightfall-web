"use client"
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TranslationProvider } from "@/hooks/useTranslation";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Hiệu ứng nền chuyển động khi cuộn
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll(".bg-scroll-element");
      scrollElements.forEach((el) => {
        const element = el as HTMLElement;
        const scrollY = window.scrollY;
        const speed = element.dataset.speed || "0.1";
        element.style.transform = `translate3d(0, ${
          scrollY * parseFloat(speed)
        }px, 0)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <Navbar />

        {/* Background effect elements */}
        <div className="fixed inset-0 opacity-30 dark:opacity-10 pointer-events-none bg-[radial-gradient(#3689fe_1px,transparent_1px)] [background-size:40px_40px]"></div>

        <div
          className="fixed top-20 -left-32 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl bg-scroll-element"
          data-speed="0.03"
        ></div>
        <div
          className="fixed top-1/3 right-0 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl bg-scroll-element"
          data-speed="0.06"
        ></div>
        <div
          className="fixed bottom-0 left-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl bg-scroll-element"
          data-speed="0.08"
        ></div>

        <div
          className="absolute top-40 left-10 w-20 h-20 bg-green-400/5 rounded-lg rotate-12 bg-scroll-element"
          data-speed="-0.05"
        ></div>
        <div
          className="absolute top-60 right-20 w-16 h-16 bg-yellow-400/5 rounded-lg -rotate-12 bg-scroll-element"
          data-speed="-0.07"
        ></div>
        <div
          className="absolute bottom-40 left-1/2 w-24 h-24 bg-purple-400/5 rounded-lg rotate-45 bg-scroll-element"
          data-speed="-0.03"
        ></div>

        <main className="pt-24 pb-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="mb-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  Điều khoản dịch vụ
                </h1>
                <div className="h-1 w-20 bg-primary rounded-full mb-8"></div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Bằng cách truy
                    cập hoặc sử dụng trang web CraftWorld, bạn đồng ý tuân thủ
                    các điều khoản dịch vụ này.
                  </p>

                  <h2 className="mt-8 text-2xl font-bold">
                    1. Chấp nhận điều khoản
                  </h2>
                  <p>
                    Bằng cách truy cập và sử dụng máy chủ Minecraft này, bạn
                    đồng ý tuân theo các điều khoản này. Nếu bạn không đồng ý
                    với bất kỳ phần nào của các điều khoản này, bạn không được
                    phép sử dụng dịch vụ của chúng tôi.
                  </p>

                  <h2 className="mt-8 text-2xl font-bold">
                    2. Sửa đổi điều khoản
                  </h2>
                  <p>
                    Chúng tôi có quyền, theo quyết định riêng của mình, sửa đổi
                    hoặc thay thế các điều khoản này bất cứ lúc nào. Nếu một sửa
                    đổi được thực hiện, chúng tôi sẽ cố gắng thông báo cho bạn
                    trước ít nhất 30 ngày trước khi các điều khoản mới có hiệu
                    lực.
                  </p>

                  <h2 className="mt-8 text-2xl font-bold">3. Quy tắc ứng xử</h2>
                  <p>
                    Khi sử dụng máy chủ Minecraft của chúng tôi, bạn đồng ý:
                  </p>
                  <ul>
                    <li>
                      Không sử dụng bất kỳ hình thức hack, cheat hoặc lợi dụng
                      lỗ hổng trong trò chơi
                    </li>
                    <li>Không quấy rối, đe dọa hoặc bắt nạt người chơi khác</li>
                    <li>
                      Không sử dụng ngôn ngữ khiếm nhã hoặc phân biệt đối xử
                    </li>
                    <li>
                      Không phá hoại công trình của người chơi khác trừ khi được
                      phép trong các khu vực PvP
                    </li>
                    <li>
                      Không quảng cáo dịch vụ hoặc máy chủ khác mà không được
                      phép
                    </li>
                  </ul>

                  <h2 className="mt-8 text-2xl font-bold">
                    4. Tài khoản người dùng
                  </h2>
                  <p>
                    Bạn phải có tài khoản Minecraft hợp lệ để sử dụng dịch vụ
                    của chúng tôi. Bạn có trách nhiệm bảo mật tài khoản của mình
                    và mọi hoạt động xảy ra dưới tài khoản đó.
                  </p>

                  <h2 className="mt-8 text-2xl font-bold">
                    5. Quyền sở hữu trí tuệ
                  </h2>
                  <p>
                    Minecraft là tài sản của Mojang AB và Microsoft. Các tài
                    nguyên, plugin và bản đồ tùy chỉnh trên máy chủ của chúng
                    tôi thuộc quyền sở hữu của các nhà phát triển tương ứng. Bạn
                    không có quyền sao chép, phân phối hoặc chỉnh sửa các nội
                    dung này mà không được phép rõ ràng.
                  </p>

                  <h2 className="mt-8 text-2xl font-bold">
                    6. Giới hạn trách nhiệm
                  </h2>
                  <p>
                    Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất dữ liệu,
                    mất tiến độ trong trò chơi hoặc bất kỳ thiệt hại nào khác
                    xảy ra khi sử dụng dịch vụ của chúng tôi. Chúng tôi cố gắng
                    duy trì máy chủ ổn định nhưng không thể đảm bảo thời gian
                    hoạt động 100%.
                  </p>

                  <h2 className="mt-8 text-2xl font-bold">7. Chấm dứt</h2>
                  <p>
                    Chúng tôi có quyền, theo quyết định riêng của mình, chấm dứt
                    hoặc đình chỉ quyền truy cập của bạn vào máy chủ vì bất kỳ
                    lý do gì, bao gồm nhưng không giới hạn ở việc vi phạm các
                    điều khoản này.
                  </p>

                  <h2 className="mt-8 text-2xl font-bold">8. Liên hệ</h2>
                  <p>
                    Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui
                    lòng liên hệ với chúng tôi qua email: support@craftworld.com
                  </p>

                  <p className="mt-8 text-sm text-muted-foreground">
                    Cập nhật lần cuối: 01/08/2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default Terms;
