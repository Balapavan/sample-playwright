import {test as base} from '@playwright/test'
import { LoginPage } from '../tests/pages/LoginPage'


type myFixture = { 
    loginPgae : LoginPage
}

export const tests  = base.extend<myFixture>({
    loginPgae: async ({page}, use)=>{
        await use(new LoginPage(page));
        
        //cleanup fixtures 
        await page.close()
    }

    }
)