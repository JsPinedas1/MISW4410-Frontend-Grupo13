import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Compra } from '../compra'
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-compra',
  templateUrl: './menu-compra.component.html',
  styleUrls: ['./menu-compra.component.css']
})
export class MenuCompraComponent implements OnInit {
  idMenu: number;
  compras: Compra[];

  constructor(
    private router: ActivatedRoute,
    private menuService: MenuService) { }

  ngOnInit() {
    this.idMenu = parseInt(this.router.snapshot.params['id']);
    this.menuService.consultarCompras(1).subscribe({
      next: (compras) => {
        this.compras = compras
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
