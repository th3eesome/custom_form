export class SaveList {
    step_key = ['step_one', 'step_two'];
    questions = {
        'step_one': {
            'name': 'step_one',
            'items': [
                {
                    'webId':  '1',
                    'dbId': 'name',
                    'type': 'input',
                    'front_title': '这是number类型',
                    'behind_title': '',
                    'validtype': 'number',
                    'validcondition': {
                        'min': 0,
                        'max': 60
                    },
                    'length': '',
                    'required': true,
                    'hiddenlist': [],
                    'hiddencondition': [],
                    'hidden': false
                },
                {
                    'webId':  '2',
                    'dbId': 'name',
                    'type': 'input',
                    'front_title': '这是len_number类型',
                    'behind_title': '',
                    'validtype': 'len_number',
                    'validcondition': {
                        'length': 12
                    },
                    'length': '',
                    'required': true,
                    'hiddenlist': [],
                    'hiddencondition': [],
                    'hidden': false
                },
                {
                    'webId':  '3',
                    'dbId': 'name',
                    'type': 'input',
                    'front_title': '这是text类型',
                    'behind_title': '',
                    'validtype': 'text',
                    'validcondition': {

                    },
                    'length': '',
                    'required': true,
                    'hiddenlist': [],
                    'hiddencondition': [],
                    'hidden': false
                },
                {
                    'webId':  '4',
                    'dbId': 'name',
                    'type': 'input',
                    'front_title': '这是len_text类型',
                    'behind_title': '',
                    'validtype': 'len_text',
                    'validcondition': {
                        'length': 12
                    },
                    'length': '',
                    'required': true,
                    'hiddenlist': [],
                    'hiddencondition': [],
                    'hidden': false
                },
                {
                    'webId': '5',
                    'dbId': 'sex',
                    'type': 'radio',
                    'front_title': '性别',
                    'behind_title': '',
                    'required': true,
                    'content': [
                        '男', '女'
                    ],
                    'hiddenlist': [
                        ['6'],
                        ['3']
                    ],
                    'hidden': false
                },
                {
                    'webId': '6',
                    'dbId': 'diagnose',
                    'type': 'checkbox',
                    'front_title': '是否有过以下疾病',
                    'behind_title': '',
                    'required': true,
                    'content': [
                        '心脏病', '糖尿病', '癌症', '脑炎'
                    ],
                    'hiddenlist': [
                        ['5'],
                        ['1'],
                        ['3'],
                        ['2']
                    ],
                    'hidden': false
                },
                {
                    'webId': '7',
                    'dbId': 'birthday',
                    'type': 'date',
                    'front_title': '出生日期',
                    'behind_title': '',
                    'required': true,
                    'hidden': false
                },
                {
                    'dbId': '',
                    'webId': '5.5.1',
                    'title': '血常规',
                    'hidden': false,
                    'type': 'high-table',
                    'rowTitle': ['第一次', '第二次', '第三次', '第四次', '第五次', '第六次', '第七次', '第八次', '第九次', '第十次'],
                    'columnTitle': ['RBC', 'WBC', 'Hb', 'PLT109/', 'NEUT', 'NEUT%', 'LYMPH', 'LYMPH%', 'MONO', 'MONO%'],
                    'id_title': 'xcg',
                    'table_type': 'mix',
                    'radio_setting': {
                        'direction': 'column',
                        'index': [ 1, 2, 4 ],
                        'options': [{value: '1', display_value: '是'}, {value: '2', display_value: '否'}, {value: '3', display_value: '不明'}]
                    },
                    'overall': false
                },
            ]
        },
        'step_two': {
            'name': 'step_two',
            'items': [
                {
                    'webId':  '1',
                    'dbId': 'name',
                    'type': 'input',
                    'front_title': '这是number类型',
                    'behind_title': '',
                    'validtype': 'number',
                    'validcondition': {
                        'min': 0,
                        'max': 60
                    },
                    'length': '',
                    'required': true,
                    'hiddenlist': [],
                    'hiddencondition': [],
                    'hidden': false
                },
                {
                    'webId':  '2',
                    'dbId': 'name',
                    'type': 'input',
                    'front_title': '这是len_number类型',
                    'behind_title': '',
                    'validtype': 'len_number',
                    'validcondition': {
                        'length': 12
                    },
                    'length': '',
                    'required': true,
                    'hiddenlist': [],
                    'hiddencondition': [],
                    'hidden': false
                },
                {
                    'webId':  '3',
                    'dbId': 'name',
                    'type': 'input',
                    'front_title': '这是text类型',
                    'behind_title': '',
                    'validtype': 'text',
                    'validcondition': {

                    },
                    'length': '',
                    'required': true,
                    'hiddenlist': [],
                    'hiddencondition': [],
                    'hidden': false
                },
                {
                    'webId':  '4',
                    'dbId': 'name',
                    'type': 'input',
                    'front_title': '这是len_text类型',
                    'behind_title': '',
                    'validtype': 'len_text',
                    'validcondition': {
                        'length': 12
                    },
                    'length': '',
                    'required': true,
                    'hiddenlist': [],
                    'hiddencondition': [],
                    'hidden': false
                },
                {
                    'webId': '5',
                    'dbId': 'sex',
                    'type': 'radio',
                    'front_title': '性别',
                    'behind_title': '',
                    'required': true,
                    'content': [
                        '男', '母'
                    ],
                    'hiddenlist': [
                        ['6'],
                        ['3']
                    ],
                    'hidden': false
                },
                {
                    'webId': '6',
                    'dbId': 'sex',
                    'type': 'addr',
                    'front_title': '联系人地址',
                    'behind_title': '',
                    'required': true,
                    'content': [
                        '男', '母'
                    ],
                    'hidden': false
                },
                {
                    'webId': '7',
                    'dbId': 'ID_number',
                    'type': 'idc',
                    'front_title': '身份证',
                    'behind_title': '',
                    'required': true,
                    'hidden': false
                }
            ]
        }
    };

}

// 前端每次取出item,创建一个副本,只负责显示,在用户收集完内容后,将hidden的状态和内容传递到后端，后端存储的是 step_name, 内容, 是否显示
