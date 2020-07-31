import { Component } from '@angular/core';
import { PropertyGuiService } from './shared/propertygui.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Parameter Pusher GUI';
}
