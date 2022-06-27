import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { TaskModel } from "../models/task.model";

@Injectable()
export class DummyDataService {
    constructor(
        private http: HttpClient
    ) { }

    readonly fetchDummyData$ = <T>(
    ): Observable<T> =>
        this.http.get<T>('../../../assets/task-data.json');
}