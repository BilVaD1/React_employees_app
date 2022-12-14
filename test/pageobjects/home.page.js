

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
   
    async addEmployee (name, salary){
        const name = await $('input.form-control.new-post-label:nth-child(1)')
        const salary = await $('input.form-control.new-post-label:nth-child(2)')
        await name.waitForExist({ timeout: 10000, timeoutMsg:"The Name field isn't present" })
        await salary.waitForExist({ timeout: 10000, timeoutMsg:"The Salary field isn't present" })
        await name.setValue(name)
        await salary.setValue(salary)
        await $("button[type='submit']").click()
    }

    open () {
        return super.open();
    }
}

module.exports = new HomePage();
