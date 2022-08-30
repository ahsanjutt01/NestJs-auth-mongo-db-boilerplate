/* eslint-disable prettier/prettier */
export class CreatePostDTO {
  readonly title: string;
  readonly tags: string;
  isMockupsAdded: boolean;
  imageUrl?: string[];
}
