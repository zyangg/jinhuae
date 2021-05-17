// 'use strict';
// const CryptoJS = require('crypto-js');
// const rp = require('request-promise');
// const log = require('log4node');
// const fs = require('fs');
// const path = require('path');

// // 系统配置
// const config = {
//   // 请求地址
//   hostUrl: 'http://raasr.xfyun.cn/api/',
//   // 在控制台-我的应用-语音转写获取
//   appId: '5f9b87a7',
//   // 在控制台-我的应用-语音转写获取
//   secretKey: '159dbeb2bcf251be5456b02ad9281e9e',
//   // 音频文件地址
//   filePath: './mp3/aaa.mp3',
// };

// // 请求的接口名
// const api = {
//   prepare: 'prepare',
//   upload: 'upload',
//   merge: 'merge',
//   getProgress: 'getProgress',
//   getResult: 'getResult',
// };

// // 文件分片大小 10M
// const FILE_PIECE_SICE = 10485760;

// // ——————————————————转写可配置参数————————————————
// // 参数可在官网界面（https://doc.xfyun.cn/rest_api/%E8%AF%AD%E9%9F%B3%E8%BD%AC%E5%86%99.html）查看，根据需求可自行在gene_params方法里添加修改
// // 转写类型
// // const lfasr_type = 0;
// // // 是否开启分词
// // const has_participle = 'false';
// // const has_seperate = 'true';
// // // 多候选词个数
// // const max_alternatives = 0;

// // 鉴权签名
// function getSigna(ts) {
//   const md5 = CryptoJS.MD5(config.appId + ts).toString();
//   const sha1 = CryptoJS.HmacSHA1(md5, config.secretKey);
//   const signa = CryptoJS.enc.Base64.stringify(sha1);
//   return signa;
// }

// // slice_id 生成器
// class SliceIdGenerator {
//   constructor() {
//     this.__ch = 'aaaaaaaaa`';
//   }

//   getNextSliceId() {
//     let ch = this.__ch;
//     let i = ch.length - 1;
//     while (i >= 0) {
//       const ci = ch[i];
//       if (ci !== 'z') {
//         ch = ch.slice(0, i) + String.fromCharCode(ci.charCodeAt(0) + 1) + ch.slice(i + 1);
//         break;
//       } else {
//         ch = ch.slice(0, i) + 'a' + ch.slice(i + 1);
//         i--;
//       }
//     }
//     this.__ch = ch;
//     return this.__ch;
//   }
// }

// class RequestApi {
//   constructor({ appId, filePath }) {
//     this.appId = appId;
//     this.filePath = filePath;
//     this.fileLen = fs.statSync(this.filePath).size;
//     this.fileName = path.basename(this.filePath);
//   }

//   geneParams(apiName, taskId, sliceId) {
//     // 获取当前时间戳
//     const ts = parseInt(new Date().getTime() / 1000);

//     const { appId, fileLen, fileName } = this,
//       signa = getSigna(ts),
//       paramDict = {
//         app_id: appId,
//         signa,
//         ts,
//       };

//     switch (apiName) {
//       case api.prepare:
//         {
//           const sliceNum = Math.ceil(fileLen / FILE_PIECE_SICE);
//           paramDict.file_len = fileLen;
//           paramDict.file_name = fileName;
//           paramDict.slice_num = sliceNum;
//         }
//         break;
//       case api.upload:
//         paramDict.task_id = taskId;
//         paramDict.slice_id = sliceId;
//         break;
//       case api.merge:
//         paramDict.task_id = taskId;
//         paramDict.file_name = fileName;
//         break;
//       case api.getProgress:
//       case api.getResult:
//         paramDict.task_id = taskId;
//         break;
//       default: break;
//     }

//     return paramDict;
//   }

//   async geneRequest(apiName, data, file) {
//     let options;
//     if (file) {
//       options = {
//         method: 'POST',
//         uri: config.hostUrl + apiName,
//         formData: {
//           ...data,
//           content: file,
//         },
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       };

//     } else {
//       options = {
//         method: 'POST',
//         uri: config.hostUrl + apiName,
//         form: data,
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//         },
//       };
//     }

//     try {
//       let res = await rp(options);
//       res = JSON.parse(res);

//       if (res.ok == 0) {
//         log.info(apiName + ' success ' + JSON.stringify(res));
//       } else {
//         log.error(apiName + ' error ' + JSON.stringify(res));
//       }

//       return res;
//     } catch (err) {
//       log.error(apiName + ' error' + err);
//     }
//   }

//   prepareRequest() {
//     return this.geneRequest(api.prepare, this.geneParams(api.prepare));
//   }

//   uploadRequest(taskId, filePath, fileLen) {
//     const self = this;

//     return new Promise((resolve, reject) => {
//       let index = 1,
//         start = 0,
//         sig = new SliceIdGenerator();

//       async function loopUpload() {
//         const len = fileLen < FILE_PIECE_SICE ? fileLen : FILE_PIECE_SICE,
//           end = start + len - 1;

//         // fs.createReadStream() 读取字节时，start 和 end 都包含在内
//         const fileFragment = fs.createReadStream(filePath, {
//           start,
//           end,
//         });

//         const res = await self.geneRequest(api.upload,
//           self.geneParams(api.upload, taskId, sig.getNextSliceId()),
//           fileFragment);

//         if (res.ok == 0) {
//           log.info('upload slice ' + index + ' success');
//           index++;
//           start = end + 1;
//           fileLen -= len;

//           if (fileLen > 0) {
//             loopUpload();
//           } else {
//             resolve();
//           }
//         }
//       }

//       loopUpload();
//     });
//   }

//   mergeRequest(taskId) {
//     return this.geneRequest(api.merge, this.geneParams(api.merge, taskId));
//   }

//   getProgressRequest(taskId) {
//     const self = this;

//     return new Promise(resolve => {
//       function sleep(time) {
//         return new Promise(resolve => {
//           setTimeout(resolve, time);
//         });
//       }

//       async function loopGetProgress() {
//         const res = await self.geneRequest(api.getProgress, self.geneParams(api.getProgress, taskId));

//         const data = JSON.parse(res.data);
//         const taskStatus = data.status;
//         log.info('task ' + taskId + ' is in processing, task status ' + taskStatus);
//         if (taskStatus == 9) {
//           log.info('task ' + taskId + ' finished');
//           resolve();
//         } else {
//           sleep(20000).then(() => loopGetProgress());
//         }
//       }

//       loopGetProgress();
//     });
//   }

//   async getResultRequest(taskId) {
//     const res = await this.geneRequest(api.getResult, this.geneParams(api.getResult, taskId));

//     l data = JSON.parse(res.data),
//       result = '';
//     data.forEach(val => {
//       result += val.onebest;
//     });
//     log.info(result);
//   }

//   async allApiRequest() {
//     try {
//       const prepare = await this.prepareRequest();
//       const taskId = prepare.data;
//       await this.uploadRequest(taskId, this.filePath, this.fileLen);
//       await this.mergeRequest(taskId);
//       await this.getProgressRequest(taskId);
//       await this.getResultRequest(taskId);
//     } catch (err) {
//       log.error(err);
//     }
//   }
// }

// const ra = new RequestApi(config);
// // ra.allApiRequest();
