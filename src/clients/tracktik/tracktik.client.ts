import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

import AddressData from "../../data-types/address-data";
import ContactData from "../../data-types/contact-data";
import HttpClient, { HttpQueryParams } from "../http";
import HttpClientError from "../../errors/http-client.error";
import SiteData from "../../data-types/site-data";
import UserData from "../../data-types/user-data";

//#region Typings

interface ListOpt extends PaginationOpt {}

export interface PaginationOpt {
  limit?: number;
  page?: number;
}

interface TrackTikClientDependencies {
  host: string;
  httpClient: HttpClient;
}

//#endregion Typings

class TrackTikClient {
  private host: string;
  private httpClient: HttpClient;

  constructor({ host, httpClient }: TrackTikClientDependencies) {
    this.host = host;
    this.httpClient = httpClient;
  }

  findSite(id: SiteData["id"]): Observable<SiteData> {
    const url = this.url(`sites/${id}`);
    return this.httpClient.get({ url }).pipe(
      catchError(this.handleError),
      map((resp) => this.parseSite(resp.body))
    );
  }

  getCurrentUser(): Observable<UserData | undefined> {
    const url = this.url('me');
    return this.httpClient.get({ url }).pipe(
      catchError(this.handleError),
      map((resp) => this.parseUser(resp.body))
    );
  }

  listSites({ limit, page }: ListOpt = {}): Observable<SiteData[]> {
    const url = this.url("sites");
    const query = this.paginationToQueryParams({ limit, page });
    return this.httpClient.get({ query, url }).pipe(
      catchError(this.handleError),
      map((resp) => this.parseSites(resp.body))
    );
  }

  private handleError(err: any): Observable<never> {
    if (err instanceof HttpClientError) {
      // Possible improvements:
      // * handle and throw specific errors to the API the client is connecting to
      // * send error data to an analytics service

      return throwError(err);
    }

    throw err;
  }

  private paginationToQueryParams({
    limit,
    page,
  }: PaginationOpt): HttpQueryParams {
    return { _page: page, _limit: limit };
  }

  private parseAddress(json: Record<string, any>): AddressData {
    const { city, country, state, street, zipCode } = json;
    return { city, country, state, street, zipCode };
  }

  private parseContact(json: Record<string, any>): ContactData {
    const {
      address: addressJSON,
      email,
      firstName,
      id,
      jobTitle,
      lastName,
      phoneNumber,
    } = json;

    return {
      address: addressJSON && this.parseAddress(addressJSON),
      email,
      name: [firstName, lastName].join(" "),
      id,
      jobTitle,
      phoneNumber,
    };
  }

  private parseSite(json: Record<string, any>): SiteData {
    const { address: addressJSON, contacts, id, images, title } = json;

    return {
      address: addressJSON && this.parseAddress(addressJSON),
      contact: contacts?.main && this.parseContact(contacts.main),
      id,
      images,
      title,
    };
  }

  private parseSites(list: Record<string, any>[]): SiteData[] {
    return list.map((json) => this.parseSite(json));
  }

  private parseUser(json: Record<string, any>): UserData {
    return {
      avatarUrl: json.avatar,
      email: json.email,
      id: json.id,
      locale: json.locale,
      name: json.givenName,
      username: json.username,
    };
  }

  private url(path?: string): string {
    return [this.host.replace(/\/$/, ""), path?.replace(/^\//, "")]
      .filter(Boolean)
      .join("/");
  }
}

export default TrackTikClient;
