// 发布者
class Dep {
    constructor() {
        this.watchers = []
    }
    // 订阅
    sub(watcher) {
        // console.log(this.watchers.indexOf(watcher), watcher, this.watchers, this.watchers.length)
        this.watchers.indexOf(watcher) < 0 && this.watchers.push(watcher)
    }
    // 发布
    pub() {
        this.watchers.forEach(watcher=>watcher.update())
    }
}
// 观察者
class Watcher {
    constructor(vm, expr, callback) {
        this.vm = vm
        this.expr = expr
        this.callback = callback
        this.value = this.get()
    }
    /**
     * 获取数据时,订阅观察者Observer.defineRelative
     */
    get() {
        // 设置全局的观察者,以供订阅
        Dep.target = this
        let value = CompileUtils.getValue(this.vm.$data, this.expr)
        // 订阅完成之后清除全局观察者
        Dep.target = null
        return value
    }
    /**
     * 接收发布提醒,更新数据
     */
    update() {
        let newVal = this.get()
        if (newVal !== this.value) {
            this.callback(newVal)
            this.value = newVal
        }
    }
    
}

class Observer { // 数据劫持
    constructor(data) {
        this.observer(data)
    }
    observer(data) {
        if (data && typeof data === 'object') {
            for (let key in data) {
                this.defineRelative(data, key, data[key])
            }
        }
    }
    defineRelative(data, key, value) {
        this.observer(value)
        // 每个属性都是发布者
        this.dep = new Dep();
        Object.defineProperty(data, key, {
            get: () => {
                // 订阅全局观察者
                Dep.target && this.dep.sub(Dep.target)
                return value
            },
            set: (newVal) => {
                if (newVal != value) {
                    this.observer(newVal)
                    value = newVal
                    // 数据更新,发布消息
                    this.dep.pub()
                }
            }
        })
    }
}

CompileUtils = {
    getValue($data, expr) {
        return expr.split('.').reduce((data, key)=>{
            return data[key] ? data[key] : ''
        }, $data)
    },
    setValue($data, expr, value) {
        return expr.split('.').reduce((data, key, index, arr)=>{
            if (index === arr.length - 1) {
                data[key] = value
            }
            return data[key] ? data[key] : ''
        }, $data)
    },
    text(vm, node, text) {  // {{a}}{{b}}
        let update = this.update['textUpdate']
        let content = text.replace(/\{\{(.+?)\}\}/g, (...args)=>{
            // 为每个表达式添加观察者
            new Watcher(vm, args[1], ()=>{
                let newVal = text.replace(/\{\{(.+?)\}\}/g, (...args)=>{
                    return this.getValue(vm.$data, args[1])
                })
                update(node, newVal)
            })
            return this.getValue(vm.$data, args[1])
        })
        update(node, content)
    },
    html(vm, node, expr) {
        let val = this.getValue(vm.$data, expr)
        let update = this.update['htmlUpdate']
        update(node, val)
        // 为表达式expr添加观察者
        new Watcher(vm, expr, (newVal)=>{
            update(node, newVal)
        })
    },
    model(vm, node, expr) {
        let val = this.getValue(vm.$data, expr)
        let update = this.update['modelUpdate']
        update(node, val)
        // 为表达式expr添加观察者
        new Watcher(vm, expr, (newVal)=>{
            update(node, newVal)
        })
        node.addEventListener('input', e => {
            let value = e.target.value
            this.setValue(vm.$data, expr, value)
        })
    },
    on(vm, node, expr, eventName) {
        let method = this.getValue(vm.$data, expr)
        let update = this.update['onUpdate']
        update(node, eventName, method)
    },
    update: {
        textUpdate(node, value) {
            node.data = value
        },
        htmlUpdate(node, value) {
            node.innerHTML = value
        },
        modelUpdate(node, value) {
            node.value = value
        },
        onUpdate(node, eventName, methon) {
            node.addEventListener(eventName, (e)=>{
                methon.call(vm, e)
            })
        }
    }
}

class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        this.fragment = this.node2fragment(this.el)
        // 替换节点中的内容
        
        // 编译模板,数据绑定模板
        this.compile(this.fragment)
        // 编译的模板放回页面中
        this.el.appendChild(this.fragment)
    }
    getValue($data, expr) {
        return expr.split('.').reduce((data, key)=>{
            return data[key]
        }, $data)
    }
    isDirective(name) {
        return name.startsWith('v-')
    }
    compileNode(node) {
        [...node.attributes].forEach(attr => {
            let {name, value: expr} = attr
            if (this.isDirective(name)) {
                let [,directive] = name.split('-')
                let [direction,eventName] = directive.split(':')
                CompileUtils[direction] && CompileUtils[direction](this.vm, node, expr, eventName)
            }
        })
    }
    compileText(node) {
        if (/^(\{\{).*(\}\})$/g.test(node.data)) {
            CompileUtils.text(this.vm, node, node.data)
        }
    }
    compile(fragment) {
        fragment.childNodes.forEach(node => {
            if (this.isElementNode(node)) {
                // Dom节点
                this.compileNode(node)
                this.compile(node)
            } else {
                // text
                this.compileText(node)
            }
        })
    }
    /**
     * 将节点放入内存中
     */
    node2fragment(node) {
        let fragment = document.createDocumentFragment()
        let firstChild
        while (firstChild = node.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment
    }
    /**
     * 判断node是否为Dom元素
     */
    isElementNode(node) {
        return node.nodeType === 1
    }
}

class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        this.computed = options.computed
        this.methods = options.methods
        
        if (this.$el) {
            new Observer(this.$data)
            
            for(let key in this.computed) {
                Object.defineProperty(this.$data, key, {
                    get: () => {
                        return this.computed[key].call(this)
                    }
                })
            }
            
            for(let key in this.methods) {
                Object.defineProperty(this.$data, key, {
                    get: () => {
                        // console.log(this.methods[key])
                        return this.methods[key]
                    }
                })
            }
            
            this.vmProxyData(this.$data)
            new Compile(this.$el, this)
        }
        console.log(this.$el, this.$data)
    }
    /**
     * vm代理$data
     */
    vmProxyData(data) {
        for (let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}