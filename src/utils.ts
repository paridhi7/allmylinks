import { MilestoneType } from "./types";

export const groupByYear = (
  milestones: MilestoneType[]
): { year: string; milestones: MilestoneType[] }[] => {
  // Group by year
  const groups = milestones.reduce(
    (groups: Record<string, MilestoneType[]>, milestone: MilestoneType) => {
      const year: string = new Date(milestone.date).getFullYear().toString();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(milestone);
      return groups;
    },
    {}
  );

  // Sort years in descending order and map to an array
  return Object.keys(groups)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map((year) => ({
      year,
      milestones: groups[year],
    }));
};
