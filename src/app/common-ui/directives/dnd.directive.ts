import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dnd]'
})
export class DndDirective {
  @Output() fileDropped = new EventEmitter<File>();

  @HostBinding('class.fileover')
  fileover =false

 @HostListener('dragover',['$event'])
 onDragOver(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
  this.fileover = true;

  console.log(event.target);
  
 }

  @HostListener('dragleave',['$event'])
  onDragLeave(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();

  console.log(event.target);
  this.fileover = true;
 }

  @HostListener('drop',['$event'])
  onDrop(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();

  console.log(event.target);
  this.fileover = false;
  this.fileDropped.emit(event.dataTransfer?.files[0]);
 }

}
