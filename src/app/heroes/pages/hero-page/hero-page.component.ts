import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroesService } from '../../services/heroes.service';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  constructor(
    private readonly heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(  ({ id }) => this.heroesService.getHeroById( id ) ),
      ).subscribe( hero => {

          if( !hero ) return this.router.navigate(['/heroes/list']); // no existe y vuelve a la lista de heroes

          this.hero = hero;
          return;
        })
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list');
  }
}
