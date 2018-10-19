import {
  FETCH_EPISODES,
  fetchEpisodes,
  FETCH_SHOWS,
  fetchShows,
  RECEIVE_EPISODES,
  receiveEpisodes,
  RECEIVE_SHOWS,
  receiveShows,
  REQUEST_EPISODES,
  requestEpisodes,
  REQUEST_SHOWS,
  requestShows,
} from "./actions";
import { MOCK_SHOW, MOCK_EPISODES } from "./state.mock";

describe("actions", () => {
  it("should create a fetch shows action", () => {
    expect(fetchShows()).toEqual({ type: FETCH_SHOWS });
  });

  it("should create a request shows action", () => {
    expect(requestShows()).toEqual({ type: REQUEST_SHOWS });
  });

  it("should create a receive shows action", () => {
    expect(receiveShows([MOCK_SHOW])).toEqual({ type: RECEIVE_SHOWS, data: [MOCK_SHOW] });
  });

  it("should create a fetch episodes action", () => {
    expect(fetchEpisodes(6)).toEqual({ type: FETCH_EPISODES, showId: 6 });
  });

  it("should create a request episodes action", () => {
    expect(requestEpisodes(7)).toEqual({ type: REQUEST_EPISODES, showId: 7 });
  });

  it("should create a receive episodes action", () => {
    expect(receiveEpisodes(8, MOCK_EPISODES)).toEqual({
      type: RECEIVE_EPISODES,
      showId: 8,
      data: MOCK_EPISODES,
    });
  });
});
