import {AfterViewInit, Component, OnInit, QueryList, ViewChildren, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '@core/services/http.service';
import {NzModalService} from 'ng-zorro-antd';

import {InputcmpComponent} from '../shared/inputcmp/inputcmp.component';
import {RadiocmpComponent} from '../shared/radiocmp/radiocmp.component';
import {IdccmpComponent} from '../shared/idccmp/idccmp.component';
import {QuestionList} from '../shared/ql';

@Component({
    selector: 'app-info0',
    templateUrl: './info0.component.html',
    styleUrls: ['./info0.component.less']
})
export class Info0Component implements OnInit, AfterViewInit  {
    @ViewChildren(InputcmpComponent) InputItems: QueryList<InputcmpComponent>;
    @ViewChildren(RadiocmpComponent) RadioItems: QueryList<RadiocmpComponent>;
    @ViewChildren(IdccmpComponent) IdcItems: QueryList<IdccmpComponent>;

    current = 0; // 当前步骤
    questions = new QuestionList().questions;
    questionSave = this.questions
    questionList = [];     // 问题总列表
    resultList = [];                                    // 填写结果
    PID = '';                                           // PID
    finished = false;
    answerList = [];
    buttondisable = false;
    fillingList = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: HttpService,
        private confirmServ: NzModalService,
        private ref: ChangeDetectorRef
    ) {
        this.PID = this.route.params['value']['PID'];
        if (this.PID) {
            const getRecord = {
                'PID': this.PID
            };
            this.service.getRecord(getRecord).subscribe( (res) => {
                const list = res.Records;
                this.answerList = list;
                for (let i = 0; i < list.length; i++) {
                    if ( list[i]['questionlist'] && list[i]['questionlist'] !== '') {
                        this.questionList = list[i]['questionlist'][this.current];
                        this.questionSave = list[i]['questionlist'];
                        break;
                    }
                }
            });
        } else {
            this.questionList = this.questions[this.current];
        }
    }
    ngOnInit() {

    }

    ngAfterViewInit() {
        if ( this.PID ) {
            this.fillingAllanswer();
        }
    }

    onVoted (showAndhidden: any) {
        for ( let i = 0; i <  showAndhidden.hiddenshowlist.length; i++) {
            for ( let j = 0; j < this.questionList.length; j++) {
                if ( this.questionList[j].id1 === showAndhidden.hiddenshowlist[i] ) {
                    this.questionList[j]['hidden'] = false;
                }
            }
        }
        for (let i = 0; i < showAndhidden.hiddenlist.length; i++) {
            for ( let j = 0; j < this.questionList.length; j++) {
                if ( this.questionList[j].id1 === showAndhidden.hiddenlist[i] ) {
                    this.questionList[j]['hidden'] = true;
                }
            }
        }
    }

    next() {
        // if (this.confirm().confirms) {
        this.collectAllanswer();
        let putRecord = {};
        if (!this.PID)  putRecord = { 'Records' : this.resultList };
        else putRecord = { 'PID': this.PID, 'Records' : this.resultList };
        this.service.putRecord(putRecord).subscribe( (res) => {
            this.PID = res.PID;
            this.router.navigate(['system/survey/info1/' + this.PID]); // 添加跳转
        }, err => {
            console.log(err);
        });
        // }else {
        //     let str = '';
        //     for ( let i = 0; i < this.confirm().confirmList.length; i++) {
        //         str = str + this.confirm().confirmList[i] + '、';
        //     }
        //     this.confirmServ.error({
        //         title: '您还有以下必填项没有完成： ',
        //         content: str
        //     });
        // }
    }

    confirm() {
        const confirmlist = [];                                   // 验证列表
        let confirms = true;
        this.InputItems.forEach(item => { if ( item.question.hidden === false && item.answerChanged === false) {
            confirms = false; confirmlist.push(item.question.id1);
        }});
        this.RadioItems.forEach(item => { if ( item.question.hidden === false && item.localAnswer === -1) {
            confirms = false; confirmlist.push(item.question.id1);
        }});
        this.IdcItems.forEach( item => { if ( item.question.hidden === false && item.answerChanged === false) {
            confirms = false; confirmlist.push(item.question.id1);
        }});
        const confirmAll = {
            confirms: confirms,
            confirmList: confirmlist
        } ;
        return confirmAll;
    }
    collectAllanswer() {
        this.RadioItems.forEach(item => {
            if (item.answerChanged === true) {
                for (let i = 0; i < item.answer.length; i++) {
                    this.resultList.push(item.answer[i]);
                }
            }
        });
        this.InputItems.forEach(item => {
            console.log(item);
            if (item.answerChanged === true) {
                for (let i = 0; i < item.answer.length; i++) {
                    this.resultList.push(item.answer[i]);
                }
            }
        });
        this.IdcItems.forEach(item => {
            if (item.answerChanged === true) { for ( let i = 0; i < item.answer.length; i++) { this.resultList.push(item.answer[i]); } }
        });

        this.questionSave[this.current] = this.questionList;
        this.resultList.push(
            {'Record_ID': 'questionlist', 'Record_Value': this.questionSave}
        );

        for (let i = 0; i < this.answerList.length; i++) {
            for (let j = 0; j < this.resultList.length; j++) {
                const id = this.resultList[j].Record_ID;
                if (this.answerList[i][id] || this.answerList[i][id] === 0) {
                    this.resultList[j]['Updated_time'] = this.answerList[i]['Updated_time'];
                }
            }
        }
        console.log(this.resultList);
    }

    disabledAll() {
        this.buttondisable = true;
        this.InputItems.forEach(item => {
            item.editdisabled = true;
        });
        this.RadioItems.forEach(item => {
            item.editdisabled = true;
        });
        this.IdcItems.forEach(item => {
            item.editdisabled = true;
        });
    }

    fillingAllanswer() {
        const getRecord = {
            'PID': this.PID
        };
        this.service.getRecord(getRecord).subscribe((res) => {

            this.fillingList = res.Records;
            this.InputItems.forEach(item => {
                for (let i = 0; i < this.fillingList.length; i++) {
                    const id = item.question.id2;
                    if (this.fillingList[i][id] && this.fillingList[i][id] !== '') {
                        item.localAnswer = this.fillingList[i][id];
                    }
                    if (this.fillingList[i][id] === 0) {
                        item.localAnswer = '0';
                    }
                }
            });

            this.IdcItems.forEach( item => { for (let i = 0; i < this.fillingList.length; i++) {
                if (this.fillingList[i]['Idnumber'] && this.fillingList[i]['Idnumber'] !== '') {
                    item.localAnswer = this.fillingList[i]['Idnumber']; }
            }});

            this.RadioItems.forEach(item => {
                for (let i = 0; i < this.fillingList.length; i++) {
                    const id = item.question.id2;
                    if (this.fillingList[i][id] && this.fillingList[i][id] !== '') {
                        item.localAnswer = this.fillingList[i][id] - 1;
                    }
                }
            });
        }, error => {
            console.log(error);
        });
    }

    temporary_deposit() {
        const allow = true;
        if (allow) {
            this.collectAllanswer();
            let putRecord = {};
            if (this.PID ) {
                putRecord = { 'Records' : this.resultList, 'PID' : this.PID };
            }else {
                putRecord = { 'Records' : this.resultList, 'PID' : '' };
            }
            this.service.putRecord(putRecord).subscribe( (res) => {
                this.router.navigate(['system/survey/detail/']);
            }, err => { });
        }else {
            this.confirmServ.error({
                title: '保存出错！',
                content: '如果您想退出，请点击退出按钮！'
            });
        }
    }

    exit() {                                            // 退出
        this.router.navigate( ['system/survey/detail/']);
    }

}