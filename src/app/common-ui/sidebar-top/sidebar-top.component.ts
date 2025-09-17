import {Component, inject, Input, OnInit} from "@angular/core";
import { Location } from '@angular/common';
import {Store} from '@ngrx/store';
import {selectIsView} from '../../+store/app.selectors';
import {filterView} from '../../+store/app.actions';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
    selector: "app-sidebar-top",
    standalone: true,
    templateUrl: "./sidebar-top.component.html",
    styleUrl: "./sidebar-top.component.scss",
})
export class SidebarTopComponent implements OnInit {

    constructor(private location: Location) {}
    store = inject(Store);
    @Input() description: string = '';
    @Input() filter: boolean = false;

    showPopover = false;

    isView = toSignal(this.store.select(selectIsView));


    ngOnInit() {}

    togglePopover() {
        this.showPopover = !this.showPopover;
    }

    toggleFilter() {
        this.store.dispatch(filterView({ isView: !this.isView() }));
    }

    applyFilter(filter: string) {
        console.log('Выбран фильтр:', filter);
        this.showPopover = false;
    }

    goBack() {
        this.location.back();
    }
}
