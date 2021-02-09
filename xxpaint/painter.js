import Pen from './lib/pen';
import { downloadImages } from './lib/image'
import { canUseNewCanvas } from './lib/util';
import { createTree } from './lib/tree'
const util = require('./lib/util');



// 最大尝试的绘制次数
const MAX_PAINT_COUNT = 5;
Component({
  canvasStyleWidthInPx: 0,
  canvasStyleHeightInPx: 0,
  paintCount: 0,
  /**
   * 组件的属性列表
   */
  properties: {
    palette: {
      type: Object,
      observer(newVal, oldVal) {
        if (this.isNeedRefresh(newVal, oldVal)) {
          this.paintCount = 0;
          console.time();
          this.startPaint();
        }
      },
    },
    widthPixels: {
      type: Number,
      value: 0
    },
    // 启用脏检查，默认 false
    dirty: {
      type: Boolean,
      value: false,
    },
    setImgScreenWidth: {
      type: String,
      value: ''
    },
    painterBodyStyle: {
      type: String,
      value: ''
    },
  },

  data: {
    picURL: '',
    showCanvas: true,
    painterStyle: '',
    outputPic: '',
    caniuse: false,
    realAllH: 0,
    realWhiteH: 0,
    canvasNode: {},
    canvasCtx: {},
    pen: {},
    calcTpl: {}, // 计算后的模板信息
  },

  lifetimes: {
    attached() {
      const caniuse = canUseNewCanvas();
      this.setData({
        caniuse
      });
    },

  },


  methods: {

    /**
     * 判断一个 object 是否为 空
     * @param {object} object
     */
    isEmpty(object) {
      for (const i in object) {
        return false;
      }
      return true;
    },

    isNeedRefresh(newVal, oldVal) {
      if (!newVal || this.isEmpty(newVal) || (this.data.dirty && util.equal(newVal, oldVal))) {
        return false;
      }
      return true;
    },

    async startPaint() {
      if (this.isEmpty(this.properties.palette)) {
        return;
      }

      // 兼容小程序插件
      try {
        wx.getSystemInfoSync();
      } catch (e) {
        const error = `Painter get system info failed, ${JSON.stringify(e)}`;
        this.triggerEvent('imgErr', {
          error
        });
        console.error(error);
        return;
      }
      const screenK = wx.getSystemInfoSync().screenWidth / 750;
      setStringPrototype(screenK, 1);

      const {
        width,
        height
      } = this.properties.palette.children[0].css;

      if (!width || !height) {
        console.error(`You should set width and height correctly for painter, width: ${width}, height: ${height}`);
        return;
      }

      const calcTpl = await this.getCalcTpl(this.properties.palette);
      this.data.calcTpl = calcTpl;
      const { width: calcWidth, height: calcHeight } = calcTpl.children[0].processedLocation;

      // debugger;

      // ---------begin----------- 用作展示canvas，不影响最后保存的图片;这里只为了和图片保证1v1的展示比例
      this.canvasStyleWidthInPx = calcWidth
      this.canvasStyleHeightInPx = calcHeight
      if (this.properties.widthPixels) {
        // 如果重新设置过像素宽度，则重新设置比例
        setStringPrototype(screenK, this.properties.widthPixels / this.canvasStyleWidthInPx);
        this.canvasStyleWidthInPx = this.properties.widthPixels;
      }
      this.setData({
        painterStyle: `width:${this.canvasStyleWidthInPx}px;height:${this.canvasStyleHeightInPx}px;position: fixed;top:0px;`,
      });
      // ---------end-----------

      const innerpalette = await this.initCanvasNew(this.data.calcTpl);
      const _palette = innerpalette;
      const ctx = this.data.canvasCtx;
      const canvasNode = this.data.canvasNode;
      const pen = new Pen(ctx, { ..._palette, caniuse: this.data.caniuse, _canvas: canvasNode });
      pen.paint(() => {
        // canvasNode.height = (this.data.realAllH) * 3;
        // this.saveImgToLocal();
      });
      // });
    },

    /**
     * 往画笔注入初始化canvas
     * @param {*} palette 
     */
    getCalcTpl(palette) {
      return new Promise((resolve, reject) => {
        try {
          const query = wx.createSelectorQuery().in(this);
          query
            .select('#canvasp')
            .fields({ node: true, size: true })
            .exec(async (res) => {
              const canvasNode = res[0].node;
              const ctx = canvasNode.getContext('2d');
              this.data.canvasNode = canvasNode;
              this.data.canvasCtx = ctx;
              const pen = new Pen(ctx, { ...palette, caniuse: this.data.caniuse, _canvas: canvasNode });
              this.data.pen = pen;
              const layout = await pen.beforePaint();
              resolve(layout);
            });
        } catch (err) {
          reject(err);
        }
      });
    },

    async initCanvasNew() {
      // 外部只需要在实例化canvas时知道实际宽高即可
      const palette = this.data.calcTpl;
      const dpr = wx.getSystemInfoSync().pixelRatio;

      // 重置canvas总高度
      this.data.canvasNode.height = (palette.children[0].processedLocation.height) * dpr;
      this.data.canvasNode.width = (palette.children[0].processedLocation.width) * dpr;
      this.data.canvasCtx.scale(dpr, dpr);
      return palette;


    },
    initCanvasOld(windowWidth, width) {
      // const { windowWidth } = wx.getSystemInfoSync();
      const ctx = wx.createCanvasContext('k-canvas', this);
      // 按屏幕宽度缩放
      const ratio = windowWidth / width.toPx();
      ctx.scale(ratio, ratio);
      return ctx;
    },



    saveImgToLocal() {
      const that = this;
      const { height, width } = this.properties.palette;
      const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync();
      console.log('dpr`````````````````` ', pixelRatio);
      console.timeEnd();
      // const [pW] = [windowWidth]
      const pW = width.toPx();
      const dpr = pixelRatio;
      // const dpr = 3
      const divider = 1;

      // const [h, w] = [height.toPx(), width.toPx()]
      const [h, w] = [this.data.realAllH, width.toPx()];
      // const [h, w] = [windowHeight, windowWidth]
      const ratio = h / w;
      const pH = pW * ratio;
      // const [a,b,c,d] = [pW / divider,pH / divider,pW / divider *dpr,pH / divider *dpr]
      // debugger

      setTimeout(() => {
        const props = {
          canvasId: 'k-canvas',
          x: 0,
          y: 0,
          width: pW / divider,
          height: pH / divider,
          destWidth: pW / divider * dpr,
          destHeight: pH / divider * dpr,
          success(res) {
            that.getImageInfo(res.tempFilePath);
          },
          fail(error) {
            console.error(`canvasToTempFilePath failed, ${JSON.stringify(error)}`);
            that.triggerEvent('imgErr', {
              error
            });
          },
        };
        // wx.getSavedFileList({
        //   success(res) {
        //     if (res.fileList.length > 0) {
        //       // debugger;
        //       // 小程序本地文件存储的大小限制为10M，每次生成时删除上一次保存的海报
        //       res.fileList.forEach((x) => {
        //         wx.removeSavedFile({
        //           filePath: x.filePath,
        //           complete() {

        //           }
        //         });
        //       });
        //     }
        //   }
        // });
        // const caniuse = canUseNewCanvas();
        const caniuse = false;
        if (caniuse) {
          const imgPath = this.data.canvasNode.toDataURL('image/png', 1);
          this.setData({
            outputPic: imgPath
          });

          const randomNum = Math.floor((Math.random() * 1000) + 1);
          const filePath = wx.env.USER_DATA_PATH + `/qrcode${randomNum}.png`;
          const _z = this;

          wx.getFileSystemManager().writeFile({
            filePath, // 这里先把文件写到临时目录里.
            data: _z.data.outputPic.slice(22), // 注意这里
            encoding: 'base64',
            success: () => {
              console.log('success');

              _z.triggerEvent('imgOK', {
                path: filePath,
                id: '#canvasp',
              });
            },
            fail: (error) => {
              console.log(error);
            },
          });
        } else {
          props.canvas = this.data.canvasNode;
          wx.canvasToTempFilePath(props, this);
        }
      }, 480);
    },
    getImageInfo(filePath) {
      const that = this;
      wx.getImageInfo({
        src: filePath,
        success: (infoRes) => {
          if (that.paintCount > MAX_PAINT_COUNT) {
            const error = `The result is always fault, even we tried ${MAX_PAINT_COUNT} times`;
            console.error(error);
            that.triggerEvent('imgErr', {
              error
            });
            return;
          }
          // 比例相符时才证明绘制成功，否则进行强制重绘制
          // if (Math.abs((infoRes.width * that.canvasStyleHeightInPx - that.canvasStyleWidthInPx * infoRes.height) / (infoRes.height * that.canvasStyleHeightInPx)) < 0.01) {
          //   that.triggerEvent('imgOK', {
          //     path: filePath,
          //     id: '#canvasp',
          //   });

          // } else {
          //   that.startPaint();
          // }

          that.setData({
            outputPic: filePath
          });
          that.triggerEvent('imgOK', {
            path: filePath,
            id: '#canvasp',
          });
          that.paintCount++;
        },
        fail: (error) => {
          console.error(`getImageInfo failed, ${JSON.stringify(error)}`);
          that.triggerEvent('imgErr', {
            error
          });
        },
      });
    },
    async getTitleHeight(ctx, view) {
      // const ctx = await this.getTextCanvas()
      if (!view.text) return 0;
      let width = 0;
      let height;
      // 在原有height基础上，动态变化xxxxxx文字的高度------begin------
      const textArray = view.text.split('\n');
      // 处理多个连续的'\n'
      for (let i = 0; i < textArray.length; ++i) {
        if (textArray[i] === '') {
          textArray[i] = ' ';
        }
      }
      const fontWeight = view.fontWeight === 'bold' ? 'bold' : 'normal';
      view.fontSize = view.fontSize ? view.fontSize : '20rpx';
      ctx.font = `normal ${fontWeight} ${view.fontSize.toPx()}px ${view.fontFamily ? `"${view.fontFamily}"` : 'sans-serif'}`;

      // 计算行数
      let lines = 0;
      const linesArray = [];
      for (let i = 0; i < textArray.length; ++i) {
        const textLength = ctx.measureText(textArray[i]).width;
        const partWidth = view.width ? view.width.toPx() : textLength;
        const calLines = Math.ceil(textLength / partWidth);
        width = partWidth > width ? partWidth : width;
        lines += calLines;
        linesArray[i] = calLines;
      }
      lines = view.maxLines < lines ? view.maxLines : lines;
      const lineHeight = view.lineHeight ? view.lineHeight.toPx() : view.css.fontSize.toPx();
      height = lineHeight * lines;
      return height;
      // 在原有height基础上，动态变化xxxxxx文字的高度------end------
    }

  },
});


function setStringPrototype(screenK, scale) {
  /* eslint-disable no-extend-native */
  /**
   * 是否支持负数
   * @param {Boolean} minus 是否支持负数
   */
  String.prototype.toPx = function toPx(minus) {
    let reg;
    if (minus) {
      reg = /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    } else {
      reg = /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    }
    const results = reg.exec(this);
    if (!this || !results) {
      console.error(`The size: ${this} is illegal`);
      return 0;
    }
    const unit = results[2];
    const value = parseFloat(this);

    let res = 0;
    if (unit === 'rpx') {
      res = Math.round(value * screenK * (scale || 1));
    } else if (unit === 'px') {
      res = Math.round(value * (scale || 1));
    }
    return res;
  };
}

