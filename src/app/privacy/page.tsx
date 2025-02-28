"use client"
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TranslationProvider } from "@/hooks/useTranslation";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Hiệu ứng nền chuyển động khi cuộn
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.bg-scroll-element');
      scrollElements.forEach(el => {
        const element = el as HTMLElement;
        const scrollY = window.scrollY;
        const speed = element.dataset.speed || "0.1";
        element.style.transform = `translate3d(0, ${scrollY * parseFloat(speed)}px, 0)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
                <h1 className="text-3xl md:text-4xl font-bold mb-6">Chính sách bảo mật</h1>
                <div className="h-1 w-20 bg-primary rounded-full mb-8"></div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>CraftWorld cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng máy chủ Minecraft của chúng tôi.</p>
                  
                  <h2 className="mt-8 text-2xl font-bold">1. Thông tin thu thập</h2>
                  <p>Khi bạn tham gia máy chủ Minecraft của chúng tôi, chúng tôi có thể thu thập các thông tin sau:</p>
                  <ul>
                    <li>Tên người dùng Minecraft của bạn</li>
                    <li>Địa chỉ IP của bạn</li>
                    <li>Thời gian và thời lượng kết nối</li>
                    <li>Hoạt động trong trò chơi (xây dựng, tương tác với người chơi khác, v.v.)</li>
                    <li>Nội dung chat trong trò chơi</li>
                    <li>Thông tin tài khoản (nếu bạn đăng ký trên trang web của chúng tôi)</li>
                  </ul>
                  
                  <h2 className="mt-8 text-2xl font-bold">2. Sử dụng thông tin</h2>
                  <p>Chúng tôi sử dụng thông tin thu thập được để:</p>
                  <ul>
                    <li>Quản lý và duy trì máy chủ Minecraft</li>
                    <li>Cung cấp và cải thiện dịch vụ của chúng tôi</li>
                    <li>Thực thi quy tắc máy chủ và ngăn chặn hành vi vi phạm</li>
                    <li>Liên lạc với bạn về cập nhật, sự kiện hoặc thay đổi đối với dịch vụ của chúng tôi</li>
                    <li>Giải quyết tranh chấp và khắc phục sự cố</li>
                  </ul>
                  
                  <h2 className="mt-8 text-2xl font-bold">3. Bảo vệ dữ liệu</h2>
                  <p>Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, sửa đổi, tiết lộ hoặc phá hủy. Dữ liệu nhạy cảm được mã hóa và chỉ nhân viên được ủy quyền mới có thể truy cập.</p>
                  
                  <h2 className="mt-8 text-2xl font-bold">4. Chia sẻ thông tin</h2>
                  <p>Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho bên thứ ba mà không có sự đồng ý của bạn, trừ khi:</p>
                  <ul>
                    <li>Cần thiết để cung cấp dịch vụ bạn yêu cầu</li>
                    <li>Được yêu cầu bởi pháp luật</li>
                    <li>Để bảo vệ quyền, tài sản hoặc an toàn của chúng tôi hoặc người khác</li>
                  </ul>
                  
                  <h2 className="mt-8 text-2xl font-bold">5. Cookies và công nghệ theo dõi</h2>
                  <p>Trang web của chúng tôi có thể sử dụng cookies và công nghệ theo dõi tương tự để cải thiện trải nghiệm của bạn. Bạn có thể kiểm soát cookies thông qua cài đặt trình duyệt của mình.</p>
                  
                  <h2 className="mt-8 text-2xl font-bold">6. Quyền của bạn</h2>
                  <p>Bạn có quyền:</p>
                  <ul>
                    <li>Truy cập thông tin cá nhân mà chúng tôi lưu giữ về bạn</li>
                    <li>Yêu cầu sửa đổi thông tin không chính xác</li>
                    <li>Yêu cầu xóa dữ liệu của bạn (nếu pháp luật cho phép)</li>
                    <li>Phản đối việc xử lý dữ liệu của bạn</li>
                    <li>Rút lại sự đồng ý của bạn bất cứ lúc nào</li>
                  </ul>
                  
                  <h2 className="mt-8 text-2xl font-bold">7. Thay đổi chính sách</h2>
                  <p>Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng chính sách mới trên trang web của chúng tôi.</p>
                  
                  <h2 className="mt-8 text-2xl font-bold">8. Liên hệ</h2>
                  <p>Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật của chúng tôi, vui lòng liên hệ với chúng tôi qua email: privacy@craftworld.com</p>
                  
                  <p className="mt-8 text-sm text-muted-foreground">Cập nhật lần cuối: 01/08/2023</p>
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

export default Privacy;