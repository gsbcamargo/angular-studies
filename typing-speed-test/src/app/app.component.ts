import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { random } from 'faker';
import { Subscription, timer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public randomText: string = this.randomSentenceGenerator();
  public enteredText: string = '';
  public solved: boolean = false;
  public message: string = 'Time\'s up!';

  randomSentenceGenerator(): string {
    let wordArray: Array<string> = [];

    for (let i = 0; i < 8; i++) {
      let newRandomWord = '';
      newRandomWord = random.word();
      wordArray.push(newRandomWord);
    }
    return wordArray.join(' ').toLowerCase();
  }

  onInput(value: string) {
    this.enteredText = value;
  }

  compare(randomLetter: string, enteredLetter: string) {
    if (!enteredLetter) {
      return 'pending';
    }

    return randomLetter === enteredLetter ? 'correct' : 'incorrect';
  }

  countDown: Subscription | null = new Subscription;
  timeLeft = 4;
  tick = 1000;
  ngOnInit() {
    this.countDown = timer(0, this.tick).subscribe(() => --this.timeLeft);
  }
  ngOnDestroy() {
    this.countDown = null;
  }

}











  // onTypeEventCheckIfEqualToText(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   const stringifiedEvent = target.toString();
  //   let typedArray: Array<string> = [];


  //   this.randomSentence.split(' ').forEach(element => {
  //     if(stringifiedEvent !== element) {
  //       element.style.color = "red";
  //     } else {
  //       element.style.color = "green";
  //     }
  //   });
  // }


  // randomWords(words: number): string {
  //   let fs = require('fs');
  //   let readMe = fs.readFile('typing-speed-test/src/assets/words.txt', 'utf-8');
  //   let wordArray = readMe.split('\n')

  //   let randomWords: any = [];
  //   for (let i = 0; i < 8; i++) {
  //     let newRandom = '';
  //     do {
  //       let randomize = Math.floor(Math.random() * wordArray.length);
  //       newRandom = wordArray[randomize]
  //     }
  //     while (randomWords.includes(newRandom));
  //     randomWords.push(newRandom);
  //   }
  //   return randomWords.join(' ');
  // }

  // ok just found out that require fs doesn't work in browsers cuz browsers are sandboxed 
  // so I'm using random-words module ffs (nvm this is using 'require' as well)
  // i gave up, now i'm using faker


  // randomWords(numberOfWords: number) {
  //   let randomWords = require('random-words')
  //   let wordArray = []
  //   for (let i = 0; i < numberOfWords; i ++) {
  //     wordArray = randomWords.join(' ');
  //   }
  // }