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
for (let i = 0; i < list.length; i++) {
	console.log(list[i]);
	list[i].addEventListener('click', () => {
		let content = document.querySelector('.left-content')
		content.innerText = list[i].innerText

		for (let i = 0; i < list.length; i++) {
			list[i].style.backgroundColor = '';
			list[i].style.border = ''
		}
		list[i].style.backgroundColor = '#FFE3A9'
		list[i].style.border = '2px solid darkgoldenrod'
	})
}