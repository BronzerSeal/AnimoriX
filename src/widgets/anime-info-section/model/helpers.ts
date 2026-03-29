export const formatAiredDate = (date?: string | null) => {
  if (!date) return "?";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export const joinNames = (items?: Array<{ name?: string | null }> | null) => {
  const names =
    items?.map((item) => item.name).filter((name): name is string => !!name) ||
    [];

  return names.length > 0 ? names.join(", ") : "?";
};
