import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.model';
  
@Injectable({
  providedIn: 'root'
})
export class TransactionsService{

  constructor(private httpClient: HttpClient) { }

  /**
   * To get all of transactions
   */
  getTransactions(): Observable<Transaction[]>
  {
    let username='code-challenge'
    let password='payvisioner'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<Transaction[]>('https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod/transactions',{headers});
  }

  /**
   * To get transactions were choose by the user only with currencyCode
   */
  getTransactionsByCurrencyCode(currencyCode): Observable<Transaction[]>
  {
    let username='code-challenge'
    let password='payvisioner'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<Transaction[]>('https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod/transactions?currencyCode='+ currencyCode,{headers});
  }

  /**
   * To get transactions were choose by the user only with action
   */
  getTransactionsByAction(action): Observable<Transaction[]>
  {
    let username='code-challenge'
    let password='payvisioner'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<Transaction[]>('https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod/transactions?action=' + action,{headers});
  }

  /**
   * To get transactions were choose by the user only with currencyCode and action
   */
  getTransactionsByOptions(currencyCode, action): Observable<Transaction[]>
  {
    let username='code-challenge'
    let password='payvisioner'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<Transaction[]>('https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod/transactions?action=' + action + '&currencyCode='+ currencyCode,{headers});
  }

}

