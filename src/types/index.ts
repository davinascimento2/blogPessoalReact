export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTimeMinutes: number;
  category: 'Systems' | 'Web Audio' | 'IoT & Hardware' | 'Database' | 'Frontend Craft';
  tags: string[];
  excerpt: string;
  content: string;
}
