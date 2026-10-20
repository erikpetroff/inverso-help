// The hosted Studio (`sanity deploy`) only sees SANITY_STUDIO_* variables, not the site's NEXT_PUBLIC_* ones.
export const studioProjectId = process.env.SANITY_STUDIO_PROJECT_ID || "nvshhh54";
export const studioDataset = process.env.SANITY_STUDIO_DATASET || "production";
