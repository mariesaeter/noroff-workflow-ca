import { logout } from "../../js/api/auth";

describe("logout", () => {
  it("Removes token from local storage", () => {
    global.localStorage = {
      removeItem: jest.fn(),
    };
    logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });
});
