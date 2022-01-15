import mockFetch from "cross-fetch";
import reducer, { getBlocks } from "./blocks";
import { Block } from "../types/Block";
import initialStateBlocks from "./initialStateBlocks";

jest.mock("cross-fetch");

const mockedFech: jest.Mock<unknown> = mockFetch as any;

describe("Reducers::Nodes", () => {
  const getInitialState = () => {
    return initialStateBlocks().blocks;
  };

  const nodeA: Block = {
    attributes: {
      data: "The Human Torch",
      hash: "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
      index: 1,
      previousHash: "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
    },
    id: "5",
    type: "blocks",
    status: "ok",
  };

  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle getBlocks.pending", () => {
    const appState = {
      list: [nodeA],
    };
    const action = { type: getBlocks.pending, meta: { arg: nodeA } };
    const expected = {
      list: [
        {
          ...nodeA,
          status: "loading",
        },
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle getBlocks.fulfilled", () => {
    const simpleBlock: Block = {
      id: "5",
      type: "blocks",
      status: "ok",
    };

    const appState = {
      list: [simpleBlock],
    };
    const action = {
      type: getBlocks.fulfilled,
      meta: { arg: nodeA },
      payload: { data: [simpleBlock] },
    };
    const expected = {
      list: [simpleBlock],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle getBlocks.rejected", () => {
    const appState = {
      list: [
        {
          ...nodeA,
        },
      ],
    };
    const action = { type: getBlocks.rejected, meta: { arg: nodeA } };
    const expected = {
      list: [
        {
          ...nodeA,
          status: "error",
        },
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
