import { Component, ViewChild } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-actions-projects',
  templateUrl: './actions-projects.component.html',
  styleUrls: ['./actions-projects.component.scss']
})
export class ActionsProjectsComponent {

  @ViewChild('project') project: ModalDirective

  p: number = 1;
  projects: { title: string, titleHindi: string, content: string, contentHindi: string, cover_image: string, stories: { image: string, content: string, content_hindi: string }[] }[];
  modalData: any;

  constructor(
    public authService: AuthorizationService
  ) {
    this.getProjects();
  }

  getProjects() {
    this.authService.getReq('actions_projects').subscribe((the_projects: any[]) => {
      this.projects = the_projects.map((project: any) => {
        return {
          title: project.acf.title,
          titleHindi: project.acf.title_hindi,
          content: project.acf.introduction,
          contentHindi: project.acf.introduction_hindi,
          cover_image: project.acf.cover_picture,
          stories: project.acf.stories
        }
      })
    })
  }

  triggerProject(input: any) {
    if (input.stories && input.stories.length) {
      this.modalData = input;
      this.project.show();
    }
  }

}
