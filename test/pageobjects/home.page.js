

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {

    async getImputFields (index){
        return await $(`input.form-control.new-post-label:nth-child(${index})`)
    }

    async getDeleteBtn (){
        return await $('button.btn-trash.btn-sm')
    }

    async getAllEmployees (){
        return await $$("ul.app-list.list-group li")
    }

    async getQtyOfAwards (){
        return await $('.app-info h2:nth-child(3)').getText()
    }

    async searchEnter (value) {
        await $('input.form-control.search-input').setValue(value)
    } 
    
    async selectTab (index){
        await $(`.btn-group button:nth-child(${index})`).click()
    }

    async getEmployeesNames (){
        const employees = await this.getAllEmployees()
        const names = []
        for(const employee of employees){
            const name = await employee.$('span').getText()
            names.push(name)
        }
        return names
    }

    async getEmployeesSalary (){
        const employees = await this.getAllEmployees()
        const salaryList = []
        for(const employee of employees){
            const salary = await employee.$('input.list-group-item-input').getAttribute('value')
            salaryList.push(+salary)
        }
        return salaryList
    }

    async starPromotion (employeeName){
        const employees = await this.getAllEmployees()
        for(const args of arguments){
            for(const employee of employees){
                const name = await employee.$('span').getText()
                switch(employeeName == name){
                    case true:
                        return await employee.$("//i[@class='fas fa-star']")
                }
            }
        }
    }

    async getSelectedEmployee (employeeName){
        const employees = await this.getAllEmployees()
        for(const employee of employees){
            const name = await employee.$('span').getText()
            switch(employeeName == name){
                case true:
                    return employee
           }
        }
    }

    async addAward (){
        const employees = await this.getAllEmployees()
        first: for(const args of arguments){
            for(const employee of employees){
                const name = await employee.$('span').getText()
                switch(args == name){
                    case true:
                        await employee.$('i.fas.fa-cookie').click()
                        continue first
                }
            }
        }
    }

    async selectForPromotion (){
        const employees = await this.getAllEmployees()
        first: for(const args of arguments){
            for(const employee of employees){
                const name = await employee.$('span').getText()
                switch(args == name){
                    case true:
                        await employee.$('span').click()
                        continue first
                }
            }
        }
    }

    async deleteEmployee (employeeName){
        const employee = await this.getSelectedEmployee(employeeName)
        await employee.$(await this.getDeleteBtn()).click()
    }
   
    async addEmployee (name, salary){
        const nameField = await this.getImputFields(1)
        const salaryField = await this.getImputFields(2)
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
