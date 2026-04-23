export const formatJoinedDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  const diffDays = diffMs < 0 ? 0 : Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  let label = "";

  if (diffDays === 0) label = "today";
  else if (diffDays === 1) label = "1 day old";
  else label = `${diffDays} days old`;

  return `Joined: ${formattedDate} (${label})`;
};
