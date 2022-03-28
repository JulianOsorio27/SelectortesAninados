import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interface/paises';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this._fb.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]],
  });

  // Llenar selectores

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  //UI

  cargando: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _ps: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this._ps.regiones;

    // Cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe( region => {

    //     this._ps.getPaisesPorRegion( region ).subscribe( paises =>{
    //      this.paises = paises;
    //     } )

    //   } )

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap(region => this._ps.getPaisesPorRegion(region))
      )
      .subscribe(paises => {
        this.paises = paises;
        this.cargando=false;
      })


    // cuando cambia el pais
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap((_) => {
        
          this.miFormulario.get('frontera')?.reset('');
          this.cargando=true;
        }),
        switchMap(codigo => this._ps.getPaisFrontera(codigo))
      )
      .subscribe(pais => {
        if (!pais) {
          return;
        } else if (pais)
          this.fronteras = pais[0].borders || [];
          this.cargando=false;
      });

  }


  guardar() {
    console.log(this.miFormulario.value);
  }




}
