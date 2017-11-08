import { Component, OnInit } from '@angular/core';

import { Question } from '../question';

import { AnswerInterface } from '../answerInterface';
@Component({
  selector: 'app-radiocmp',
  templateUrl: './radiocmp.component.html',
  styleUrls: ['./radiocmp.component.less']
})
export class RadiocmpComponent extends Question implements AnswerInterface {
  localAnswer = new Array(20); // 存储答案的变量数组

  constructor() { 
    super();
  }

  answerChange() {
    console.log(this.localAnswer);
  }

  getAnswer() {
    return this.localAnswer;
  }
}
