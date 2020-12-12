import { TRACKTIK_HOST } from "./env";
import HttpClient, { HttpClientSuperAgentAdapter } from "./clients/http";
import SiteRepository from "./repositories/site";
import TrackTikClient from "./clients/tracktik";
import UserRepository from "./repositories/user";

//#region Clients
let httpClient: HttpClient;
export const getHttpClient = (): HttpClient => {
  if (!httpClient) {
    const adapter = new HttpClientSuperAgentAdapter();
    httpClient = new HttpClient({ adapter });
  }
  return httpClient;
};

let trackTikClient: TrackTikClient;
export const getTrackTikClient = (): TrackTikClient => {
  if (!trackTikClient) {
    trackTikClient = new TrackTikClient({
      httpClient: getHttpClient(),
      host: TRACKTIK_HOST,
    });
  }
  return trackTikClient;
};
//#endregion Clients

//#region Repositories
let siteRepository: SiteRepository;
export const getSiteRepository = (): SiteRepository => {
  if (!siteRepository) {
    siteRepository = new SiteRepository({
      trackTikClient: getTrackTikClient(),
    });
  }
  return siteRepository;
}

let userRepository: UserRepository;
export const getUserRepository = (): UserRepository => {
  if (!userRepository) {
    userRepository = new UserRepository({
      trackTikClient: getTrackTikClient(),
    });
  }
  return userRepository;
};
//#endregion Repositories
