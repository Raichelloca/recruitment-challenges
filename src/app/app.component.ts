import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { TransactionsService } from './service/transactions.service';
import { Transaction } from './model/transaction.model';
import { FormGroup, FormControl, Validators , FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FrontEnd-Challenge';
  private listAction: String[] = ['payment', 'credit'];	
  private listCurrencyCode: String[] =  ['EUR', 'JPY', 'USD'];	

  private listTransactions: Transaction[] = [];
  private selectForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private transactionsService: TransactionsService,
    private formBuilder: FormBuilder  ) {

      this.selectForm = formBuilder.group({
        'action': new FormControl('Action'),
        'currencyCode': new FormControl('Currency Code'),
      });

    }

    

    
  ngOnInit() {

    this.authenticationService.login('code-challenge','payvisioner')
          .subscribe(
              data => {

                this.transactionsService.getTransactions()
                    .subscribe(
                        data => {
                          this.listTransactions = data;
                         
                        },
                        error => {
                          console.log('KO');
                        });
                    
              },
              error => {
                console.log('KO');
              });
      }

  
      /**
       * Metod to open or close transaction's detail
       * 
       * @param transaction 
       */
    openDetalle(transaction){

      if (transaction.isSelected == undefined || !transaction.isSelected){
        transaction.isSelected = true;
      }else{
        transaction.isSelected = false;
      }
    }

    /**
     * To search transactions with options choose by the user
     */
    searchOptions(){

      //
      if ((this.selectForm.value.action != 'Action' && this.selectForm.value.action != null) && 
          (this.selectForm.value.currencyCode != 'Currency Code' && this.selectForm.value.currencyCode != null)){
        
        this.transactionsService.getTransactionsByOptions(this.selectForm.value.currencyCode, this.selectForm.value.action)
        .subscribe(
            data => {
              this.listTransactions = data;
             
            },
            error => {
              console.log('KO');
            });
      }else  if (this.selectForm.value.action != 'Action' && this.selectForm.value.action != null){
          this.transactionsService.getTransactionsByAction(this.selectForm.value.action)
          .subscribe(
              data => {
                this.listTransactions = data;
              
              },
              error => {
                console.log('KO');
              });
      }else if (this.selectForm.value.currencyCode != 'Currency Code' && this.selectForm.value.currencyCode != null){
        this.transactionsService.getTransactionsByCurrencyCode(this.selectForm.value.currencyCode)
        .subscribe(
            data => {
              this.listTransactions = data;
             
            },
            error => {
              console.log('KO');
            });
      }else {
        this.transactionsService.getTransactions()
        .subscribe(
            data => {
              this.listTransactions = data;
             
            },
            error => {
              console.log('KO');
            });
      }
      
    }

    /**
     * To clear the search's options 
     */
    clear(){
      
      //reseteamos el formulario
      this.selectForm.reset();

      this.transactionsService.getTransactions()
        .subscribe(
            data => {
              this.listTransactions = data;             
            },
            error => {
              console.log('KO');
            });


    }
   
      
}
      
  
