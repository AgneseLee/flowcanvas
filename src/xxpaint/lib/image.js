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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJDQUFzQztBQUV0QyxJQUFNLFVBQVUsR0FBRyxJQUFJLG9CQUFVLEVBQUUsQ0FBQztBQUVwQyxTQUFTLGNBQWMsQ0FBQyxPQUFPO0lBQzdCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNqQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUU1QixJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNDLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSTtZQUVoQixJQUFJLENBQUMsSUFBSTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUN4QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUM3QyxRQUFRLEVBQUUsQ0FBQztnQkFFWCxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO29CQUN0QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztvQkFFaEIsRUFBRSxDQUFDLFlBQVksQ0FBQzt3QkFDZCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7d0JBQ2IsT0FBTyxFQUFFLFVBQUMsR0FBRzs0QkFFWCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7NEJBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQzt3QkFFNUIsQ0FBQzt3QkFDRCxJQUFJLEVBQUUsVUFBQyxLQUFLOzRCQUVWLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDOzRCQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWdCLElBQUksQ0FBQyxHQUFHLGlCQUFZLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFHLENBQUMsQ0FBQzt3QkFFN0UsQ0FBQzt3QkFDRCxRQUFRLEVBQUU7NEJBQ1IsYUFBYSxFQUFFLENBQUM7NEJBQ2hCLElBQUksUUFBUSxLQUFLLGFBQWEsRUFBRTtnQ0FDOUIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUN0Qjt3QkFDSCxDQUFDO3FCQUNGLENBQUMsQ0FBQztnQkFDTCxDQUFDLEVBQUU7b0JBQ0QsYUFBYSxFQUFFLENBQUM7b0JBQ2hCLElBQUksUUFBUSxLQUFLLGFBQWEsRUFBRTt3QkFDOUIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FCQUN0QjtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUN6QyxLQUFvQixVQUFhLEVBQWIsS0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLGNBQWEsRUFBYixJQUFhLEVBQUU7b0JBQTlCLElBQU0sS0FBSyxTQUFBO29CQUNkLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDWjthQUNGO1FBQ0gsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLFFBQVEsS0FBSyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCBEb3dubG9hZGVyIGZyb20gJy4vZG93bmxvYWRlcic7XG5cbmNvbnN0IGRvd25sb2FkZXIgPSBuZXcgRG93bmxvYWRlcigpO1xuXG5mdW5jdGlvbiBkb3dubG9hZEltYWdlcyhwYWxldHRlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHByZUNvdW50ID0gMDtcbiAgICBsZXQgY29tcGxldGVDb3VudCA9IDA7XG4gICAgLy8gY29uc3QgcGFsZXR0ZUNvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBhbGV0dGUpKTtcbiAgICBjb25zdCBwYWxldHRlQ29weSA9IHBhbGV0dGU7XG5cbiAgICBjb25zdCB0YXJnZXROb2RlID0gcGFsZXR0ZUNvcHkuY2hpbGRyZW5bMF07XG5cbiAgICAoZnVuY3Rpb24gZGZzKHZpZXcpIHtcbiAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICBpZiAoIXZpZXcpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICh2aWV3ICYmIHZpZXcudHlwZSA9PT0gJ2ltYWdlJyAmJiB2aWV3LnVybCkge1xuICAgICAgICBwcmVDb3VudCsrO1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cbiAgICAgICAgZG93bmxvYWRlci5kb3dubG9hZCh2aWV3LnVybCkudGhlbigocGF0aCkgPT4ge1xuICAgICAgICAgIHZpZXcudXJsID0gcGF0aDtcbiAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgIHd4LmdldEltYWdlSW5mbyh7XG4gICAgICAgICAgICBzcmM6IHZpZXcudXJsLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAvLyDojrflvpfkuIDkuIvlm77niYfkv6Hmga/vvIzkvpvlkI7nu63oo4Hlh4/kvb/nlKhcbiAgICAgICAgICAgICAgdmlldy5zV2lkdGggPSByZXMud2lkdGg7XG4gICAgICAgICAgICAgIHZpZXcuc0hlaWdodCA9IHJlcy5oZWlnaHQ7XG4gICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIC8vIOWmguaenOWbvueJh+Wdj+S6hu+8jOWImeebtOaOpee9ruepuu+8jOmYsuatouWdkeeIueeahCBjYW52YXMg55S75bSp5rqD5LqGXG4gICAgICAgICAgICAgIHZpZXcudXJsID0gJyc7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYGdldEltYWdlSW5mbyAke3ZpZXcudXJsfSBmYWlsZWQsICR7SlNPTi5zdHJpbmdpZnkoZXJyb3IpfWApO1xuICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbXBsZXRlQ291bnQrKztcbiAgICAgICAgICAgICAgaWYgKHByZUNvdW50ID09PSBjb21wbGV0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYWxldHRlQ29weSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICBjb21wbGV0ZUNvdW50Kys7XG4gICAgICAgICAgaWYgKHByZUNvdW50ID09PSBjb21wbGV0ZUNvdW50KSB7XG4gICAgICAgICAgICByZXNvbHZlKHBhbGV0dGVDb3B5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHZpZXcuY2hpbGRyZW4gJiYgdmlldy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2aWV3LmNoaWxkcmVuKSB7XG4gICAgICAgICAgZGZzKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0odGFyZ2V0Tm9kZSkpO1xuICAgIGlmIChwcmVDb3VudCA9PT0gMCkge1xuICAgICAgcmVzb2x2ZShwYWxldHRlQ29weSk7XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZG93bmxvYWRJbWFnZXMgPSBkb3dubG9hZEltYWdlcztcbiJdfQ==