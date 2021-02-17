/* eslint-disable */
import Downloader from './downloader';

const downloader = new Downloader();

function downloadImages(palette) {
  return new Promise((resolve, reject) => {
    let preCount = 0;
    let completeCount = 0;
    // const paletteCopy = JSON.parse(JSON.stringify(palette));
    const paletteCopy = palette;

    const targetNode = paletteCopy.children[0];

    (function dfs(view) {
      // debugger
      if (!view) return false;
      if (view && view.type === 'image' && view.url) {
        preCount++;
        /* eslint-disable no-loop-func */
        downloader.download(view.url).then((path) => {
          view.url = path;
          // debugger
          wx.getImageInfo({
            src: view.url,
            success: (res) => {
              // 获得一下图片信息，供后续裁减使用
              view.sWidth = res.width;
              view.sHeight = res.height;
              // debugger
            },
            fail: (error) => {
              // 如果图片坏了，则直接置空，防止坑爹的 canvas 画崩溃了
              view.url = '';
              console.error(`getImageInfo ${view.url} failed, ${JSON.stringify(error)}`);
              // debugger
            },
            complete: () => {
              completeCount++;
              if (preCount === completeCount) {
                resolve(paletteCopy);
              }
            },
          });
        }, () => {
          completeCount++;
          if (preCount === completeCount) {
            resolve(paletteCopy);
          }
        });
      }
      if (view.children && view.children.length) {
        for (const child of view.children) {
          dfs(child);
        }
      }
    }(targetNode));
    if (preCount === 0) {
      resolve(paletteCopy);
    }
  });
}

module.exports.downloadImages = downloadImages;
