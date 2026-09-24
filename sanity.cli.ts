import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  // Le Studio est embarqué dans Next (/studio) : pas besoin de `sanity deploy`.
  api: { projectId, dataset },
});
