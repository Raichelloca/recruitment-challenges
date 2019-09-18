import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { TransactionsService } from './service/transactions.service';
import { Transaction } from './model/transaction.model';
import { FormGroup, FormControl, Validators , FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Frontend Challenge';
  private listAction: String[] = ['payment', 'credit'];	
  private listCurrencyCode: String[] =  ['EUR', 'JPY', 'USD'];	

  private listTransactions: Transaction[] = [];
  private selectForm: FormGroup;
  private p: number = 1;


  constructor(
    private authenticationService: AuthenticationService,
    private transactionsService: TransactionsService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService  ) {

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
                          this.toastrService.error('Error Transaction', 'Error getting Transactions');
                        });
                    
              },
              error => {
                this.toastrService.error('Error Transaction', 'Error getting Transactions');
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

      
      if ((this.selectForm.value.action != 'Action' && this.selectForm.value.action != null) && 
          (this.selectForm.value.currencyCode != 'Currency Code' && this.selectForm.value.currencyCode != null)){
        
        this.transactionsService.getTransactionsByOptions(this.selectForm.value.currencyCode, this.selectForm.value.action)
        .subscribe(
            data => {
              this.listTransactions = data;
             
            },
            error => {
              this.toastrService.error('Error Transaction', 'Error getting Transactions');
            });
      }else  if (this.selectForm.value.action != 'Action' && this.selectForm.value.action != null){
          this.transactionsService.getTransactionsByAction(this.selectForm.value.action)
          .subscribe(
              data => {
                this.listTransactions = data;
              
              },
              error => {
                this.toastrService.error('Error Transaction', 'Error getting Transactions');
              });
      }else if (this.selectForm.value.currencyCode != 'Currency Code' && this.selectForm.value.currencyCode != null){
        this.transactionsService.getTransactionsByCurrencyCode(this.selectForm.value.currencyCode)
        .subscribe(
            data => {
              this.listTransactions = data;
             
            },
            error => {
              this.toastrService.error('Error Transaction', 'Error getting Transactions');
            });
      }else {
        
        //check the input parameters, and if we don't choose any parameter we show a message
        this.toastrService.info('Info Transaction', 'Choose Options!!!');

        this.transactionsService.getTransactions()
        .subscribe(
            data => {
              this.listTransactions = data;
             
            },
            error => {
              this.toastrService.error('Error Transaction', 'Error getting Transactions');
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
              this.toastrService.error('Error Transaction', 'Error clearing Transactions');

            });


    }
   
      
}
      
  
