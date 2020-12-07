import { Observable } from "rxjs";

import SiteData from "../../data-types/site-data";
import TrackTickClient, {
  PaginationOpt,
} from "../../clients/tracktik/tracktik.client";

//#region Typings

interface ListOpt extends PaginationOpt {}

interface SiteRepositoryDependencies {
  trackTikClient: TrackTickClient;
}

//#endregion Typings

export class SiteRepository {
  private trackTikClient: TrackTickClient;

  constructor({ trackTikClient }: SiteRepositoryDependencies) {
    this.trackTikClient = trackTikClient;
  }

  find(id: SiteData["id"]): Observable<SiteData> {
    return this.trackTikClient.findSite(id);
  }

  list(opt?: ListOpt): Observable<SiteData[]> {
    return this.trackTikClient.listSites(opt);
  }
}

export default SiteRepository;
