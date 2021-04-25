import {
  ACCOUNTS_ENDPOINT,
  API_BASE_URL,
  API_PREFIX,
  EXPORTS_ENDPOINT,
  ISSUES_ENDPOINT,
  ITEMS_ENDPOINT,
  LISTS_ENDPOINT,
  SUBSCRIBERS_ENDPOINT,
} from "./constants";
import {
  AddSubscriberInput,
  RevueAddItemInput,
  RevueExport,
  RevueExportFromList,
  RevueExportID,
  RevueIssue,
  RevueIssueID,
  RevueItem,
  RevueList,
  RevueListID,
  RevueProfileUrl,
  RevueSubscriber,
  UnsubscribeInput,
  UpdateSubscriberInput,
} from "./types";

interface RequestOptions extends RequestInit {
  body?: any;
}

interface ClientOptions {
  token: string;
}

export default class RevueClient {
  token: string;

  constructor(options: ClientOptions) {
    if (!options.token) {
      throw new Error("Missing Revue API token");
    }
    this.token = options.token;
  }

  async request<Result = any>(
    url: string,
    { headers, body, ...init }: RequestOptions = {}
  ): Promise<Result> {
    const res = await fetch(`${API_BASE_URL}${API_PREFIX}${url}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.token}`,
        ...headers,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  }

  // Lists
  getAllLists() {
    return this.request<RevueList[]>(LISTS_ENDPOINT);
  }
  getSingleList(listId: RevueListID) {
    return this.request<RevueList>(`${LISTS_ENDPOINT}/${listId}`);
  }

  // Issues
  getAllSentIssues() {
    return this.request<RevueIssue[]>(ISSUES_ENDPOINT);
  }
  getCurrentIssue() {
    return this.request<RevueIssue>(`${ISSUES_ENDPOINT}/current`);
  }
  getLastSentIssue() {
    return this.request<RevueIssue>(`${ISSUES_ENDPOINT}/latest`);
  }

  // Items
  getInboxItems() {
    return this.request<RevueItem[]>(ITEMS_ENDPOINT);
  }
  addItemToIssue(issueId: RevueIssueID, body: RevueAddItemInput) {
    return this.request<RevueItem>(`${ISSUES_ENDPOINT}/${issueId}/items`, {
      method: "POST",
      body,
    });
  }

  // Subscribers
  getAllSubscribers() {
    return this.request<RevueItem[]>(SUBSCRIBERS_ENDPOINT);
  }
  getAllUnsubscribed() {
    return this.request<RevueItem[]>(`${SUBSCRIBERS_ENDPOINT}/unsubscribed`);
  }
  addSubscriber(body: AddSubscriberInput) {
    return this.request<RevueSubscriber>(SUBSCRIBERS_ENDPOINT, {
      method: "POST",
      body,
    });
  }
  updateSubscriber(body: UpdateSubscriberInput) {
    return this.request<RevueSubscriber>(SUBSCRIBERS_ENDPOINT, {
      method: "PATCH",
      body,
    });
  }
  unsubscribe(body: UnsubscribeInput) {
    return this.request<RevueSubscriber>(SUBSCRIBERS_ENDPOINT, {
      method: "POST",
      body,
    });
  }

  // Exports
  getAllExports() {
    return this.request<RevueExportFromList[]>(EXPORTS_ENDPOINT);
  }
  getSingleExport(exportId: RevueExportID) {
    return this.request<RevueExport>(`${EXPORTS_ENDPOINT}/${exportId}`);
  }
  startExport(listId: RevueListID) {
    return this.request<RevueExport>(`${EXPORTS_ENDPOINT}/lists/${listId}`, {
      method: "POST",
    });
  }

  // Profile
  getProfileUrl() {
    return this.request<RevueProfileUrl>(`${ACCOUNTS_ENDPOINT}/me`);
  }
}
