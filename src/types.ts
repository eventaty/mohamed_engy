export interface Blessing {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  prayerBadge?: string;
  likes: number;
  likedBy?: string[];
  createdAt: number;
}
