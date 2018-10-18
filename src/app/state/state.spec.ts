import {
  makeSimpleRouteState,
  IImage,
  IShow,
  IEpisode,
  IState,
  ISimpleRouteOptions,
} from "./state";

export const MOCK_IMAGE: IImage = {
  medium: "medium.jpg",
  original: "original.jpg",
};
export const MOCK_SHOW: IShow = { id: 5, name: "PP2", premiered: "2013-01-10", image: MOCK_IMAGE };
export const MOCK_EPISODES: IEpisode[] = [
  { id: 101, name: "EP101", image: MOCK_IMAGE, season: 1, number: 1 },
  { id: 102, name: "EP102", image: MOCK_IMAGE, season: 1, number: 2 },
  { id: 103, name: "EP103", image: MOCK_IMAGE, season: 1, number: 3 },
];
export const MOCK_STATE: IState = {
  shows: { data: [MOCK_SHOW] },
  episodesByShowId: { 5: { data: MOCK_EPISODES } },
  router: makeSimpleRouteState({ params: { showId: "5", episodeId: "102" } }),
};
export const MOCK_FETCHING_STATE: IState = {
  shows: { isFetching: true },
  episodesByShowId: { 5: { isFetching: true } },
  router: makeSimpleRouteState({ params: { showId: "5", episodeId: "102" } }),
};
export const MOCK_EMPTY_STATE: IState = {
  shows: {},
  episodesByShowId: {},
  router: makeSimpleRouteState({ params: { showId: "6", episodeId: "343" } }),
};

export function mockStateWithRoute(options: ISimpleRouteOptions) {
  return Object.assign({}, MOCK_STATE, { router: makeSimpleRouteState(options) });
}

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
