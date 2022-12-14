

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
   
    async addEmployee (name, salary){
        const nameField = await $('input.form-control.new-post-label:nth-child(1)')
        const salaryField = await $('input.form-control.new-post-label:nth-child(2)')
        await nameField.waitForExist({ timeout: 10000, timeoutMsg:"The Name field isn't present" })
        await salaryField.waitForExist({ timeout: 10000, timeoutMsg:"The Salary field isn't present" })
        await nameField.setValue(name)
        await salaryField.setValue(salary)
        await $("button[type='submit']").click()
    }

    open () {
        return super.open();
    }
}

module.exports = new HomePage();
