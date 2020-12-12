import { of } from "rxjs";

import CURRENT_USER_RESPONSE from "../../__fixtures__/current-user-response.fixture";
import FIND_SITE_RESPONSE from "../../__fixtures__/find-site-response.fixture";
import HttpClient, { HttpResponse } from "../http";
import LIST_SITES_RESPONSE from "../../__fixtures__/list-sites-response.fixture";
import SiteData from "../../data-types/site-data";
import TrackTikClient from "./tracktik.client";
import UserData from "../../data-types/user-data";

describe("TrackTikClient", () => {
  const host = "https//example.com";

  let httpClientMock: HttpClient;
  let client: TrackTikClient;

  beforeEach(() => {
    httpClientMock = { get: jest.fn(() => of()) } as any;
    client = new TrackTikClient({ host, httpClient: httpClientMock });
  });

  test("should initialize without crashing", () => {
    expect(client).toBeTruthy();
  });

  describe("site APIs", () => {
    describe("#findSite", () => {
      const json = FIND_SITE_RESPONSE;
      const siteId = json.id;

      beforeEach(() => {
        httpClientMock.get = jest.fn(() =>
          of({ body: json, header: {}, status: 200 } as HttpResponse)
        );
      });

      test("resquest", () => {
        client.findSite(siteId);

        expect(httpClientMock.get).toHaveBeenCalledWith({
          url: `${host}/sites/${siteId}`,
        });
      });

      test("response", (done) => {
        client.findSite(siteId).subscribe((resp) => {
          const site: SiteData = {
            address: {
              city: json.address.city,
              country: json.address.country,
              state: json.address.state,
              street: json.address.street,
              zipCode: json.address.zipCode,
            },
            contact: {
              address: {
                city: json.contacts.main.address.city,
                country: json.contacts.main.address.country,
                state: json.contacts.main.address.state,
                street: json.contacts.main.address.street,
                zipCode: json.contacts.main.address.zipCode,
              },
              email: json.contacts.main.email,
              id: json.contacts.main.id,
              jobTitle: json.contacts.main.jobTitle,
              name: [
                json.contacts.main.firstName,
                json.contacts.main.lastName,
              ].join(" "),
              phoneNumber: json.contacts.main.phoneNumber,
            },
            id: siteId,
            images: json.images,
            title: json.title,
          };

          expect(resp).toEqual(site);
          done();
        });
      });
    });

    describe("#listSites", () => {
      const json = LIST_SITES_RESPONSE;

      beforeEach(() => {
        httpClientMock.get = jest.fn(() =>
          of({ body: json, header: {}, status: 200 } as HttpResponse)
        );
      });

      test("resquest", () => {
        const params = { page: 2, limit: 17 };
        client.listSites({ ...params });

        expect(httpClientMock.get).toHaveBeenCalledWith({
          query: { _limit: params.limit, _page: params.page },
          url: `${host}/sites`,
        });
      });

      test("response", (done) => {
        client.listSites().subscribe((resp) => {
          resp.forEach((resp, i) => {
            const item = json[i];
            const site: SiteData = {
              address: {
                city: item.address.city,
                country: item.address.country,
                state: item.address.state,
                street: item.address.street,
                zipCode: item.address.zipCode,
              },
              contact: {
                address: {
                  city: item.contacts.main.address.city,
                  country: item.contacts.main.address.country,
                  state: item.contacts.main.address.state,
                  street: item.contacts.main.address.street,
                  zipCode: item.contacts.main.address.zipCode,
                },
                email: item.contacts.main.email,
                id: item.contacts.main.id,
                jobTitle: item.contacts.main.jobTitle,
                name: [
                  item.contacts.main.firstName,
                  item.contacts.main.lastName,
                ].join(" "),
                phoneNumber: item.contacts.main.phoneNumber,
              },
              id: item.id,
              images: item.images,
              title: item.title,
            };

            expect(resp).toEqual(site);
          });

          done();
        });
      });
    });
  });

  describe("user APIs", () => {
    const json = CURRENT_USER_RESPONSE;

    describe("get current", () => {
      beforeEach(() => {
        httpClientMock.get = jest.fn(() =>
          of({ body: json, header: {}, status: 200 } as HttpResponse)
        );
      });

      test("resquest", () => {
        client.getCurrentUser();
        expect(httpClientMock.get).toHaveBeenCalledWith({ url: `${host}/me` });
      });

      test("response", (done) => {
        client.getCurrentUser().subscribe((resp) => {
          const user: UserData = {
            avatarUrl: json.avatar,
            email: json.email,
            id: json.id,
            locale: json.locale,
            name: json.givenName,
            username: json.username,
          };

          expect(resp).toEqual(user);
          done();
        });
      });
    });
  });
});
