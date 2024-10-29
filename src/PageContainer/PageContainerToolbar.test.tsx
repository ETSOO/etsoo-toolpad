import { describe, test } from "vitest";
import { PageContainerToolbar } from "./PageContainerToolbar";
import describeConformance from "../utils/describeConformance";

describe("PageContainerToolbar", () => {
  describeConformance(<PageContainerToolbar />, () => ({
    skip: ["themeDefaultProps"]
  }));

  test("dummy test", () => {});
});
