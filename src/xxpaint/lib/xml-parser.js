"use strict";
function parse(xml) {
    xml = xml.trim();
    xml = xml.replace(/<!--[\s\S]*?-->/g, '');
    return document();
    function document() {
        return {
            declaration: declaration(),
            root: tag(),
        };
    }
    function declaration() {
        var m = match(/^<\?xml\s*/);
        if (!m)
            return;
        var node = {
            attributes: {},
        };
        while (!(eos() || is('?>'))) {
            var attr = attribute();
            if (!attr)
                return node;
            node.attributes[attr.name] = attr.value;
        }
        match(/\?>\s*/);
        return node;
    }
    function tag() {
        var m = match(/^<([\w-:.]+)\s*/);
        if (!m)
            return;
        var node = {
            name: m[1],
            attributes: {},
            children: [],
        };
        while (!(eos() || is('>') || is('?>') || is('/>'))) {
            var attr = attribute();
            if (!attr)
                return node;
            node.attributes[attr.name] = attr.value;
        }
        if (match(/^\s*\/>\s*/)) {
            return node;
        }
        match(/\??>\s*/);
        node.content = content();
        var child;
        while (child = tag()) {
            node.children.push(child);
        }
        match(/^<\/[\w-:.]+>\s*/);
        return node;
    }
    function content() {
        var m = match(/^([^<]*)/);
        if (m)
            return m[1];
        return '';
    }
    function attribute() {
        var m = match(/([\w:-]+)\s*=\s*("[^"]*"|'[^']*'|\w+)\s*/);
        if (!m)
            return;
        return { name: m[1], value: strip(m[2]) };
    }
    function strip(val) {
        return val.replace(/^['"]|['"]$/g, '');
    }
    function match(re) {
        var m = xml.match(re);
        if (!m)
            return;
        xml = xml.slice(m[0].length);
        return m;
    }
    function eos() {
        return xml.length == 0;
    }
    function is(prefix) {
        return xml.indexOf(prefix) == 0;
    }
}
module.exports = parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1sLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInhtbC1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWlCQSxTQUFTLEtBQUssQ0FBQyxHQUFHO0lBQ2hCLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFHakIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFMUMsT0FBTyxRQUFRLEVBQUUsQ0FBQztJQU1sQixTQUFTLFFBQVE7UUFDZixPQUFPO1lBQ0wsV0FBVyxFQUFFLFdBQVcsRUFBRTtZQUMxQixJQUFJLEVBQUUsR0FBRyxFQUFFO1NBQ1osQ0FBQztJQUNKLENBQUM7SUFNRCxTQUFTLFdBQVc7UUFDbEIsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUdmLElBQU0sSUFBSSxHQUFHO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBR0YsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDM0IsSUFBTSxJQUFJLEdBQUcsU0FBUyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUN6QztRQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFNRCxTQUFTLEdBQUc7UUFDVixJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU87UUFHZixJQUFNLElBQUksR0FBRztZQUNYLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1YsVUFBVSxFQUFFLEVBQUU7WUFDZCxRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFHRixPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ2xELElBQU0sSUFBSSxHQUFHLFNBQVMsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDekM7UUFHRCxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBR2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFHekIsSUFBSSxLQUFLLENBQUM7UUFDVixPQUFPLEtBQUssR0FBRyxHQUFHLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtRQUdELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRTFCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQU1ELFNBQVMsT0FBTztRQUNkLElBQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFNRCxTQUFTLFNBQVM7UUFDaEIsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFNRCxTQUFTLEtBQUssQ0FBQyxHQUFHO1FBQ2hCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQU1ELFNBQVMsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNmLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFNRCxTQUFTLEdBQUc7UUFDVixPQUFPLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFNRCxTQUFTLEVBQUUsQ0FBQyxNQUFNO1FBQ2hCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztBQUNILENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuLyoqXG4gKiBFeHBvc2UgYHBhcnNlYC5cbiAqL1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYHhtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHhtbFxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZSh4bWwpIHtcbiAgeG1sID0geG1sLnRyaW0oKTtcblxuICAvLyBzdHJpcCBjb21tZW50c1xuICB4bWwgPSB4bWwucmVwbGFjZSgvPCEtLVtcXHNcXFNdKj8tLT4vZywgJycpO1xuXG4gIHJldHVybiBkb2N1bWVudCgpO1xuXG4gIC8qKlxuICAgICAqIFhNTCBkb2N1bWVudC5cbiAgICAgKi9cblxuICBmdW5jdGlvbiBkb2N1bWVudCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGVjbGFyYXRpb246IGRlY2xhcmF0aW9uKCksXG4gICAgICByb290OiB0YWcoKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAgICogRGVjbGFyYXRpb24uXG4gICAgICovXG5cbiAgZnVuY3Rpb24gZGVjbGFyYXRpb24oKSB7XG4gICAgY29uc3QgbSA9IG1hdGNoKC9ePFxcP3htbFxccyovKTtcbiAgICBpZiAoIW0pIHJldHVybjtcblxuICAgIC8vIHRhZ1xuICAgIGNvbnN0IG5vZGUgPSB7XG4gICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICB9O1xuXG4gICAgLy8gYXR0cmlidXRlc1xuICAgIHdoaWxlICghKGVvcygpIHx8IGlzKCc/PicpKSkge1xuICAgICAgY29uc3QgYXR0ciA9IGF0dHJpYnV0ZSgpO1xuICAgICAgaWYgKCFhdHRyKSByZXR1cm4gbm9kZTtcbiAgICAgIG5vZGUuYXR0cmlidXRlc1thdHRyLm5hbWVdID0gYXR0ci52YWx1ZTtcbiAgICB9XG5cbiAgICBtYXRjaCgvXFw/PlxccyovKTtcblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgLyoqXG4gICAgICogVGFnLlxuICAgICAqL1xuXG4gIGZ1bmN0aW9uIHRhZygpIHtcbiAgICBjb25zdCBtID0gbWF0Y2goL148KFtcXHctOi5dKylcXHMqLyk7XG4gICAgaWYgKCFtKSByZXR1cm47XG5cbiAgICAvLyBuYW1lXG4gICAgY29uc3Qgbm9kZSA9IHtcbiAgICAgIG5hbWU6IG1bMV0sXG4gICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICB9O1xuXG4gICAgLy8gYXR0cmlidXRlc1xuICAgIHdoaWxlICghKGVvcygpIHx8IGlzKCc+JykgfHwgaXMoJz8+JykgfHwgaXMoJy8+JykpKSB7XG4gICAgICBjb25zdCBhdHRyID0gYXR0cmlidXRlKCk7XG4gICAgICBpZiAoIWF0dHIpIHJldHVybiBub2RlO1xuICAgICAgbm9kZS5hdHRyaWJ1dGVzW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgIH1cblxuICAgIC8vIHNlbGYgY2xvc2luZyB0YWdcbiAgICBpZiAobWF0Y2goL15cXHMqXFwvPlxccyovKSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgbWF0Y2goL1xcPz8+XFxzKi8pO1xuXG4gICAgLy8gY29udGVudFxuICAgIG5vZGUuY29udGVudCA9IGNvbnRlbnQoKTtcblxuICAgIC8vIGNoaWxkcmVuXG4gICAgbGV0IGNoaWxkO1xuICAgIHdoaWxlIChjaGlsZCA9IHRhZygpKSB7XG4gICAgICBub2RlLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIH1cblxuICAgIC8vIGNsb3NpbmdcbiAgICBtYXRjaCgvXjxcXC9bXFx3LTouXSs+XFxzKi8pO1xuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvKipcbiAgICAgKiBUZXh0IGNvbnRlbnQuXG4gICAgICovXG5cbiAgZnVuY3Rpb24gY29udGVudCgpIHtcbiAgICBjb25zdCBtID0gbWF0Y2goL14oW148XSopLyk7XG4gICAgaWYgKG0pIHJldHVybiBtWzFdO1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qKlxuICAgICAqIEF0dHJpYnV0ZS5cbiAgICAgKi9cblxuICBmdW5jdGlvbiBhdHRyaWJ1dGUoKSB7XG4gICAgY29uc3QgbSA9IG1hdGNoKC8oW1xcdzotXSspXFxzKj1cXHMqKFwiW15cIl0qXCJ8J1teJ10qJ3xcXHcrKVxccyovKTtcbiAgICBpZiAoIW0pIHJldHVybjtcbiAgICByZXR1cm4geyBuYW1lOiBtWzFdLCB2YWx1ZTogc3RyaXAobVsyXSkgfTtcbiAgfVxuXG4gIC8qKlxuICAgICAqIFN0cmlwIHF1b3RlcyBmcm9tIGB2YWxgLlxuICAgICAqL1xuXG4gIGZ1bmN0aW9uIHN0cmlwKHZhbCkge1xuICAgIHJldHVybiB2YWwucmVwbGFjZSgvXlsnXCJdfFsnXCJdJC9nLCAnJyk7XG4gIH1cblxuICAvKipcbiAgICAgKiBNYXRjaCBgcmVgIGFuZCBhZHZhbmNlIHRoZSBzdHJpbmcuXG4gICAgICovXG5cbiAgZnVuY3Rpb24gbWF0Y2gocmUpIHtcbiAgICBjb25zdCBtID0geG1sLm1hdGNoKHJlKTtcbiAgICBpZiAoIW0pIHJldHVybjtcbiAgICB4bWwgPSB4bWwuc2xpY2UobVswXS5sZW5ndGgpO1xuICAgIHJldHVybiBtO1xuICB9XG5cbiAgLyoqXG4gICAgICogRW5kLW9mLXNvdXJjZS5cbiAgICAgKi9cblxuICBmdW5jdGlvbiBlb3MoKSB7XG4gICAgcmV0dXJuIHhtbC5sZW5ndGggPT0gMDtcbiAgfVxuXG4gIC8qKlxuICAgICAqIENoZWNrIGZvciBgcHJlZml4YC5cbiAgICAgKi9cblxuICBmdW5jdGlvbiBpcyhwcmVmaXgpIHtcbiAgICByZXR1cm4geG1sLmluZGV4T2YocHJlZml4KSA9PSAwO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2U7XG4iXX0=