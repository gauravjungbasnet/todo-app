import { HttpClient } from "@angular/common/http";
import { nullSafeIsEquivalent } from "@angular/compiler/src/output/output_ast";
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

    setLocalStorage(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getLocalStorage(key: string) {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }
}