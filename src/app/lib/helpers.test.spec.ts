import { Component, Pipe } from "@angular/core";
import { createMockComponent, createMockPipe, IMockClass } from "./helpers.test";

const DUMMY_COMPONENT: IMockClass = () => {};
DUMMY_COMPONENT.__annotations__ = [
  new Component({ selector: "app-comp", template: "<h1>Title</h1>" }),
];
DUMMY_COMPONENT.__parameters__ = [5];

const DUMMY_PIPE: IMockClass = () => {};
DUMMY_PIPE.__annotations__ = [new Pipe({ name: "pipe" })];
DUMMY_PIPE.__prop__metadata__ = { a: 5 };

describe("test helpers", () => {
  describe("createMockComponent", () => {
    it("should copy a component but not the template", () => {
      const newCompontent = createMockComponent(DUMMY_COMPONENT);
      const componentAnnotation = newCompontent.__annotations__![0] as Component;
      expect(componentAnnotation.selector).toEqual("app-comp");
      expect(componentAnnotation.template).toEqual("");
      expect(newCompontent.__parameters__).toEqual([5]);
    });

    it("should throw if not a valid compontent", () => {
      expect(() => {
        createMockComponent({});
      }).toThrow();
    });
  });

  describe("createMockPipe", () => {
    it("should copy a pipe but not the transform", () => {
      const newPipe = createMockPipe(DUMMY_PIPE);
      const componentAnnotation = newPipe.__annotations__![0] as Pipe;
      expect(componentAnnotation.name).toEqual("pipe");
      expect(newPipe.__prop__metadata__).toEqual({ a: 5 });
      expect(newPipe.prototype.transform(1, 2)).toEqual("pipe(1,2)");
    });

    it("should throw if not a valid pipe", () => {
      expect(() => {
        createMockPipe({});
      }).toThrow();
    });
  });
});
