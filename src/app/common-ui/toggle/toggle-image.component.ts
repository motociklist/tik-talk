import { Component, signal, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-toggle-image",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./toggle-image.component.html",
    styleUrls: ["./toggle-image.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleImageComponent {
    isSecondImage = signal(false);
    valueToggle: boolean = false;
    @Output() toggled = new EventEmitter<boolean>();

    toggle() {
        this.isSecondImage.update(v => {
            this.valueToggle = !v;
            this.toggled.emit(this.valueToggle);
            return this.valueToggle;
        });
    }
}
