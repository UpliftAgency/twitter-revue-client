type DateString = string;

export type RevueListID = number;
export type RevueIssueID = number;
export type RevueItemID = number;
export type RevueSubscriberID = number;
export type RevueExportID = number;

export type RevueListSyncSettings = {
  ftp: {
    enabled: boolean;
    interval: string;
    to_email: string | null;
    time_zone: string;
    day_of_week: number;
    hour_of_day: number;
    minute_of_hour: number;
  };
};

export interface RevueList {
  id: RevueListID;
  name: string;
  created_at: DateString;
  updated_at: DateString;
  account_id: number;
  verified: boolean;
  sync_settings: RevueListSyncSettings;
  manually_verified_at: DateString | null;
}

export interface RevueIssue {
  id: RevueIssueID;
  title: string;
  html: string;
  sent_at: DateString | null;
  description: string;
  url: string;
  active: boolean;
}

type RevueItemType = "image" | "text" | "header";

export interface RevueItem {
  id: RevueItemID;
  title: string;
  created_at: DateString;
  url: string;
  description: string;
  title_display: string;
  short_url: string;
  thumb_url: string;
  default_image: string;
  hash_id: string;
}

export interface RevueSubscriber {
  id: RevueSubscriberID;
  list_id: RevueListID;
  email: string;
  first_name: string | null;
  last_name: string | null;
  last_changed: DateString | null;
}

export interface RevueExport {
  id: RevueExportID;
  subscribed_file_name: string;
  subscribed_file_size: number;
  subscribed_content_type: string;
  unsubscribed_file_name: string;
  unsubscribed_file_size: number;
  unsubscribed_content_type: string;
  unsubscribe_url: string;
  subscribed_url: string;
}

export type RevueExportFromList = [
  RevueExport["id"],
  RevueExport["subscribed_file_name"],
  RevueExport["subscribed_file_size"],
  RevueExport["subscribed_content_type"],
  RevueExport["subscribed_url"],
  RevueExport["unsubscribed_file_name"],
  RevueExport["unsubscribed_file_size"],
  RevueExport["unsubscribed_content_type"],
  RevueExport["unsubscribe_url"]
];

export interface RevueProfileUrl {
  profile_url: string;
}

export interface RevueAddItemInput {
  issue_id: RevueIssueID;
  url: RevueItem["url"];
  image?: string;
  type: RevueItemType;
  caption: string;
}

export interface AddSubscriberInput {
  email: string;
  first_name?: string;
  last_name?: string;
  double_opt_in?: boolean;
}

export interface UpdateSubscriberInput extends AddSubscriberInput {
  member?: boolean;
}

export type UnsubscribeInput = AddSubscriberInput;
