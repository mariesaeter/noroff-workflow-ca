import { login } from "../../js/api/auth";

const TEST_USER = {
  name: "name",
  email: "name@example.com",
  avatar: "https://avatar.example.com/",
  banner: "https://banner.example.com",
  accessToken: "token",
};

function mockFetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve(TEST_USER),
  });
}

describe("login", () => {
  it("Returns an object when provided with a valid email and password", async () => {
    global.fetch = jest.fn(() => mockFetchSuccess());
    global.localStorage = {
      setItem: jest.fn(),
    };
    const user = await login("name@example.com", "password");
    expect(user).toMatchObject(TEST_USER);
  });
  it("saves access token to local storage", async () => {
    global.fetch = jest.fn(() => mockFetchSuccess());
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    await login("name@example.com", "password");

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      JSON.stringify(TEST_USER.accessToken)
    );
  });
});
