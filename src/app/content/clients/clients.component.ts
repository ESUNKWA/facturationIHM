import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss',]
})
export class ClientsComponent implements OnInit {
  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  filterData;

  data: any[];
  modalTitle: string;
  formDetailsClient = this.fb.group({
    p_nom: [],
    p_prenoms: [],
    p_phone: [],
    p_email: [],
    p_description: [],
  });
  detailsClient: any = {};
  userInfos: any;
  chargementEncours: any = {};
  selectedLevel: number;
  partenaires: any = [];

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  date1: any;
  date2: any;
  date3: any;
  date4: any;
  hoveredDate: NgbDate | null = null;
  today: any;
  myDate = new Date();
  dataRetour: any;
  data2: any[];
  r_nom: any;

  constructor( private clientServices: ClientsService, private excelService: ExcelService, private fb: FormBuilder,
    private modalService: NgbModal, public formatter: NgbDateParserFormatter, private calendar: NgbCalendar,
    private infosUtilisateur: UserInfosService) {
      this.fromDate = calendar.getToday();
                this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

  ngOnInit() {
    this.today = this.myDate.getFullYear()+'-'+ (this.myDate.getMonth() + 1) + '-'+ this.myDate.getDate();
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
    this.listeClient(this.userInfos.r_partenaire, this.today, this.today);
  }

  Search(){
    if(this.r_nom == ""){
      this.data = this.data2;
    }else{
      
      this.data = this.data.filter(res=>{   
        if( res.r_nom !== null ){
          return res.r_nom.toLocaleLowerCase().match(this.r_nom.toLocaleLowerCase());
        }
      })
    }
  }

  listeClient(idpart, datedebut, datefin){
    this.chargementEncours = true;
    this.clientServices.fs_listeClient(idpart, datedebut, datefin).subscribe(
      ( res: any = {} ) => {
        this.data = res.result;
        this.data2 = res.result;
        this.dataRetour = ( res.status === 1 )? 1 : 0;
        setTimeout(() => {
          this.chargementEncours = false;
        }, 1000);
      }
    );
  }

  showDetailsClient(detailsClient: any, mode: string){
    this.detailsClient = detailsClient;
    this.modalTitle = `Signalitique du client [ ${detailsClient.r_nom} ${detailsClient.r_prenoms} ]`;
    ( mode.toString() == 'consult' )? this.formDetailsClient.disable() : null;

  }

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {

    }).catch((res) => {});
  }

  //Eportation au format excel
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'liste_clients');
  }

  //   Datepicker select période
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      const datefin = ( this.toDate.day < 10 )? '0'+this.toDate.day : this.toDate.day;
      this.date2 = `${this.toDate.year}-${this.toDate.month}-${datefin}`;
    } else {
      this.toDate = null;
      this.fromDate = date;
      const datedebut = ( this.fromDate.day < 10 )? '0'+this.fromDate.day : this.fromDate.day;
      this.date1 = `${this.fromDate.year}-${this.fromDate.month}-${datedebut}`;

    }
    this.date3 = this.date1;
    this.date4 = this.date2;
    if( this.userInfos.r_profil !== 4 ){
        ( this.date1 !== undefined && this.date2 !== undefined )? this.listeClient(this.userInfos.r_partenaire, this.date1, this.date2) : null;
    }else{
       ( this.date1 !== undefined && this.date2 !== undefined )? this.listeClient(this.selectedLevel, this.date1, this.date2) : null;
    }

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  //   Datepicker select période Fin



}
