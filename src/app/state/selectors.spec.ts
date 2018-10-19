import {
  getShow,
  getShows,
  getEpisode,
  getEpisodes,
  getParams,
  getSelectedShow,
  getSelectedEpisode,
  getSelectedEpisodes,
} from "./selectors";
import {
  MOCK_STATE,
  MOCK_FETCHING_STATE,
  MOCK_EMPTY_STATE,
  MOCK_SHOW,
  MOCK_EPISODES,
  mockStateWithRoute,
} from "./state.mock";

describe("selectors", () => {
  it("should get the shows", () => {
    expect(getShows(MOCK_EMPTY_STATE)).toBeUndefined();
    expect(getShows(MOCK_FETCHING_STATE)).toBeUndefined();
    expect(getShows(MOCK_STATE)).toEqual([MOCK_SHOW]);
  });

  it("should get the show", () => {
    expect(getShow(MOCK_EMPTY_STATE, 5)).toBeUndefined();
    expect(getShow(MOCK_FETCHING_STATE, 5)).toBeUndefined();
    expect(getShow(MOCK_STATE, 5)).toEqual(MOCK_SHOW);
  });

  it("should get the episodes", () => {
    expect(getEpisodes(MOCK_EMPTY_STATE, 5)).toBeUndefined();
    expect(getEpisodes(MOCK_FETCHING_STATE, 5)).toBeUndefined();
    expect(getEpisodes(MOCK_STATE, 5)).toEqual(MOCK_EPISODES);
  });

  it("should get the episode", () => {
    expect(getEpisode(MOCK_EMPTY_STATE, 5, 102)).toBeUndefined();
    expect(getEpisode(MOCK_FETCHING_STATE, 5, 102)).toBeUndefined();
    expect(getEpisode(MOCK_STATE, 5, 102)).toEqual(MOCK_EPISODES[1]);
  });

  it("should get the params", () => {
    expect(getParams(MOCK_STATE)).toEqual({ showId: 5, episodeId: 102 });
    expect(getParams(mockStateWithRoute({ params: { showId: "5" } }))).toEqual({
      showId: 5,
      episodeId: undefined,
    });
    expect(getParams(mockStateWithRoute({}))).toEqual({ showId: undefined, episodeId: undefined });
  });

  it("should get the selected show", () => {
    expect(getSelectedShow(MOCK_STATE)).toEqual(MOCK_SHOW);
    expect(getSelectedShow(MOCK_EMPTY_STATE)).toBeUndefined();
    expect(getSelectedShow(mockStateWithRoute({}))).toBeUndefined();
  });

  it("should get the selected episodes", () => {
    expect(getSelectedEpisodes(MOCK_STATE)).toEqual(MOCK_EPISODES);
    expect(getSelectedEpisodes(MOCK_EMPTY_STATE)).toBeUndefined();
    expect(getSelectedEpisodes(mockStateWithRoute({}))).toBeUndefined();
  });

  it("should get the selected episode", () => {
    expect(getSelectedEpisode(MOCK_STATE)).toEqual(MOCK_EPISODES[1]);
    expect(getSelectedEpisode(MOCK_EMPTY_STATE)).toBeUndefined();
    expect(getSelectedEpisode(mockStateWithRoute({}))).toBeUndefined();
  });
});
