const HomePage = require('../pageobjects/home.page')

describe('My employee application', () => {
    it('should add new employee', async () => {
        await HomePage.open()
        await browser.pause(5000)
        var outerHTML = await $('body').getHTML();
        console.log(outerHTML)
        await HomePage.addEmployee('Grand', '1300')
        const employees = await $$("ul.app-list.list-group li").length
        expect(employees).toBe(5)
    })
})


