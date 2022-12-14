

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
   
    async addEmployee (name, salary){
        await (await $('input.form-control.new-post-label:nth-child(1)')).setValue(name)
        await (await $('input.form-control.new-post-label:nth-child(2)')).setValue(salary)
        await $("button[type='submit']").click()
    }

    open () {
        return super.open();
    }
}

module.exports = new HomePage();
