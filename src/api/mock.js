import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import suggestions from "../data/suggestions.json";

// Setup
const mock = new MockAdapter(axios, { delayResponse: 1000 });

// Gợi ý sản phẩm
mock.onGet(/\/api\/suggestions/).reply((config) => {
  const hasUserId = config.url.includes("userId=");
  if (hasUserId) {
    return [200, suggestions]; // giả lập thành công
  }
  return [500, { message: "Không thể lấy gợi ý lúc này." }];
});

export default mock;
