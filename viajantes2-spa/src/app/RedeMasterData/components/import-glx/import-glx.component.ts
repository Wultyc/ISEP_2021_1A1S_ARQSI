import { Component, OnInit } from '@angular/core';
import { ImportGLXService } from '../../services/import-glx.service';
import {HttpClient, HttpParams, HttpResponse, HttpEventType} from '@angular/common/http';
@Component({
  selector: 'app-import-glx',
  templateUrl: './import-glx.component.html',
  styleUrls: ['./import-glx.component.css']
})
export class ImportGLXComponent implements OnInit {
  selectedFiles?: any;
  constructor(
    private importGLXService: ImportGLXService,
  ) { }

  ngOnInit(): void {
  
  }
  // onDropFile(event: DragEvent) {
  //   event.preventDefault();
  //   this.uploadFile(event.dataTransfer.files);
  // }

  // At the drag drop area
  // (dragover)="onDragOverFile($event)"
  onDragOverFile(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  // At the file input element
  // (change)="selectFile($event)"
  selectFile(event: any) {
    
    this.uploadFile(event.target.files);
    
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return

    }
    let file: File = files[0];
    this.importGLXService.uploadFile(file)
      .subscribe(
        event => {
          if (!!event){
          if (event.type == HttpEventType.UploadProgress) {
            // const percentDone = Math.round(100 * event.loaded / event.total);
            // console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        }
        },
        (err) => {
          console.log("Upload Error:", err);
        }, () => {
          console.log("Upload done");
        }
      )
}
}
