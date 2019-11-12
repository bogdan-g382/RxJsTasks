import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common/'
import { Subject, timer, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Themes } from './Enums/themes';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Test-Rxjs';

  private mainGenerator: Subject<number> = new Subject<number>();;
  private numbers: Number[] = [];

  public displayedNumbers: Number[] = [];

  private searchingMessage = "";

  public themesRadioForm: FormGroup;
  private currentTheme: Subject<Themes> = new Subject<Themes>();;

  private messages = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  private sameMessages = [];
  constructor(private formBuilder: FormBuilder) {

    this.mainGenerator.subscribe((num) => {
      this.numbers.push(num);
    })
    this.startMainGenerator();

    timer(2000, 2000).subscribe(() => {
      this.displayedNumbers = this.numbers.splice(0);
    });
  }

  ngOnInit() {
    this.themesRadioForm = this.formBuilder.group({
      'theme': 1
    });

    this.currentTheme.subscribe((newTheme) => {
      let themeValue = Number.parseInt(newTheme.toString());
      this.updateTheme(themeValue);
    });

    this.themesRadioForm.valueChanges.subscribe((value) => {
      this.currentTheme.next(value["theme"]);
    });
  }

  private updateTheme(newTheme: Themes) {
    switch (newTheme) {
      case Themes.Day:
        this.setDayTheme();
        break;
      case Themes.Night:
        this.setNightTheme();
        break
      case Themes.Colorful:
        this.setColorfulTheme();
        break;
    }
  }

  private setDayTheme() {
    let backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--day-background-color");
    let color = getComputedStyle(document.documentElement).getPropertyValue("--day-color");
    let fontFamily=getComputedStyle(document.documentElement).getPropertyValue("--day-font-family");

    document.documentElement.style.setProperty("--using-background-color", backgroundColor);
    document.documentElement.style.setProperty("--using-color", color);
    document.documentElement.style.setProperty("--using-font-family",fontFamily);
  }


  private setNightTheme() {
    let backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--night-background-color');
    let color = getComputedStyle(document.documentElement).getPropertyValue("--night-color");
    let fontFamily=getComputedStyle(document.documentElement).getPropertyValue("--night-font-family");

    document.documentElement.style.setProperty("--using-background-color", backgroundColor);
    document.documentElement.style.setProperty("--using-color", color);
    document.documentElement.style.setProperty("--using-font-family",fontFamily);
  }


  private setColorfulTheme() {
    let backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--colorful-background-color");
    let color = getComputedStyle(document.documentElement).getPropertyValue("--colorful-color");
    let fontFamily=getComputedStyle(document.documentElement).getPropertyValue("--colorful-font-family");

    document.documentElement.style.setProperty("--using-background-color", backgroundColor);
    document.documentElement.style.setProperty("--using-color", color);
    document.documentElement.style.setProperty("--using-font-family",fontFamily);
  }



  private startMainGenerator() {
    timer(0, 500).subscribe(() => {
      this.mainGenerator.next(Math.random() * 100);
    });
  }

  private messageTyping(typeingEvent) {
    this.searchingMessage = typeingEvent.srcElement.value;
    debugger
  }

  public getSameMessages() {
    return this.messages.filter(mess => mess.includes(this.searchingMessage));
  }

}
