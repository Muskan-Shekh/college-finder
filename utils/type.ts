// types.ts
export interface College {
  rank: string;
  name: string;
  location: string;
  fees: { amount: string; description: string };
  placement: { averagePackage: string; highestPackage: string; placementPercentage: string };
  approvals: string;
  popularCourse: { name: string; cutoff: string };
  reviews: { rating: string; basedOn: string; tagline: string };
  cdScore: string;
  ranking: { mainRank: string; agency: string; year: string };
}
