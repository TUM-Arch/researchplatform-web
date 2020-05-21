// URLs
export const webURL = "http://localhost:3000";
export const errorURL = `${webURL}/error`;

export const serverURL = "http://localhost:5000/api";
export const projectsURL = `${serverURL}/projects`;
export const formfieldsURL = `${serverURL}/fields`;
export const imagesURL = `${serverURL}/images`;
export const loginURL = `${serverURL}/login`;
export const logoutURL = `${serverURL}/logout`;

// COLORS
export const grey50 = "#fafafa";
export const grey100 = "#f5f5f5";
export const COLOR_NOT_SUBMITTED = "";
export const COLOR_SUBMITTED = "#CDCDCD";
export const COLOR_REJECTED = "#FF726F";
export const COLOR_APPROVED = "#D0F0C0";

// OTHERS
export const defaultImageIcon =
  "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";
