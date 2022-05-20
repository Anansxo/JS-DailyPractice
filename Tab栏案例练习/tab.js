let that = null;
class Tab {
    index;
    parentNode;
    children;
    constructor(id) {
        that = this; //改变this指向
        // 获取元素
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.add');
        this.ul = this.main.querySelector('.herder ul:first-child')
        this.content = this.main.querySelector('.content')
        this.init(); //一上来就直接调用init,绑定元素的事件
    }
    init() {
        this.updateNode(); //调用updateNode()方法
        // 初始化操作,让相关元素绑定事件
        this.add.onclick = this.addTab; //调用addTab方法
        //   给所有li绑定点击事件
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab; //点击后调用切换方法
            this.del[i].onclick = this.removeTab; // 调用removeTab
            this.spans[i].ondblclick = this.editTab; //调用editTab
            this.sections[i].ondblclick = this.editTab; //调用editTab
        }
    }
    // 因为我们动态添加元素，需要重新获取对应的元素
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.del = this.main.querySelectorAll('.del');
        this.spans = this.main.querySelectorAll('.herder li span:first-child')
    }
    // 1 切换
    toggleTab() {
        // 指向的是当前li
        // console.log(this)
        that.clearClass(); //切换tab后调用清除样式
        //li中不存在sections，所以需要改变this指向到获取全部元素的Tab类上面
        that.sections[this.index].className = 'active-section';
    }
    //清除样式
    clearClass(){
        //this在调用时被改变了,指向为了Tab
        for(let i = 0; i < this.lis.length; i++){
            //清空sections的样式
            this.sections[i].className = '';
        }
    }
    // 2 添加
    addTab() {
        that.clearClass()
        // (1) 创建li元素和section元素
        let li = `<li>
                    <!-- 删除tab-->
                    <span>新tab</span>
                    <div class="del">x</div>
                </li>  `;
        let random = Math.random();
        let section = `
           <section class="active-section">新内容区 ${random}</section>
        `;
        // (2) 把这两个元素追加得到对应的父元素里面
        //利用insertAdjacentHTML方法中的'beforeend'属性：把ul插入元素内部的最后一个子节点之后，li是子元素
        // 改变指向 由于是后面添加的，代码一上来已经获取完元素了，所以无法实现切换效果
        that.ul.insertAdjacentHTML('beforeend', li);
        that.content.insertAdjacentHTML('beforeend', section)
        that.init(); // 解决，重新调用init获取元素
    }
    // 3 删除
    /*
    * 1 点击 x 删除当前li选项卡和当前的内容区域
    * 2 x 是没有索引号的，但是li有
    * 3 核心思路： 点击x号可以删除这个索引号对应的li和内容区域
    * */
    removeTab(e) {
        e.stopPropagation(); //组织关闭li进行切换操作，组织事件冒泡
        let index = this.parentNode.index;
        console.log(index)
        // 根据索引号删除对应的li和section  remove()方法可以直接删除指定的元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //当删除的不是选定状态，原来的选定状态保持不变
        //如果有类处于选中状态，直接返回，后面代码不执行。没有选定状态执行后面代码
        if(document.querySelector('.active-section')) return;
        // 当删除当前li使，让它的前一个li处于选定状态
        index--;
        //自动调用点击上点击事件,不需要鼠标触发
        //&& 前面为真时才调用
        that.lis[index] && that.lis[index].click();
    }
    // 4 修改
    // 双击文字，在里面生成文本框，当失去焦点或按下回车键时把文本框输入的值给原先元素即可。
    editTab() {
        let str = this.innerHTML;
        this.innerHTML = '<input type="text">';
        let input = this.children[0];
        input.value = str;
        // 离开文本框就把值给span
        input.onblur = function (){
            this.parentNode.innerHTML = this.value;
        }
        // 按下回车
        input.onkeyup = function (e){
            if (e.keyCode === 13) {
                this.blur()
            }
        }
    }
}
const tab = new Tab('#tab');