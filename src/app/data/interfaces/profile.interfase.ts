export interface Profile{
  id: number,
  username: string,
  description: string,
  avatarUrl: string | null,
  subscribersAmount: number,
  firstName: string,
  lastName: string,
  isActive: boolean,
  isSubscribed: boolean,
  stack: string[],
  city: string
}
