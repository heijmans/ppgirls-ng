import { ShowTitlePipe } from "./show-title.pipe";
import { MOCK_SHOW } from "../state/state.mock";

describe("ShowTitlePipe", () => {
  it("should render the title", () => {
    const pipe = new ShowTitlePipe();
    expect(pipe.transform(MOCK_SHOW)).toEqual("PP2 (2013)");
  });
});
