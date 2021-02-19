"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImages = void 0;
var downloader_1 = require("./downloader");
var downloader = new downloader_1.default();
function downloadImages(palette) {
    return new Promise(function (resolve, reject) {
        var preCount = 0;
        var completeCount = 0;
        var paletteCopy = palette;
        var targetNode = paletteCopy.children[0];
        (function dfs(view) {
            if (!view)
                return false;
            if (view && view.type === 'image' && view.url) {
                preCount++;
                downloader.download(view.url).then(function (path) {
                    view.url = path;
                    wx.getImageInfo({
                        src: view.url,
                        success: function (res) {
                            view.sWidth = res.width;
                            view.sHeight = res.height;
                        },
                        fail: function (error) {
                            view.url = '';
                            console.error("getImageInfo " + view.url + " failed, " + JSON.stringify(error));
                        },
                        complete: function () {
                            completeCount++;
                            if (preCount === completeCount) {
                                resolve(paletteCopy);
                            }
                        },
                    });
                }, function () {
                    completeCount++;
                    if (preCount === completeCount) {
                        resolve(paletteCopy);
                    }
                });
            }
            if (view.children && view.children.length) {
                for (var _i = 0, _a = view.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    dfs(child);
                }
            }
        }(targetNode));
        if (preCount === 0) {
            resolve(paletteCopy);
        }
    });
}
exports.downloadImages = downloadImages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMveHhwYWludC9saWIvaW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkNBQXNDO0FBRXRDLElBQU0sVUFBVSxHQUFHLElBQUksb0JBQVUsRUFBRSxDQUFDO0FBRXBDLFNBQVMsY0FBYyxDQUFDLE9BQU87SUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2pDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFFdEIsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBRTVCLElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0MsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJO1lBRWhCLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ3hCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzdDLFFBQVEsRUFBRSxDQUFDO2dCQUVYLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7b0JBQ3RDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUVoQixFQUFFLENBQUMsWUFBWSxDQUFDO3dCQUNkLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzt3QkFDYixPQUFPLEVBQUUsVUFBQyxHQUFHOzRCQUVYLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO3dCQUU1QixDQUFDO3dCQUNELElBQUksRUFBRSxVQUFDLEtBQUs7NEJBRVYsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7NEJBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBZ0IsSUFBSSxDQUFDLEdBQUcsaUJBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFDO3dCQUU3RSxDQUFDO3dCQUNELFFBQVEsRUFBRTs0QkFDUixhQUFhLEVBQUUsQ0FBQzs0QkFDaEIsSUFBSSxRQUFRLEtBQUssYUFBYSxFQUFFO2dDQUM5QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7NkJBQ3RCO3dCQUNILENBQUM7cUJBQ0YsQ0FBQyxDQUFDO2dCQUNMLENBQUMsRUFBRTtvQkFDRCxhQUFhLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxRQUFRLEtBQUssYUFBYSxFQUFFO3dCQUM5QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ3RCO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pDLEtBQW9CLFVBQWEsRUFBYixLQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWEsRUFBRTtvQkFBOUIsSUFBTSxLQUFLLFNBQUE7b0JBQ2QsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNaO2FBQ0Y7UUFDSCxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksUUFBUSxLQUFLLENBQUMsRUFBRTtZQUNsQixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFLQyx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgRG93bmxvYWRlciBmcm9tICcuL2Rvd25sb2FkZXInO1xuXG5jb25zdCBkb3dubG9hZGVyID0gbmV3IERvd25sb2FkZXIoKTtcblxuZnVuY3Rpb24gZG93bmxvYWRJbWFnZXMocGFsZXR0ZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBwcmVDb3VudCA9IDA7XG4gICAgbGV0IGNvbXBsZXRlQ291bnQgPSAwO1xuICAgIC8vIGNvbnN0IHBhbGV0dGVDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYWxldHRlKSk7XG4gICAgY29uc3QgcGFsZXR0ZUNvcHkgPSBwYWxldHRlO1xuXG4gICAgY29uc3QgdGFyZ2V0Tm9kZSA9IHBhbGV0dGVDb3B5LmNoaWxkcmVuWzBdO1xuXG4gICAgKGZ1bmN0aW9uIGRmcyh2aWV3KSB7XG4gICAgICAvLyBkZWJ1Z2dlclxuICAgICAgaWYgKCF2aWV3KSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAodmlldyAmJiB2aWV3LnR5cGUgPT09ICdpbWFnZScgJiYgdmlldy51cmwpIHtcbiAgICAgICAgcHJlQ291bnQrKztcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4gICAgICAgIGRvd25sb2FkZXIuZG93bmxvYWQodmlldy51cmwpLnRoZW4oKHBhdGgpID0+IHtcbiAgICAgICAgICB2aWV3LnVybCA9IHBhdGg7XG4gICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICB3eC5nZXRJbWFnZUluZm8oe1xuICAgICAgICAgICAgc3JjOiB2aWV3LnVybCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgLy8g6I635b6X5LiA5LiL5Zu+54mH5L+h5oGv77yM5L6b5ZCO57ut6KOB5YeP5L2/55SoXG4gICAgICAgICAgICAgIHZpZXcuc1dpZHRoID0gcmVzLndpZHRoO1xuICAgICAgICAgICAgICB2aWV3LnNIZWlnaHQgPSByZXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAvLyDlpoLmnpzlm77niYflnY/kuobvvIzliJnnm7TmjqXnva7nqbrvvIzpmLLmraLlnZHniLnnmoQgY2FudmFzIOeUu+W0qea6g+S6hlxuICAgICAgICAgICAgICB2aWV3LnVybCA9ICcnO1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBnZXRJbWFnZUluZm8gJHt2aWV3LnVybH0gZmFpbGVkLCAke0pTT04uc3RyaW5naWZ5KGVycm9yKX1gKTtcbiAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICBjb21wbGV0ZUNvdW50Kys7XG4gICAgICAgICAgICAgIGlmIChwcmVDb3VudCA9PT0gY29tcGxldGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocGFsZXR0ZUNvcHkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgY29tcGxldGVDb3VudCsrO1xuICAgICAgICAgIGlmIChwcmVDb3VudCA9PT0gY29tcGxldGVDb3VudCkge1xuICAgICAgICAgICAgcmVzb2x2ZShwYWxldHRlQ29weSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh2aWV3LmNoaWxkcmVuICYmIHZpZXcuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygdmlldy5jaGlsZHJlbikge1xuICAgICAgICAgIGRmcyhjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KHRhcmdldE5vZGUpKTtcbiAgICBpZiAocHJlQ291bnQgPT09IDApIHtcbiAgICAgIHJlc29sdmUocGFsZXR0ZUNvcHkpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIG1vZHVsZS5leHBvcnRzLmRvd25sb2FkSW1hZ2VzID0gZG93bmxvYWRJbWFnZXM7XG4vLyBleHBvcnQuZG93bmxvYWRJbWFnZXM9IGRvd25sb2FkSW1hZ2VzXG5leHBvcnQge1xuICBkb3dubG9hZEltYWdlc1xufSJdfQ==