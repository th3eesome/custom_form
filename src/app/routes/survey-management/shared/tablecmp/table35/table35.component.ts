import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Question } from 'app/routes/survey-management/shared/question';
import { AnswerInterface } from 'app/routes/survey-management/shared/answerInterface';

@Component({
  selector: 'app-table35',
  templateUrl: './table35.component.html',
  styleUrls: ['./table35.component.css']
})


export class Table35Component extends Question implements AnswerInterface {

    /**
     * 存储答案的矩阵
     */
    localAnswer = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ];

    /**
     * 是否必填，如果是true，则必填
     */
    required = false;

    /**
     * 每行前面的checkbox
     */
    selected = [
        false, false, false, false, false
    ];  

    /**
     * 酒的种类
     */
    wineNames = [
        '啤酒', '高度白酒', '低度白酒', '葡萄酒/果酒', '黄酒/米酒'
    ];

    /**
     * 答案的校验结果,true为校验成功
     */
    answerChanged = false;


    constructor() {
        super();
    }

    /**
     * 有数据改变,执行校验
     */
    answerChange() {

        // 如果用户填写了输入框，但没有勾选，则帮助用户勾选
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 3; col++) { // 逐行检查
                if (this.localAnswer[row][col] !== undefined) // 至少有一个填写
                    this.selected[row] = true;
            }
        }

        const questionID = 'ID3_5';
        const res = [];

        for (let row = 0; row < 5; row ++) {  // 行
            for (let col = 0; col < 3; col++) {  // 列
                // 答案中的格式
                const item = {
                    Record_ID : '',
                    Record_Value: ''
                };
                // 答案id ,最够一项为了实现 a-e的序列
                item.Record_ID = questionID + '_' + (col + 1) + '_' + String.fromCharCode(row + 'a'.charCodeAt(0));  
                item.Record_Value = (this.localAnswer[row][col] === undefined) ? '' : this.localAnswer[row][col]; // 答案内容，如果没有填写，则改为空
                res.push(item);
            }
        }

        this.answer = res;

        console.log(res);

        if (this.required) {  // 如果表格必填
            if (this.answerCheck() === true) // 如果校验成功
                this.answerChanged = true;
            else 
                this.answerChanged = false;
        }else {  // 如果非必填
            this.answerChanged = true;
        }
    }


    /**
     * 表格数据校验函数，若成功，返回true
     */
    answerCheck() {
        // 本题只需校验checkbox勾选的一行，是否填写
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 3; col++) { // 逐行检查
                if (this.localAnswer[col][row] !== undefined) // 至少有一个填写
                    return true;
            }
        }
        return false;
    }

    /**
     * 外部调用，用来获取本例答案
     */
    getAnswer() {
        const answer = {
            available : this.answerChanged ? 'true' : 'false',
            answer : this.answer
        };
        return answer;
    }
}
