import {
  makeSimpleRouteState,
  IImage,
  IShow,
  IEpisode,
  IState,
  ISimpleRouteOptions,
} from "./state";
import { MOCK_STATE } from "./state.mock";

describe("makeSimpleRouteState", () => {
  it("should make a route state with params", () => {
    expect(makeSimpleRouteState({ params: { showId: "5" } })).toEqual({
      state: { url: "/", params: { showId: "5" }, queryParams: {} },
      navigationId: 0,
    });
  });

  it("should make a route state with url and query", () => {
    expect(makeSimpleRouteState({ url: "/?test", queryParams: { showId: "5" } })).toEqual({
      state: { url: "/?test", params: {}, queryParams: { showId: "5" } },
      navigationId: 0,
    });
  });
});
