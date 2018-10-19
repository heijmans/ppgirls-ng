import { shows, episodesByShowId } from "./reducers";
import { requestShows, receiveShows, requestEpisodes, receiveEpisodes } from "./actions";
import { MOCK_SHOW, MOCK_EPISODES } from "./state.spec";

describe("shows reducer", () => {
  it("should handle a request action", () => {
    expect(shows({}, requestShows())).toEqual({ isFetching: true });
    expect(shows({ data: [] }, requestShows())).toEqual({ isFetching: true });
  });

  it("should handle a receive action", () => {
    expect(shows({}, receiveShows([MOCK_SHOW]))).toEqual({ data: [MOCK_SHOW] });
    expect(shows({ isFetching: true }, receiveShows([MOCK_SHOW]))).toEqual({ data: [MOCK_SHOW] });
  });

  it("should ignore an unknown action", () => {
    expect(shows({}, requestEpisodes(6))).toEqual({});
  });
});

describe("episodesByShowId reducer", () => {
  it("should handle a request action", () => {
    expect(episodesByShowId({}, requestEpisodes(7))).toEqual({ 7: { isFetching: true } });
    expect(episodesByShowId({ 8: { data: [] } }, requestEpisodes(8))).toEqual({
      8: { isFetching: true },
    });
  });

  it("should handle a receive action", () => {
    expect(episodesByShowId({}, receiveEpisodes(9, MOCK_EPISODES))).toEqual({
      9: { data: MOCK_EPISODES },
    });
    expect(
      episodesByShowId({ 10: { isFetching: true } }, receiveEpisodes(10, MOCK_EPISODES)),
    ).toEqual({ 10: { data: MOCK_EPISODES } });
  });

  it("should ignore an unknown action", () => {
    expect(episodesByShowId({}, requestShows())).toEqual({});
  });
});
