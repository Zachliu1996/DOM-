const div = dom.create("<div>newDiv</div>")
const span = dom.create("<span>222</span>")
console.log(span);
console.log(div);
dom.after(test, div);
const div3 = dom.create("<div id='parent'></div>")
dom.wrap(test, div3)
const nodes = dom.empty(window.empty)
console.log(nodes)
dom.attr(test, 'title', 'hi,i am hi')

dom.text(test, '这是新内容')

dom.style(test, { border: '1px solid red', color: 'blue' })
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid green')

dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')
console.log(dom.class.has(test, 'blue'))
const fn = () => { console.log('点击了') }
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])

console.log(dom.parent(test))

const s = dom.find('#s2')[0]
console.log(dom.siblings(s))
console.log(dom.next(s))
console.log(dom.previous(s))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))
console.log(dom.index(s))