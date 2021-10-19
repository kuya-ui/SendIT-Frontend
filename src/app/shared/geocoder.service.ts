import {Injectable} from '@angular/core';
import {Point} from 'geojson';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

export interface IGeocoderContext {
  id: string;
  wikidata: string;
  text: string;
}

export interface IGeocoderFeature {
  id: string;
  type: 'Feature';
  place_type: Array<string>;
  relevance: number;
  properties: Object;
  address: string;
  text: string;
  place_name: string;
  bbox: [number, number, number, number];
  center: [number, number];
  geometry: Point;
  context: Array<IGeocoderContext>;
}

export interface IGeocoderResult {
  type: 'FeatureCollection';
  query: Array<string | number>;
  features: Array<IGeocoderFeature>;
  attribution: string;
}


@Injectable({
  providedIn: 'root'
})

export class GeocoderService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public forwardGeocoding(
    address: string,
    mapboxToken: string,

  ): Observable<IGeocoderResult> {
    // build uri
    const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`;
    // build params
    let params = new HttpParams();
    params = params.append('access_token', mapboxToken);
    params = params.append('autocomplete', 'true');

    return this.http.get<IGeocoderResult>(uri, {params: params})
      .pipe(
        catchError((err: Response) => {
          return throwError(err);
        })
      );
  }

}
