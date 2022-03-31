window.dom = {
    create(string) {//新增
        const container = document.createElement("template")
        container.innerHTML = string.trim();//去掉字符前后的空格内容。
        return container.content.firstChild;
    },
    after(node, node2) {//node2插入node后
        node.parentNode.insertBefore(node2, node.nextSibling);//即使是最后一个节点，操作也可以成功。
    },
    before(node, node2) {//node2插入node前
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) {//创建子节点
        parent.appendChild(node);
    },
    wrap(node, parent) {//插入父节点
        dom.before(node, parent);
        dom.append(parent, node);//append可以将原位置的抹去。
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node;//只从树中移除，还存在与内存中可用。
    },
    empty(node) {//清空node的所有子节点，但保存下来不删除，仍可用。如果不想保留，直接node.innerHTML='';即可。
        const array1 = [];
        let x = node.firstChild;
        while (x) {
            array1.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array1;
    },
    attr(node, name, value) {//重载
        if (arguments.length === 3) {
            node.setAttribute(name, value);//修改节点的某个属性值。
        } else if (arguments.length === 2) {
            return node.getAttribute(name);//获取节点的某个属性值。
        }
    },
    text(node, string) {//修改文本或查询内容
        if (arguments.length === 2) {
            if ('innerText' in node) {//适配，增强兼容性
                node.innerText = string;
            } else {
                node.textContent = string;
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {//适配，增强兼容性
                return node.innerText;
            } else {
                return node.textContent;
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string;
        } else if (arguments.length === 1) {
            return node.innerHTML;
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            //改样式，例如：dom.style(div,'color','red')
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //查样式，例如：dom.style(div,'color')
                return node.style[name];
            } else if (name instanceof Object) {
                //改样式，例如：dom.style(div,{color:'red'})
                for (let key in name) {
                    node.style[key] = name[key];
                }
            }
        }

    },
    class: {
        add(node, className) {//添加class
            node.classList.add(className)
        },
        remove(node, className) {//移除
            node.classList.remove(className)
        },
        has(node, className) {//查询
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {//监听
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {//关闭监听
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {//如果给了查找范围scope，就用。没给就在整个document内查找。
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children;
    },
    siblings(node) {//兄弟节点
        return Array.from(node.parentNode.children).filter(n => n !== node)//伪数组先变成数组，才能使用filter
    },
    next(node) {
        let x = node.nextSibling;
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x;
    },
    previous(node) {
        let x = node.previousSibling;
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x;
    },
    each(nodeList, fn) {//遍历，fn给定如何操作
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (node === list[i])
                break
        }
        return i;
    }


};