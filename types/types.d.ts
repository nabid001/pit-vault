type Nullable<T> = T | null;

interface AlternativeSlugs {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
}

interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface Social {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: Nullable<string>;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

interface Wallpaper {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugs;
  created_at: string;
  updated_at: string;
  promoted_at: Nullable<string>;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: Nullable<string>;
  alt_description: string;
  breadcrumbs: string[];
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: Nullable<any>;
  topic_submissions: Record<string, unknown>;
  asset_type: string;
  user: User;
}

type GetWallpaperResponse = Wallpaper[] | undefined;

export type {
  Nullable,
  AlternativeSlugs,
  Urls,
  Links,
  UserLinks,
  ProfileImage,
  Social,
  User,
  Wallpaper,
  GetWallpaperResponse,
};

import type {
  Full as UnsplashPhotoFull,
  Basic as UnsplashPhotoBasic,
} from "unsplash-js/dist/methods/photos/types";
import type { Basic as UnsplashUserBasic } from "unsplash-js/dist/methods/users/types";

export type UnsplashPhoto = UnsplashPhotoFull;
export type UnsplashPhotoBasicType = UnsplashPhotoBasic;
export type UnsplashUser = UnsplashUserBasic;

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export interface CategoriesProps {
  id: number;
  name: string;
  value: string;
}
