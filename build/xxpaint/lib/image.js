"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
module.exports.downloadImages = downloadImages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMveHhwYWludC9saWIvaW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBc0M7QUFFdEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxvQkFBVSxFQUFFLENBQUM7QUFFcEMsU0FBUyxjQUFjLENBQUMsT0FBTztJQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDakMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUV0QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFNUIsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUk7WUFFaEIsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDeEIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDN0MsUUFBUSxFQUFFLENBQUM7Z0JBRVgsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtvQkFDdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWhCLEVBQUUsQ0FBQyxZQUFZLENBQUM7d0JBQ2QsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO3dCQUNiLE9BQU8sRUFBRSxVQUFDLEdBQUc7NEJBRVgsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDOzRCQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7d0JBRTVCLENBQUM7d0JBQ0QsSUFBSSxFQUFFLFVBQUMsS0FBSzs0QkFFVixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs0QkFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFnQixJQUFJLENBQUMsR0FBRyxpQkFBWSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7d0JBRTdFLENBQUM7d0JBQ0QsUUFBUSxFQUFFOzRCQUNSLGFBQWEsRUFBRSxDQUFDOzRCQUNoQixJQUFJLFFBQVEsS0FBSyxhQUFhLEVBQUU7Z0NBQzlCLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs2QkFDdEI7d0JBQ0gsQ0FBQztxQkFDRixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxFQUFFO29CQUNELGFBQWEsRUFBRSxDQUFDO29CQUNoQixJQUFJLFFBQVEsS0FBSyxhQUFhLEVBQUU7d0JBQzlCLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDdEI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUNELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDekMsS0FBb0IsVUFBYSxFQUFiLEtBQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixjQUFhLEVBQWIsSUFBYSxFQUFFO29CQUE5QixJQUFNLEtBQUssU0FBQTtvQkFDZCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ1o7YUFDRjtRQUNILENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN0QjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgRG93bmxvYWRlciBmcm9tICcuL2Rvd25sb2FkZXInO1xuXG5jb25zdCBkb3dubG9hZGVyID0gbmV3IERvd25sb2FkZXIoKTtcblxuZnVuY3Rpb24gZG93bmxvYWRJbWFnZXMocGFsZXR0ZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBwcmVDb3VudCA9IDA7XG4gICAgbGV0IGNvbXBsZXRlQ291bnQgPSAwO1xuICAgIC8vIGNvbnN0IHBhbGV0dGVDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYWxldHRlKSk7XG4gICAgY29uc3QgcGFsZXR0ZUNvcHkgPSBwYWxldHRlO1xuXG4gICAgY29uc3QgdGFyZ2V0Tm9kZSA9IHBhbGV0dGVDb3B5LmNoaWxkcmVuWzBdO1xuXG4gICAgKGZ1bmN0aW9uIGRmcyh2aWV3KSB7XG4gICAgICAvLyBkZWJ1Z2dlclxuICAgICAgaWYgKCF2aWV3KSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAodmlldyAmJiB2aWV3LnR5cGUgPT09ICdpbWFnZScgJiYgdmlldy51cmwpIHtcbiAgICAgICAgcHJlQ291bnQrKztcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4gICAgICAgIGRvd25sb2FkZXIuZG93bmxvYWQodmlldy51cmwpLnRoZW4oKHBhdGgpID0+IHtcbiAgICAgICAgICB2aWV3LnVybCA9IHBhdGg7XG4gICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICB3eC5nZXRJbWFnZUluZm8oe1xuICAgICAgICAgICAgc3JjOiB2aWV3LnVybCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgLy8g6I635b6X5LiA5LiL5Zu+54mH5L+h5oGv77yM5L6b5ZCO57ut6KOB5YeP5L2/55SoXG4gICAgICAgICAgICAgIHZpZXcuc1dpZHRoID0gcmVzLndpZHRoO1xuICAgICAgICAgICAgICB2aWV3LnNIZWlnaHQgPSByZXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAvLyDlpoLmnpzlm77niYflnY/kuobvvIzliJnnm7TmjqXnva7nqbrvvIzpmLLmraLlnZHniLnnmoQgY2FudmFzIOeUu+W0qea6g+S6hlxuICAgICAgICAgICAgICB2aWV3LnVybCA9ICcnO1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBnZXRJbWFnZUluZm8gJHt2aWV3LnVybH0gZmFpbGVkLCAke0pTT04uc3RyaW5naWZ5KGVycm9yKX1gKTtcbiAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICBjb21wbGV0ZUNvdW50Kys7XG4gICAgICAgICAgICAgIGlmIChwcmVDb3VudCA9PT0gY29tcGxldGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocGFsZXR0ZUNvcHkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgY29tcGxldGVDb3VudCsrO1xuICAgICAgICAgIGlmIChwcmVDb3VudCA9PT0gY29tcGxldGVDb3VudCkge1xuICAgICAgICAgICAgcmVzb2x2ZShwYWxldHRlQ29weSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh2aWV3LmNoaWxkcmVuICYmIHZpZXcuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygdmlldy5jaGlsZHJlbikge1xuICAgICAgICAgIGRmcyhjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KHRhcmdldE5vZGUpKTtcbiAgICBpZiAocHJlQ291bnQgPT09IDApIHtcbiAgICAgIHJlc29sdmUocGFsZXR0ZUNvcHkpO1xuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmRvd25sb2FkSW1hZ2VzID0gZG93bmxvYWRJbWFnZXM7XG4iXX0=