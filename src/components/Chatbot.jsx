import { useState } from "react";
import { Bot, Sparkles } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Chào bạn! Tôi có thể giúp gì với khoá học hôm nay?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Bạn là AI tư vấn khoá học. Hãy gợi ý các khoá học phù hợp từ khoá sau: "${userMsg.text}". Trả lời ngắn gọn, thân thiện.`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const result = await response.json();
      const botText =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Xin lỗi, tôi không hiểu yêu cầu của bạn.";

      setMessages((prev) => [...prev, { from: "bot", text: botText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Đã xảy ra lỗi kết nối tới AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Nút mở chatbox */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          title="Tư vấn AI"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Hộp thoại chatbox */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 text-lg font-semibold flex justify-between items-center">
            <span>🤖 Tư vấn khoá học</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-xl hover:scale-110 transition"
              title="Đóng"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.from === "user"
                    ? "bg-blue-100 text-blue-800 self-end ml-auto"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <p className="text-gray-500 text-sm italic">AI đang trả lời...</p>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              placeholder="Tôi muốn học tiếng Anh với người Mỹ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 border rounded-full focus:ring-2 ring-blue-300"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
