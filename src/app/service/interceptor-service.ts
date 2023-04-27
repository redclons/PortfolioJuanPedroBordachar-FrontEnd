import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: "root",
})
export class InterceptorService {
    constructor(private tokenService: TokenService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let intReq= request;
        const token= this.tokenService.getToken();
        if (token != null){
            intReq = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token)
            });
        }
        return next.handle(intReq);
    }
}

export const interceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
}];
