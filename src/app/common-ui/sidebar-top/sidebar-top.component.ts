import {Component, inject, Input, OnInit} from "@angular/core";
import {Location, NgClass} from '@angular/common';
import {Store} from '@ngrx/store';
import {selectIsView} from '../../+store/app.selectors';
import {filterView} from '../../+store/app.actions';
import {toSignal} from '@angular/core/rxjs-interop';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';

@Component({
    selector: "app-sidebar-top",
    standalone: true,
    templateUrl: "./sidebar-top.component.html",
    styleUrl: "./sidebar-top.component.scss",
    imports: [
        ImgUrlPipe,
        SvgIconComponent,
        NgClass
    ]
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
