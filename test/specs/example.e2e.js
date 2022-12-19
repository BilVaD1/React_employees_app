const HomePage = require('../pageobjects/home.page')

describe('My employee application', () => {
    
    beforeEach(async function(){
        await HomePage.open()
        await browser.setWindowSize(1000, 1000)
      })


    it('should add new employee', async () => {
        await HomePage.addEmployee('Grand', '1300')
        const employees = await (await HomePage.getAllEmployees()).length
        expect(employees).toBe(4)
    })

    it('should delete employee', async () => {
        await HomePage.deleteEmployee("John C.")
        const names = await HomePage.getEmployeesNames()
        expect(names).not.toContain('John C.')
    })

    it('should add an award to the employee', async () => {
        await HomePage.addAward('John C.', 'Carl W.')
        const awards = await HomePage.getQtyOfAwards()
        expect(awards).toContain('2')
    })

    it('should select employee(s) for promotion', async () => {
        await HomePage.selectForPromotion('John C.', 'Carl W.')
        await HomePage.selectTab(2)
        const employees = await (await HomePage.getAllEmployees()).length
        expect(employees).toBe(2)
    })

    it('should search employee(s)', async () => {
        await HomePage.searchEnter('lex')
        const names = await HomePage.getEmployeesNames()
        for(const name of names){
            expect(name).toMatch('lex')
        }
    })

    it('should show the employee(s) with salary over 1000$', async () => {
        await HomePage.selectTab(3)
        const salary = await HomePage.getEmployeesSalary()
        for(const el of salary){
            expect(el).toBeGreaterThanOrEqual(1000)
        }
    })
})


