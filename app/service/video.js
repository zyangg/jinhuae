'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const Service = require('egg').Service;
// const CryptoJS = require('crypto-js');
// const WebSocket = require('ws');
// const log = require('log4node');
// // 系统配置
// const config = {
//   // 请求地址
//   hostUrl: 'wss://rtasr.xfyun.cn/v1/ws',
//   // 在控制台-我的应用-实时语音转写获取
//   appid: '5f9b87a7',
//   // 在控制台-我的应用-实时语音转写获取
//   apiKey: '21467c6adff3a5a80ae9b457c6df13f8',
//   file: './app/service/mp3/北山路708号.mp3', // 请填写您的音频文件路径
//   // highWaterMark: 1280,
// };

class VideoService extends Service {
  async publishVideoNew(title, describe, video, date, time, author) {
    const { ctx } = this;
    ctx.model.Video.create({ title, describe, video, date, time, author });
  }
  async downLoadUrl(url) {
    http.get(url, res => {
      let data = '';
      res.setEncoding('binary'); // 一定要设置response的编码为binary否则会下载下来的图片打不开
      res.on('data', function(chunk) {
        data += chunk;
      });
      res.on('end', () => {
        fs.writeFileSync(path.resolve(__dirname, './mp3/aaa.mp3'), data, 'binary');
      });
    });
  }
  // async getVideoText() {
  //   console.log('1111111111');
  //   // 获取当前时间戳
  //   const ts = parseInt(new Date().getTime() / 1000);

  //   const wssUrl = config.hostUrl + '?appid=' + config.appid + '&ts=' + ts + '&signa=' + getSigna(ts);
  //   const ws = new WebSocket(wssUrl);

  //   // 连接建立完毕，读取数据进行识别
  //   // ws.on('open', event => {
  //   //   log.info('websocket connect!');
  //   // });

  //   // 得到识别结果后进行处理，仅供参考，具体业务具体对待
  //   const rtasrResult = [];
  //   ws.on('message', (data, err) => {
  //     console.log('2222');
  //     if (err) {
  //       log.info(`err:${err}`);
  //       return;
  //     }
  //     const res = JSON.parse(data);
  //     switch (res.action) {
  //       // case 'error':
  //       //   log.info(`error code:${res.code} desc:${res.desc}`)
  //       //   break
  //       //   // 连接建立
  //       case 'started':
  //         {
  //           console.log('3333');
  //           console.log('sid is:' + res.sid);
  //           log.info('started!');
  //           log.info('sid is:' + res.sid);
  //           // 开始读取文件进行传输
  //           const readerStream = fs.createReadStream(config.file, {
  //             highWaterMark: config.highWaterMark,
  //           });
  //           readerStream.on('data', function(chunk) {
  //             ws.send(chunk);
  //           });
  //           readerStream.on('end', function() {
  //             // 最终帧发送结束
  //             ws.send('{"end": true}');
  //           });
  //         }
  //         break;
  //       case 'result':
  //         {
  //           // ... do something
  //           const data = JSON.parse(res.data);
  //           rtasrResult[data.seg_id] = data;
  //           console.log('ddddddd', data.cn.st.type);
  //           // 把转写结果解析为句子
  //           if (data.cn.st.type == 0) {
  //             rtasrResult.forEach(i => {
  //               let str = '实时转写';
  //               str += (i.cn.st.type == 0) ? '【最终】识别结果：' : '【中间】识别结果：';
  //               i.cn.st.rt.forEach(j => {
  //                 j.ws.forEach(k => {
  //                   k.cw.forEach(l => {
  //                     str += l.w;
  //                   });
  //                 });
  //               });
  //               console.log(str);
  //             });

  //           }
  //         }
  //         break;
  //       default: break;
  //     }
  //   });

  //   // 鉴权签名
  //   function getSigna(ts) {
  //     const md5 = CryptoJS.MD5(config.appid + ts).toString();
  //     const sha1 = CryptoJS.HmacSHA1(md5, config.apiKey);
  //     const base64 = CryptoJS.enc.Base64.stringify(sha1);
  //     return encodeURIComponent(base64);
  //   }
  // }
}

module.exports = VideoService;
