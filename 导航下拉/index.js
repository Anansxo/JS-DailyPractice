let navList = document.querySelector('.nav-list')
let icon = document.querySelector('i')
let flag = 1
icon.addEventListener('click', () => {
	if (flag == 1) {
		navList.style.display = "none"
		icon.className = 'el-icon-caret-bottom'
		flag = 2
	} else {
		navList.style.display = "block"
		icon.className = 'el-icon-caret-top'
		flag = 1
	}
})

let list = document.querySelectorAll('#list')
console.log(list);
for (let i = 0; i < list.length; i++) {
	console.log(list[i]);
	list[i].addEventListener('click', () => {
		let content = document.querySelector('.left-content')
		content.innerText = list[i].innerText
	})
}