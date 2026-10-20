import { defineCliConfig } from "sanity/cli";
import { studioDataset, studioProjectId } from "./src/sanity/studio-env";

export default defineCliConfig({
  api: {
    projectId: studioProjectId,
    dataset: studioDataset,
  },
  studioHost: "inverso-help",
  deployment: {
    autoUpdates: true,
  },
});
