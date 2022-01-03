import PushItems from '@/PushItems'
import FormCreator from '@/FormCreator'

global.PushItems = (): void => {
    const pushItems: PushItems = new PushItems()
    pushItems.main()
}

global.FormCreator = (): void => {
    const formCreator: FormCreator = new FormCreator()
    formCreator.main()
}