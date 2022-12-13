const HomePage = require('../pageobjects/home.page')

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await HomePage.open()
        await browser.pause(5000)
        await HomePage.addEmployee('Grand', '1300')
        const employees = await $$("ul.app-list.list-group li").length
        expect(employees).toBe(5)
    })
})


