/**
 *  input radio idc phone checkbox date
 */
import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, PreloadingStrategy, Params} from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '@core/services/http.service';

import { InputcmpComponent } from '../shared/inputcmp/inputcmp.component';
import { RadiocmpComponent } from '../shared/radiocmp/radiocmp.component';
import { CheckboxcmpComponent} from '../shared/checkboxcmp/checkboxcmp.component';


import { QuestionList } from '../shared/questionList';
import { ScheduleList } from '../shared/scheduleList';

@Component({
    selector: 'app-tenth-step',
    templateUrl: './tenth-step.component.html',
    styleUrls: ['./tenth-step.component.css']
})

export class TenthStepComponent implements OnInit, AfterViewInit {
    @ViewChildren(InputcmpComponent) InputItems: QueryList<InputcmpComponent>;
    @ViewChildren(RadiocmpComponent) RadioItems: QueryList<RadiocmpComponent>;
    @ViewChildren(CheckboxcmpComponent) CheckboxItems: QueryList<CheckboxcmpComponent>;

    current = 9;                                        // 当前步骤
    questionList = new QuestionList().questions[this.current];     // 问题总列表
    schedule_list =  new ScheduleList().schedule_list;  // 步骤列表
    resultList = [];                                    // 填写结果
    PID = '';
    finished = false;
    answerList = [];
    sex = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: HttpService,
        private confirmServ: NzModalService
    ) {}

    ngOnInit() {
        this.PID = this.route.params['value']['PID'];
    }
    ngAfterViewInit() {
        const getRecord = {
            'PID': this.PID,
            'RecordID': 'ID1'
        };
        this.service.getRecord(getRecord).subscribe( (res) => {
            console.log(res);
            res.Records.forEach( it => {
                console.log('sex######################');
                if (it['ID1_3_1'] === 'True' ) {  console.log('sssss'); this.sex  = true; }

            });
        });
        this.fillingAllanswer();
    }
    pre() {                                            // 上一步
        this.collectAllanswer();
        const putRecord = { 'PID': this.PID, 'Records' : this.resultList };
        this.service.putRecord(putRecord).subscribe( (res) => {
            if ( this.sex === true) {
                this.router.navigate(['/survey/eighth_step/' + this.PID]);
            }else {
                this.router.navigate(['/survey/ninth_step/' + this.PID]);
            }
        }, error => { });

    }
    submit() {                                         // 暂存
        if ( this.confirm().confirms ) {
            this.collectAllanswer();
            const putRecord = { 'Records': this.resultList, 'PID': this.PID};
            this.service.putRecord(putRecord).subscribe( (res) => {
                console.log(res);
                this.router.navigate(['/survey/detail/']);
            }, error => {
                console.log(error);
            });
        }else {
            let str = '';
            for ( let i = 0; i < this.confirm().confirmList.length; i++) {
                str = str + this.confirm().confirmList[i] + '、';
            }
            this.confirmServ.error({
                title: '您还有以下必填项没有完成： ',
                content: str
            });
        }
    }

    /**
     *  点击steps上的按钮，进行步骤跳跃
     */
    jumpTo(step_index) {
        const numWords = ['first', 'second', 'third', 'forth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
        if (this.PID) { // 如果有病人编号，则跳跃
            console.log(step_index);
            this.router.navigate(['/survey/' + numWords[step_index] + '_step/' + this.PID]);  // 拼接跳转链接
        }
        
    }
    

    exit() {                                            // 退出
        this.router.navigate(['/survey/detail/']);
    }
    confirm() {
        const confirmlist = [];
        let confirms = true;
        this.InputItems.forEach(item => { if (item.answerChanged === false) { confirms = false; confirmlist.push(item.question.id);
        }});
        this.RadioItems.forEach(item => { if (item.localAnswer === -1) { confirms = false; confirmlist.push(item.question.id);
        }});
        this.CheckboxItems.forEach(item => { if ( !item.localAnswer) { confirms = false; confirmlist.push(item.question.id);
        }});
        const confirmAll =  {
            confirms: confirms,
            confirmList: confirmlist
        };
        return confirmAll;
    }
    collectAllanswer () {

        this.RadioItems.forEach(item => {
            if (item.answerChanged === true) { for ( let i = 0; i < item.answer.length; i++) { this.resultList.push(item.answer[i]); } }
        });
        this.InputItems.forEach(item => {
            if (item.answerChanged === true) { for ( let i = 0; i < item.answer.length; i++) { this.resultList.push(item.answer[i]); } }
        });
        this.CheckboxItems.forEach(item => {
            if (item.answerChanged === true) { for ( let i = 0; i < item.answer.length; i++) { this.resultList.push(item.answer[i]); } }
        });

        if (this.confirm().confirms)
            this.resultList.push(
                {'Record_ID': 'ID0_4', 'Record_Value': this.getNowdate()},
                {'Record_ID': 'ID10', 'Record_Value': 'finished'},
                {'Record_ID': 'ID0_2', 'Record_Value': '已完成'});
        else {
            this.resultList.push(
                {'Record_ID': 'ID0_4', 'Record_Value': this.getNowdate()},
                {'Record_ID': 'ID10', 'Record_Value': ''},
                {'Record_ID': 'ID0_2', 'Record_Value': '未完成'});
        }
        for ( let i = 0; i < this.answerList.length; i ++) {
            for ( let j = 0; j < this.resultList.length; j++) {
                const id = this.resultList[j].Record_ID;
                if (this.answerList[i][id]) {
                    this.resultList[j]['Updated_time'] = this.answerList[i]['Updated_time'];
                }
            }
        }
    }
    fillingAllanswer() {
        const getRecord = {
            'PID': this.PID,
            'RecordID': 'ID10'
        };
        this.service.getRecord(getRecord).subscribe( (res) => {
            const fillingList = res.Records;
            this.answerList = fillingList;
            fillingList.forEach( it => { if ( it['ID10'] && it['ID10'] === 'finished') this.finished = true;
            });
            console.log(fillingList);
            this.InputItems.forEach( item => { fillingList.forEach( it => {
                let id = '';
                id = this.getTransid( item.question.id );
                if ( it[id] && it[id] !== '') {  item.localAnswer[0] = it[id]; }});
            });
            this.RadioItems.forEach( item => {
                for ( let i = 0; i < fillingList.length; i++) {
                    for ( let j = 1 ; j <= item.question.content.length; j++) {
                        const id = this.getTransid(item.question.id) + '_' + j;
                        if ( fillingList[i][id] && fillingList[i][id] !== '') {
                            const nums = id.split('_');
                            item.localAnswer = Number.parseInt( nums[nums.length - 1]) - 1 ;
                        }
                    }
                }
            });
            this.CheckboxItems.forEach( item => { for ( let i = 0; i < fillingList.length; i++) {
                for ( let j = 1; j <= item.question.content.length; j++ ) {
                    const id = this.getTransid(item.question.id) + '_' + j;
                    if ( fillingList[i][id] && fillingList[i][id] !== '') {
                        const nums = id.split('_');
                        item.localAnswer[Number.parseInt (nums[nums.length - 1]) - 1] = true;
                    }
                }
            }});
        }, error => {
            console.log(error);
        });

    }
    getNowdate() {
        const date = new Date();
        let str = '';
        str = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日' + date.getHours() + '时'
            + date.getMinutes() + '分';
        return str;
    }
    getTransid(str: string) {
        let id = 'ID';
        id = id + str.replace(/\./g, '_');
        return id;
    }

}
