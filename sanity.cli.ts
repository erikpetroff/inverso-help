import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: "inverso-help",
  deployment: {
    appId: "yqf0j8kvvx977ql6fzfjkld5",
    autoUpdates: true,
  },
});
