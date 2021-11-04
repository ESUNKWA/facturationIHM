import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie/categorie.service';
import { ModalService } from 'src/app/services/modal/modal.service';
//import Swal from 'sweetalert2';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  //Datatable variables
  public rowsOnPage = 5;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  ////////////
  dataRetour: any = {};
  data: any[];

  modalTitle: string;

  detailsCategories: any = {};

  categorieData = this.fb.group({
    r_libelle: ['', Validators.required],
    p_description: []
  });

  registerBtnEtat: boolean = false;

  constructor( private categorieServices: CategorieService, private http: HttpClient,
                private fb: FormBuilder, private swalServices: ModalService ) {

                }

  ngOnInit() {

    this.list_categorie();
  }

  list_categorie(){
    this.categorieServices.fs_listCategorie().subscribe(
      (res) => {
        this.dataRetour = res,
        this.data = this.dataRetour.result;
      },
      (err) => console.log(err),
    );
  }

  fc_add_categorie(): void {
    this.categorieData.reset();
    this.categorieData.enable();
    this.modalTitle = 'Saisir une nouvelle catégorie';
    this.registerBtnEtat = false;
  }

  fc_details_categorie(data: any = {}, mode){
    this.modalTitle = `Modification de la catégorie [ ${data.r_libelle} ]`;
    this.detailsCategories = data;
    switch( mode ){
      case 1://Modification
        this.categorieData.enable();
        this.registerBtnEtat = false;
        break;

      case 2://Consultation
        this.categorieData.disable();
        this.registerBtnEtat = true;
        break;

      default:
        break;
    }


  }


  registerCategorie(){

    //Controlle des champs
    if( this.categorieData.value.r_libelle === '' ){
      this.swalServices.fs_modal('Le libellé est réquis','warning');
      return;
    }

    //Envoie vers le serveur api
    this.categorieServices.fs_saisieCategorie(this.categorieData.value).subscribe(
      (res: any = {}) =>{
        if( res.status === 1){
          this.list_categorie();
          this.categorieData.reset();
          this.swalServices.fs_modal(res.result, 'success');
        }else{
          this.swalServices.fs_modal(res.r_libelle, 'error');
        }

      },
      (error) =>{
        this.swalServices.fs_modal(error, 'error');
      }
    );


  }


}
