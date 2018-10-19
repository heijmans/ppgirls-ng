import {
  makeSimpleRouteState,
  IImage,
  IShow,
  IEpisode,
  IState,
  ISimpleRouteOptions,
} from "./state";
import { CustomRouteSerializer } from "./state";
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from "@angular/router";

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

function makeMockSnapshot(
  params: Params,
  queryParams: Params,
  firstChild?: ActivatedRouteSnapshot,
): ActivatedRouteSnapshot {
  return ({ url: [], params, queryParams, firstChild } as any) as ActivatedRouteSnapshot;
}

describe("CustomRouteSerializer", () => {
  it("should serialize route data", () => {
    const routerState: RouterStateSnapshot = {
      url: "/1",
      root: makeMockSnapshot(
        { a: "1" },
        { a: "2" },
        makeMockSnapshot({ b: "1" }, { b: "2" }, makeMockSnapshot({ c: "1" }, { c: "2" })),
      ),
    };
    const serializer = new CustomRouteSerializer();
    expect(serializer.serialize(routerState)).toEqual({
      url: "/1",
      params: { c: "1" },
      queryParams: { a: "2" },
    });
  });
});
