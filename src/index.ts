import PushItems from '@src/PushItems'
import FormCreator from '@src/FormCreator'

global.PushItems = (): void => {
    const pushItems: PushItems = new PushItems()
    pushItems.main()
}

global.FormCreator = (): void => {
    
}