import { makeSimpleRouteState, IImage, IShow, IEpisode, IState } from "./state";

export const MOCK_IMAGE: IImage = {
  medium: "medium.jpg",
  original: "original.jpg",
};
export const MOCK_SHOW: IShow = { id: 10, name: "PP2", premiered: "2013-01-10", image: MOCK_IMAGE };
export const MOCK_EPISODES: IEpisode[] = [
  { id: 101, name: "EP101", image: MOCK_IMAGE, season: 1, number: 1 },
  { id: 102, name: "EP102", image: MOCK_IMAGE, season: 1, number: 2 },
  { id: 103, name: "EP103", image: MOCK_IMAGE, season: 1, number: 3 },
];
export const MOCK_STATE: IState = {
  shows: { data: [MOCK_SHOW] },
  episodesByShowId: { 10: { data: MOCK_EPISODES } },
  router: makeSimpleRouteState({ params: { showId: "10" } }),
};
export const MOCK_EMPTY_STATE: IState = {
  shows: {},
  episodesByShowId: {},
  router: makeSimpleRouteState({ params: { showId: "11" } }),
};

describe("makeSimpleRouteState", () => {
  it("should make a route state with params", () => {
    expect(makeSimpleRouteState({ params: { showId: "10" } })).toEqual({
      state: { url: "/", params: { showId: "10" }, queryParams: {} },
      navigationId: 0,
    });
  });
});
