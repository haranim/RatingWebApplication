import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RatingService {

    constructor(private _http: Http) { }

    private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

    private apiURL = '/api/Skills/';

    private RegenerateData = new Subject<number>();
    // Observable string streams
    RegenerateData$ = this.RegenerateData.asObservable();

    AnnounceChange(mission: number) {

        this.RegenerateData.next(mission);
    }

    LoadData(): Promise<ISkills[]> {
        return this._http.get(this.apiURL)
            .toPromise()
            .then(response => this.extractArray(response))
            .catch(this.handleErrorPromise);
    }

    Add(model) {
        let options = new RequestOptions({ headers: this.headers });
        delete model["id"];
        let body = JSON.stringify(model);
        return this._http.post(this.apiURL, body,
            options).toPromise().catch(this.handleErrorPromise);
    }

    Update(elem) {
        let options = new RequestOptions({ headers: this.headers });
        let body = JSON.stringify(elem);
        return this._http.put(this.apiURL, body,
            options).toPromise().catch(this.handleErrorPromise);
    }

    Delete(id: number) {
        return this._http.delete(this.apiURL +
            id).toPromise().catch(this.handleErrorPromise);
    }

    protected extractArray(res: Response, showprogress: boolean = true) {
        let data = res.json();

        return data || [];
    }

    protected handleErrorPromise(error: any): Promise<void> {
        try {
            error = JSON.parse(error._body);
        } catch (e) {
        }

        let errMsg = error.errorMessage
            ? error.errorMessage
            : error.message
                ? error.message
                : error._body
                    ? error._body
                    : error.status
                        ? `${error.status} - ${error.statusText}`
                        : 'unknown server error';

        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
export interface ISkills {
    id: number,
    description: string,
    rating: number
}

//A Promise essentially promises to call back when the results are ready. You ask an asynchronous service to do some work and give it a callback function. 
//The service does that work and eventually calls the function with the results or an error